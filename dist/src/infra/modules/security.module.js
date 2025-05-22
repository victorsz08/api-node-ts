"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.securityRoutes = void 0;
const prisma_service_1 = require("../../package/prisma/prisma.service");
const granted_user_usecase_1 = require("../../usecases/security/granted-user.usecase");
const recovery_usecase_1 = require("../../usecases/security/recovery.usecase");
const granted_user_route_express_1 = require("../api/express/routes/security/granted-user.route.express");
const recovery_route_express_1 = require("../api/express/routes/security/recovery.route.express");
const security_repository_1 = require("../repositories/security.repository");
const securityRepository = security_repository_1.SecurityRepository.build(prisma_service_1.prisma);
const recoveryUsecase = recovery_usecase_1.SecuityRecoveryUsecase.build(securityRepository);
const grantedUserUsecase = granted_user_usecase_1.GrantedUserUsecase.build(securityRepository);
const recoveryRoute = recovery_route_express_1.SecurityRecoveryRoute.build(recoveryUsecase);
const grantedUserRoute = granted_user_route_express_1.GrantedUserRoute.build(grantedUserUsecase);
exports.securityRoutes = [
    recoveryRoute,
    grantedUserRoute
];
