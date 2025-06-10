import { GetCitiesRoute } from "../api/express/routes/microservices/get-cities.route.express";




const getCitiesRoute = GetCitiesRoute.build();


export const microservicesRoutes = [
    getCitiesRoute
];