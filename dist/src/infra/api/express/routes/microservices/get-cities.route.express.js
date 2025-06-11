"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCitiesRoute = void 0;
const route_express_1 = require("../route.express");
const logger_middleware_1 = require("../../../../../middlewares/logger.middleware");
class GetCitiesRoute {
    constructor(path, method) {
        this.path = path;
        this.method = method;
    }
    ;
    static build() {
        return new GetCitiesRoute("/cities", route_express_1.HttpMethod.GET);
    }
    ;
    getHandler() {
        return async (req, res) => {
            const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/municipios?view=nivelado");
            const data = await response.json();
            const responseBody = {
                cities: data.map((city) => {
                    return {
                        name: `${city["municipio-nome"]} / ${city["UF-sigla"]}`
                    };
                })
            };
            return res.status(200).json(responseBody);
        };
    }
    ;
    getPath() {
        return this.path;
    }
    ;
    getMethod() {
        return this.method;
    }
    ;
    getMiddlewares() {
        return [
            (0, logger_middleware_1.LoggerMiddleware)()
        ];
    }
    ;
}
exports.GetCitiesRoute = GetCitiesRoute;
