import { prisma } from "../../package/prisma/prisma.service";
import { GrantedUserUsecase } from "../../usecases/security/granted-user.usecase";
import { SecuityRecoveryUsecase } from "../../usecases/security/recovery.usecase";
import { GrantedUserRoute } from "../api/express/routes/security/granted-user.route.express";
import { SecurityRecoveryRoute } from "../api/express/routes/security/recovery.route.express";
import { SecurityRepository } from "../repositories/security.repository";




const securityRepository = SecurityRepository.build(prisma);

const recoveryUsecase = SecuityRecoveryUsecase.build(securityRepository);
const grantedUserUsecase = GrantedUserUsecase.build(securityRepository);

const recoveryRoute = SecurityRecoveryRoute.build(recoveryUsecase);
const grantedUserRoute = GrantedUserRoute.build(grantedUserUsecase);

export const securityRoutes = [
    recoveryRoute,
    grantedUserRoute
];