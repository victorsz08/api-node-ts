import { PrismaClient } from "@prisma/client";
import { InsightEntity } from "../../domain/entities/insight.entity";
import {
  InsightInterface,
  SalesPerDayInsight,
} from "../../domain/interfaces/insight.interface";
import { StatusEnum } from "../../domain/enum/status.enum";
import { eachDayOfInterval, format, subDays } from "date-fns";
import moment from "moment-timezone";

export class InsightRepository implements InsightInterface {
  private constructor(private readonly repository: PrismaClient) {}

  public static build(repository: PrismaClient) {
    return new InsightRepository(repository);
  }

  public async get(
    userId: string,
    dateIn: Date,
    dateOut: Date
  ): Promise<InsightEntity> {
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
          status: StatusEnum.CONNECTED,
        },
      }),
    ]);

    const [connected, cancelled, pending] = await Promise.all([
      this.repository.contract.count({
        where: {
          user: { id: userId },
          createdAt: { gte: dateIn, lte: dateOut },
          status: StatusEnum.CONNECTED,
        },
      }),
      this.repository.contract.count({
        where: {
          user: { id: userId },
          createdAt: { gte: dateIn, lte: dateOut },
          status: StatusEnum.CANCELED,
        },
      }),
      this.repository.contract.count({
        where: {
          user: { id: userId },
          createdAt: { gte: dateIn, lte: dateOut },
          status: StatusEnum.PENDING,
        },
      }),
    ]);

    const [rateConnected, rateCancelled] = await Promise.all([
      this.repository.contract.count({
        where: {
          user: { id: userId },
          installationDate: { gte: dateIn, lte: dateOut },
          status: StatusEnum.CONNECTED,
        },
      }),
      this.repository.contract.count({
        where: {
          user: { id: userId },
          installationDate: { gte: dateIn, lte: dateOut },
          status: StatusEnum.CANCELED,
        },
      }),
    ]);

    const totalInstallations = rateConnected + rateCancelled;
    const completionRate =
      totalInstallations > 0 ? rateConnected / totalInstallations : 0;
    const cancelledRate =
      totalInstallations > 0 ? rateCancelled / totalInstallations : 0;

    const revenue = sales.reduce((acc, item) => acc + item.price, 0);

    return InsightEntity.with({
      revenue,
      sales: totalSales,
      completionRate,
      cancelledRate,
      connected,
      cancelled,
      pending,
    });
  }

  public async getSalesPerDay(
    userId: string,
    dateIn: Date,
    dateOut: Date
  ): Promise<SalesPerDayInsight> {
    const sales = await this.repository.contract.findMany({
      where: {
        user: { id: userId },
        createdAt: { gte: dateIn, lte: dateOut },
      },
      select: {
        createdAt: true,
      },
    });

    const salesMap = new Map<string, number>();

    sales.forEach((sale) => {
      const date = moment(sale.createdAt).tz("America/Sao_Paulo").format(
        "YYYY-MM-DD"
      );
      salesMap.set(date, (salesMap.get(date) ?? 0) + 1);
    });

    const daysInRange = eachDayOfInterval({ start: dateIn, end: dateOut });
    const result = daysInRange.map((day) => {
      const key = format(day, "yyyy-MM-dd");
      return {
        day,
        quantity: salesMap.get(key) ?? 0,
      };
    });

    return { sales: result };
  }
}
