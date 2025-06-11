"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSalesPerDayUsecase = void 0;
const transform_date_1 = __importDefault(require("../../patterns/utils/transform-date"));
class GetSalesPerDayUsecase {
    constructor(insightInterface) {
        this.insightInterface = insightInterface;
    }
    ;
    static build(insightInterface) {
        return new GetSalesPerDayUsecase(insightInterface);
    }
    ;
    async execute(input) {
        const { userId, dateIn, dateOut } = input;
        const sales = await this.insightInterface.getSalesPerDay(userId, dateIn, dateOut);
        const output = this.present(sales);
        return output;
    }
    ;
    present(sales) {
        return {
            sales: sales.sales.map((sale) => ({
                day: transform_date_1.default.toString(sale.day),
                quantity: sale.quantity
            }))
        };
    }
    ;
}
exports.GetSalesPerDayUsecase = GetSalesPerDayUsecase;
;
