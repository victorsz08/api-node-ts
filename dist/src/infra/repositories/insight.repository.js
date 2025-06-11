"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsightRepository = void 0;
const insight_entity_1 = require("../../domain/entities/insight.entity");
const status_enum_1 = require("../../domain/enum/status.enum");
const date_fns_1 = require("date-fns");
class InsightRepository {
    constructor(repository) {
        this.repository = repository;
    }
    static build(repository) {
        return new InsightRepository(repository);
    }
    async get(userId, dateIn, dateOut) {
        const [totalSales, sales] = await Promise.all([
            this.repository.contract.count({
                where: {
                    user: { id: userId },
                    createdAt: { gte: dateIn, lte: dateOut },
                },
            }),
            this.repository.contract.findMany({
                where: {
                    user: { id: userId },
                    installationDate: { gte: dateIn, lte: dateOut },
                    status: status_enum_1.StatusEnum.CONNECTED,
                },
            }),
        ]);
        const [connected, cancelled, pending] = await Promise.all([
            this.repository.contract.count({
                where: {
                    user: { id: userId },
                    createdAt: { gte: dateIn, lte: dateOut },
                    status: status_enum_1.StatusEnum.CONNECTED,
                },
            }),
            this.repository.contract.count({
                where: {
                    user: { id: userId },
                    createdAt: { gte: dateIn, lte: dateOut },
                    status: status_enum_1.StatusEnum.CANCELED,
                },
            }),
            this.repository.contract.count({
                where: {
                    user: { id: userId },
                    createdAt: { gte: dateIn, lte: dateOut },
                    status: status_enum_1.StatusEnum.PENDING,
                },
            }),
        ]);
        const [rateConnected, rateCancelled] = await Promise.all([
            this.repository.contract.count({
                where: {
                    user: { id: userId },
                    installationDate: { gte: dateIn, lte: dateOut },
                    status: status_enum_1.StatusEnum.CONNECTED,
                },
            }),
            this.repository.contract.count({
                where: {
                    user: { id: userId },
                    installationDate: { gte: dateIn, lte: dateOut },
                    status: status_enum_1.StatusEnum.CANCELED,
                },
            }),
        ]);
        const totalInstallations = rateConnected + rateCancelled;
        const completionRate = totalInstallations > 0 ? rateConnected / totalInstallations : 0;
        const cancelledRate = totalInstallations > 0 ? rateCancelled / totalInstallations : 0;
        const revenue = sales.reduce((acc, item) => acc + item.price, 0);
        return insight_entity_1.InsightEntity.with({
            revenue,
            sales: totalSales,
            completionRate,
            cancelledRate,
            connected,
            cancelled,
            pending,
        });
    }
    async getSalesPerDay(userId, dateIn, dateOut) {
        const sales = await this.repository.contract.findMany({
            where: {
                user: { id: userId },
                createdAt: { gte: dateIn, lte: dateOut },
            },
            select: {
                createdAt: true,
            },
        });
        const salesMap = new Map();
        sales.forEach((sale) => {
            const date = (0, date_fns_1.format)(new Date(sale.createdAt), "yyyy-MM-dd");
            salesMap.set(date, (salesMap.get(date) ?? 0) + 1);
        });
        const daysInRange = (0, date_fns_1.eachDayOfInterval)({ start: dateIn, end: dateOut });
        const result = daysInRange.map((day) => {
            const key = (0, date_fns_1.format)(day, "yyyy-MM-dd");
            return {
                day,
                quantity: salesMap.get(key) ?? 0,
            };
        });
        return { sales: result };
    }
}
exports.InsightRepository = InsightRepository;
