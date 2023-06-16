import Router from "express";
import termalCalcContoller from "../controllers/request/termalCalcController.js";

const termalCalcRouter = new Router();

termalCalcRouter.post("/searchCategories", termalCalcContoller.searchCategories.bind(termalCalcContoller));
termalCalcRouter.post("/searchMaterials", termalCalcContoller.searchMaterials.bind(termalCalcContoller));
termalCalcRouter.post("/searchCity", termalCalcContoller.searchCity.bind(termalCalcContoller));
termalCalcRouter.post("/searchBuildingType", termalCalcContoller.searchBuildingType.bind(termalCalcContoller));

termalCalcRouter.post("/getHeatTransferResult", termalCalcContoller.getHeatTransferResult.bind(termalCalcContoller));

export default termalCalcRouter;
