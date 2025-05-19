import { ApiExpress } from "./infra/api/express/api.express";
import { userRoutes } from "./infra/modules/user.module";
import "dotenv/config";



function main() {
    const api = ApiExpress.build([
        ...userRoutes
    ]);

    api.start(3000);
};

main();