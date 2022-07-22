"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Product_repository_1 = require("../repositories/Product.repository");
const StopWords_1 = require("../utils/StopWords");
class RecommendationService {
    strToArraySanitized(str) {
        return str
            .toLocaleLowerCase()
            .trim()
            .split(" ")
            .map((e) => e.replace(".", ""))
            .filter((e) => e !== "" && !StopWords_1.default.includes(e));
    }
    countWordsInArray(array) {
        const countedWords = array.reduce((acc, curr) => (Object.assign(Object.assign({}, acc), { [curr]: (acc[curr] || 0) + 1 })), {});
        return countedWords;
    }
    feedSomeWords(obj) {
        Object.keys(obj.data).forEach((key) => {
            if (["dog", "cat", "bird"].includes(key)) {
                obj.data[key] = Math.round(obj.data[key] * 2.7);
            }
        });
        Object.keys(obj.data).forEach((key) => {
            if (["puppy", "adult", "teen", "senior", "junior", "kitten"].includes(key)) {
                obj.data[key] = Math.round(obj.data[key] * 1.5);
            }
        });
    }
    removeInutileWords(obj) {
        Object.keys(obj.data).forEach((key) => {
            if (obj.data[key] <= 1) {
                delete obj.data[key];
            }
        });
    }
    async get(req, res) {
        const { id } = req.query;
        const product = await Product_repository_1.ProductRepository.findOne(id);
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
        let products = await Product_repository_1.ProductRepository.findAll();
        products = products.filter((p) => p.name !== product.name);
        const dataModel = products.map((e) => {
            const objToReturn = { id: e._id, data: null };
            const finalData = [];
            finalData.push(...this.strToArraySanitized(e.name));
            finalData.push(...this.strToArraySanitized(e.description));
            finalData.push(...this.strToArraySanitized(e.tags.join(" ")));
            objToReturn.data = this.countWordsInArray(finalData);
            this.feedSomeWords(objToReturn);
            return objToReturn;
        });
        const IDF = (word) => {
            const n = dataModel.length;
            const df = dataModel.filter((e) => e.data[word] > 0).length;
            return Math.log10(n / df);
        };
        const TFIDF = (word, doc) => {
            const tf = doc.data[word] || 0;
            const idf = IDF(word);
            return tf * idf;
        };
        const cosineSimilarity = (doc1, doc2) => {
            const words = Object.keys(doc1.data);
            const dotProduct = words.reduce((acc, curr) => {
                return acc + TFIDF(curr, doc1) * TFIDF(curr, doc2);
            }, 0);
            const magnitude1 = words.reduce((acc, curr) => {
                return acc + Math.pow(TFIDF(curr, doc1), 2);
            }, 0);
            const magnitude2 = words.reduce((acc, curr) => {
                return acc + Math.pow(TFIDF(curr, doc2), 2);
            }, 0);
            if (dotProduct === 0)
                return 0;
            return dotProduct / (Math.sqrt(magnitude1) * Math.sqrt(magnitude2));
        };
        const similarities = dataModel
            .map((e) => {
            return { id: e.id, similarity: cosineSimilarity(e, productDoc) };
        })
            .sort((a, b) => b.similarity - a.similarity);
        const recommendedProducts = similarities.slice(0, 5);
        console.log(recommendedProducts);
        return recommendedProducts.map((e) => products.find((p) => p._id === e.id));
    }
}
exports.default = new RecommendationService();
