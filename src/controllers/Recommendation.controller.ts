import { Request, Response } from "express";
import RecommendationService from "../services/Recommendation.service";
import { routeConfig } from "../utils/decorators/Route.decorator";
import METHOD from "../utils/enums/methods.enum";

export default class RecommendationController {
  @routeConfig({
    method: METHOD.GET,
    path: "/recommendation",
  })
  public async get(req: Request, res: Response): Promise<any> {
    return await RecommendationService.get(req, res);
  }
}
