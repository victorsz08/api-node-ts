import { ApiExpress } from "./infra/api/express/api.express";
import { buildUserRoutes } from "./infra/modules/user.module";




function main() {
    const api = ApiExpress.build([
        ...buildUserRoutes()
    ]);

    api.start(3000);
};

main();