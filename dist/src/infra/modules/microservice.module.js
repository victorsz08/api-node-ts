"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.microservicesRoutes = void 0;
const get_cities_route_express_1 = require("../api/express/routes/microservices/get-cities.route.express");
const getCitiesRoute = get_cities_route_express_1.GetCitiesRoute.build();
exports.microservicesRoutes = [
    getCitiesRoute
];
