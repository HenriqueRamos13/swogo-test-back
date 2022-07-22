import { Request, Response } from "express";
import { ProductRepository } from "../repositories/Product.repository";
import StopWords from "../utils/StopWords";

class RecommendationService {
  private strToArraySanitized(str: string): string[] {
    return str
      .toLocaleLowerCase()
      .trim()
      .split(" ")
      .map((e) => e.replace(".", ""))
      .filter((e) => e !== "" && !StopWords.includes(e));
  }

  private countWordsInArray(array: string[]) {
    const countedWords = array.reduce(
      (acc, curr) => ({ ...acc, [curr]: (acc[curr] || 0) + 1 }),
      {}
    );

    return countedWords;
  }

  private feedSomeWords(obj: { data: any; id: string }) {
    Object.keys(obj.data).forEach((key) => {
      if (["dog", "cat", "bird"].includes(key)) {
        obj.data[key] = Math.round(obj.data[key] * 2.7);
      }
    });

    Object.keys(obj.data).forEach((key) => {
      if (
        ["puppy", "adult", "teen", "senior", "junior", "kitten"].includes(key)
      ) {
        obj.data[key] = Math.round(obj.data[key] * 1.5);
      }
    });

    // Feed for phones
    const regexp = /\d+cmX\d+cm/;

    Object.keys(obj.data).forEach((key) => {
      if (regexp.test(key)) {
        obj.data[key] = Math.round(obj.data[key] * 10);
      }
    });
  }

  private removeInutileWords(obj: { data: any; id: string }) {
    Object.keys(obj.data).forEach((key) => {
      if (obj.data[key] <= 1) {
        delete obj.data[key];
      }
    });
  }

  public async get(req: Request, res: Response): Promise<any> {
    const { id } = req.query;

    const product = await ProductRepository.findOne(id as string);
    const productWords = [
      ...this.strToArraySanitized(product.name),
      ...this.strToArraySanitized(product.description),
      ...this.strToArraySanitized(product.tags.join(" ")),
    ];

    const productWordsCount = this.countWordsInArray(productWords);
    const productDoc = {
      id: product._id,
      data: productWordsCount,
    };

    this.feedSomeWords(productDoc);
    // this.removeInutileWords(productDoc);

    let products = await ProductRepository.findAll();

    products = products.filter((p) => p.name !== product.name);

    const dataModel = products.map((e) => {
      const objToReturn = { id: e._id, data: null };
      const finalData = [];
      finalData.push(...this.strToArraySanitized(e.name));
      finalData.push(...this.strToArraySanitized(e.description));
      finalData.push(...this.strToArraySanitized(e.tags.join(" ")));

      objToReturn.data = this.countWordsInArray(finalData);

      this.feedSomeWords(objToReturn);
      // this.removeInutileWords(objToReturn);

      return objToReturn;
    });

    // Term frequency - TF
    // DF - Document frequency
    // IDF - Inverse document frequency

    // log10(Quantidade documentos / Quantidade de documentos que possuem a palavra)
    const IDF = (word: string) => {
      const n = dataModel.length;
      const df = dataModel.filter((e) => e.data[word] > 0).length;
      return Math.log10(n / df);
    };

    // Quantidade de vezes que a palavra aprece * IDF
    const TFIDF = (word: string, doc: any) => {
      const tf = doc.data[word] || 0;
      const idf = IDF(word);
      return tf * idf;
    };

    const cosineSimilarity = (doc1: any, doc2: any) => {
      const words = Object.keys(doc1.data);

      // Pega o TFIDF da palavra em cada documento e multiplica elas para obter um valor escalar
      const dotProduct = words.reduce((acc, curr) => {
        return acc + TFIDF(curr, doc1) * TFIDF(curr, doc2);
      }, 0);
      // console.log("dotProduct", dotProduct);

      // Pega o quadrado do TFIDF de cada palavra palavra em cada documento e soma os quadrados
      const magnitude1 = words.reduce((acc, curr) => {
        return acc + Math.pow(TFIDF(curr, doc1), 2);
      }, 0);
      // console.log("magnitude1", magnitude1);

      const magnitude2 = words.reduce((acc, curr) => {
        return acc + Math.pow(TFIDF(curr, doc2), 2);
      }, 0);
      // console.log("magnitude2", magnitude2);

      if (dotProduct === 0) return 0;

      // Calcula o cosseno
      return dotProduct / (Math.sqrt(magnitude1) * Math.sqrt(magnitude2));
    };

    const similarities = dataModel
      .map((e) => {
        return { id: e.id, similarity: cosineSimilarity(e, productDoc) };
      })
      .sort((a, b) => b.similarity - a.similarity);

    const recommendedProducts = similarities.slice(0, 5);

    return recommendedProducts.map((e) => products.find((p) => p._id === e.id));
  }
}

export default new RecommendationService();
