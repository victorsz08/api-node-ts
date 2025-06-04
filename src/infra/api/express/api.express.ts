import { Api } from "../api";
import { Express } from "express";
import express from "express"
import { Route } from "./routes/route.express";
import { HttpHandlerError } from "../../../middlewares/http-handler-error.middleware";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";


export class ApiExpress implements Api {
    private app: Express

    private constructor(routes: Route[]) {
        this.app = express();
        
        this.app.use(cors({
            origin: process.env.ORIGIN_ALLOWED,
            methods: ["POST", "GET", "PUT", "DELETE"],
            credentials: true,
        }))

        this.app.use(express.json());
        this.app.use(helmet())
        
        this.app.use(HttpHandlerError);
        this.app.use(cookieParser())
        this.addRoutes(routes);
    };

    public static build(routes: Route[]) {
        return new ApiExpress(routes);
    };
    
    
    public start(port: number): void {
        this.app.listen(port, () => {
            console.log("server http running");
        })
    };

    private addRoutes(routes: Route[]) {
        routes.forEach((route) => {
            const path = route.getPath();
            const method = route.getMethod();
            const handler = route.getHandler();
            const middlewares = route.getMiddlewares?.() || [];

            this.app[method](path, ...middlewares, handler);
        });
    };
};