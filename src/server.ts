import { ApiExpress } from "./infra/api/express/api.express";
import { userRoutes } from "./infra/modules/user.module";
import { orderRoutes } from "./infra/modules/order.module";
import "dotenv/config";
import { authRoutes } from "./infra/modules/auth.module";
import { noteRoutes } from "./infra/modules/note.module";
import { insightRoutes } from "./infra/modules/insight.module";


function main() {
    const api = ApiExpress.build([
        ...userRoutes,
        ...orderRoutes,
        ...authRoutes,
        ...noteRoutes,
        ...insightRoutes
    ]);

    api.start(3000);
};

main();