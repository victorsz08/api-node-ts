import { Request, Response, NextFunction } from "express";
import { HttpMethod, Route, T } from "../route.express";
import { LoggerMiddleware } from "../../../../../middlewares/logger.middleware";


export type City = {
    name: string;
}


export type GetCitiesResponse = {
    cities: City[];
};



export class GetCitiesRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
    ) {};
    
    public static build() {
        return new GetCitiesRoute("/cities", HttpMethod.GET);
    };

    public getHandler(): (req: Request, res: Response) => Promise<T> {
        return async (req: Request, res: Response) => {
            const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/municipios?view=nivelado");
            const data: any = await response.json();

            const responseBody: GetCitiesResponse = {
                cities: data.map((city: any) => {
                    return {
                        name: `${city["municipio-nome"]} / ${city["UF-sigla"]}`
                    }
                })
            };

            return res.status(200).json(responseBody);
        };
    };

    public getPath(): string {
        return this.path;
    };

    public getMethod(): HttpMethod {
        return this.method; 
    };

    public getMiddlewares?(): ((req: Request, res: Response, next: NextFunction) => Promise<T>)[] {
        return [
            LoggerMiddleware()
        ]
    };
}