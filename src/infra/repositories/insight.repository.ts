import { PrismaClient } from "@prisma/client";
import { InsightEntity } from "../../domain/entities/insight.entity";
import { InsightInterface } from "../../domain/interfaces/insight.interface";
import { StatusEnum } from "../../domain/enum/status.enum";



export class InsightRepository implements InsightInterface {
    private constructor(private readonly repository: PrismaClient) {};

    public static build(repository: PrismaClient) {
        return new InsightRepository(repository);
    };
    
public async get(userId: string, dateIn: Date, dateOut: Date): Promise<InsightEntity> {

    const [totalSales, sales] = await Promise.all([
        this.repository.contract.count({
            where: {
                user: { id: userId },
                createdAt: { gte: dateIn, lte: dateOut },
            }
        }),
        this.repository.contract.findMany({
            where: {
                user: { id: userId },
                installationDate: { gte: dateIn, lte: dateOut },
                status: StatusEnum.CONNECTED
            }
        })
    ]);

    const [connected, cancelled, pending] = await Promise.all([
        this.repository.contract.count({
            where: {
                user: { id: userId },
                createdAt: { gte: dateIn, lte: dateOut },
                status: StatusEnum.CONNECTED
            }
        }),
        this.repository.contract.count({
            where: {
                user: { id: userId },
                createdAt: { gte: dateIn, lte: dateOut },
                status: StatusEnum.CANCELED
            }
        }),
        this.repository.contract.count({
            where: {
                user: { id: userId },
                createdAt: { gte: dateIn, lte: dateOut },
                status: StatusEnum.PENDING
            }
        }),
    ]);

    const [rateConnected, rateCancelled] = await Promise.all([
        this.repository.contract.count({
            where: {
                user: { id: userId },
                installationDate: { gte: dateIn, lte: dateOut },
                status: StatusEnum.CONNECTED
            }
        }),
        this.repository.contract.count({
            where: {
                user: { id: userId },
                installationDate: { gte: dateIn, lte: dateOut },
                status: StatusEnum.CANCELED
            }
        }),
    ]);

    const totalInstallations = rateConnected + rateCancelled;
    const completionRate = totalInstallations > 0 ? rateConnected / totalInstallations : 0;
    const cancelledRate = totalInstallations > 0 ? rateCancelled / totalInstallations : 0;

    const revenue = sales.reduce((acc, item) => acc + item.price, 0);

    return InsightEntity.with({
        revenue,
        sales: totalSales,
        completionRate,
        cancelledRate,
        connected,
        cancelled,
        pending
    });
}

};