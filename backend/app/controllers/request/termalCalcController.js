import pool from "../../db.js";

class TermalCalcController {
  async searchCategories(req, res) {
    try {
      const search = req.body.search;
      const offset = req.body.offset;
      const limit = req.body.limit;
      const response = await pool.query("SELECT * FROM categories WHERE UPPER(name) LIKE '%' || UPPER($1) || '%' LIMIT $2 OFFSET $3 ", [search, limit, offset]);
      res.json(response.rows);
    } catch (e) {
      res.json({ error: e.message });
    }
  }

  async searchMaterials(req, res) {
    try {
      const search = req.body.search;
      const offset = req.body.offset;
      const limit = req.body.limit;
      const categoryId = req.body.categoryId;
      const response = await pool.query("SELECT * FROM materials WHERE category_id = $1 AND UPPER(name) LIKE '%' || UPPER($2) || '%' LIMIT $3 OFFSET $4", [
        categoryId,
        search,
        limit,
        offset,
      ]);
      res.json(response.rows);
    } catch (e) {
      res.json({ error: e.message });
    }
  }

  async searchCity(req, res) {
    try {
      const search = req.body.search;
      const offset = req.body.offset;
      const limit = req.body.limit;
      const response = await pool.query("SELECT * FROM cities_temperature WHERE UPPER(name) LIKE '%' || UPPER($1) || '%' LIMIT $2 OFFSET $3", [
        search,
        limit,
        offset,
      ]);
      res.json(response.rows);
    } catch (e) {
      res.json({ error: e.message });
    }
  }

  async searchBuildingType(req, res) {
    try {
      const search = req.body.search;
      const offset = req.body.offset;
      const limit = req.body.limit;
      const response = await pool.query("SELECT * FROM building_types WHERE UPPER(name) LIKE '%' || UPPER($1) || '%' LIMIT $2 OFFSET $3", [
        search,
        limit,
        offset,
      ]);
      res.json(response.rows);
    } catch (e) {
      res.json({ error: e.message });
    }
  }

  async getHeatTransferResult(req, res) {
    /*
      В body будет массив материалов, каждый материал имеет структуру:
      {
        coefficient_of_thermal_conductivity
        width
      }
    */

    try {
      const cityId = req.body.cityId;
      const cityName = (await pool.query("SELECT name FROM cities_temperature WHERE id = $1", [cityId])).rows[0].name;
      const innerTemperature = req.body.innerTemperature;
      const buildingTypeId = req.body.buildingTypeId;

      const coefficientOfThermalUniformity = req.body.coefficientOfThermalUniformity;
      const materials = req.body.materials;

      const citiesTemperature = await pool.query("SELECT warm_days, avg_temp FROM cities_temperature WHERE id = $1", [cityId]);
      const warmDays = citiesTemperature.rows[0].warm_days;
      const avgTemp = citiesTemperature.rows[0].avg_temp;
      const GSOP = (innerTemperature - avgTemp) * warmDays;
      const buildingTypes = await pool.query("SELECT a, b, name FROM building_types WHERE id = $1", [buildingTypeId]);
      const a = buildingTypes.rows[0].a;
      const b = buildingTypes.rows[0].b;

      const requiredResistance = a * GSOP + b;

      const innerHeatTransferCoef = 8.7;
      const outerHeatTransferCoef = 23;

      let conditionalResistance = 1 / innerHeatTransferCoef + 1 / outerHeatTransferCoef;

      for (const material of materials) {
        conditionalResistance += (material.width * 0.001) / material.material.coefficient_of_thermal_conductivity;
      }

      const calculatedResistance = conditionalResistance * coefficientOfThermalUniformity;
      let width;

      if (calculatedResistance < requiredResistance) {
        const index = materials.findIndex((item) => item.isEnergyEfficient === true);
        const energyEfficientMaterial = materials[index];

        const filtredMaterials = [...materials];
        filtredMaterials.splice(index, 1);
        console.log(filtredMaterials);

        let conditionalResistance = 1 / innerHeatTransferCoef + 1 / outerHeatTransferCoef;

        for (const material of filtredMaterials) {
          conditionalResistance += (material.width * 0.001) / material.material.coefficient_of_thermal_conductivity;
        }
        const calculatedResistance = conditionalResistance * coefficientOfThermalUniformity;

        const deltaResistance = requiredResistance - calculatedResistance;

        width = deltaResistance / (0.001 / energyEfficientMaterial.material.coefficient_of_thermal_conductivity) / coefficientOfThermalUniformity;
      }

      res.json({
        heatTransferResult: calculatedResistance >= requiredResistance,
        requiredResistance,
        calculatedResistance,
        innerTemperature,
        coefficientOfThermalUniformity,
        materials,
        warmDays,
        avgTemp,
        GSOP,
        a,
        b,
        conditionalResistance,
        innerHeatTransferCoef,
        outerHeatTransferCoef,
        width,
        cityName,
        buildingTypeName: buildingTypes.rows[0].name,
      });
    } catch (e) {
      res.json({ error: e.message });
    }
  }
}
export default new TermalCalcController();
