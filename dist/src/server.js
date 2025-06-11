"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_express_1 = require("./infra/api/express/api.express");
const user_module_1 = require("./infra/modules/user.module");
const order_module_1 = require("./infra/modules/order.module");
require("dotenv/config");
const auth_module_1 = require("./infra/modules/auth.module");
const note_module_1 = require("./infra/modules/note.module");
const insight_module_1 = require("./infra/modules/insight.module");
const security_module_1 = require("./infra/modules/security.module");
const microservice_module_1 = require("./infra/modules/microservice.module");
const PORT = parseInt(process.env.PORT || "8000") | 8000;
function main() {
    const api = api_express_1.ApiExpress.build([
        ...user_module_1.userRoutes,
        ...order_module_1.orderRoutes,
        ...auth_module_1.authRoutes,
        ...note_module_1.noteRoutes,
        ...insight_module_1.insightRoutes,
        ...security_module_1.securityRoutes,
        ...microservice_module_1.microservicesRoutes
    ]);
    api.start(PORT);
}
main();
