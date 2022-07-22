import { Request, Response } from "express";
declare class RecommendationService {
    private strToArraySanitized;
    private countWordsInArray;
    private feedSomeWords;
    private removeInutileWords;
    get(req: Request, res: Response): Promise<any>;
}
declare const _default: RecommendationService;
export default _default;
