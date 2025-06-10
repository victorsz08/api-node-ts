import { Prisma, PrismaClient, Status } from '@prisma/client';
import { OrderEntity } from "../../domain/entities/order.entity";
import { StatusEnum } from "../../domain/enum/status.enum";
import { ListOrderInput, ListOrderOutput, OrderInterface } from "../../domain/interfaces/order.interface";
import { HttpException } from '../../package/http-exceptions/http-exception';
import { HttpStatus } from '../../package/http-exceptions/http-status';
import orderMapper from '../../patterns/mappers/order.mapper';
import { endOfDay, startOfDay, subDays } from 'date-fns';



export class OrderRepository implements OrderInterface {
    private constructor(private readonly repository: PrismaClient) {};
    
    public static build(repository: PrismaClient) {
        return new OrderRepository(repository);
    };

    public async create(order: OrderEntity): Promise<void> {
        const { 
            id,
            number,
            local,
            schedulingDate,
            schedulingTime,
            status,
            contact,
            price,
            userId,
            createdAt,
            updatedAt
        } = order;

        const user = await this.repository.user.findUnique({ where: { id: userId }});
        if(!user) {
            throw new HttpException("usuário não localizado", HttpStatus.BAD_REQUEST);
        };

        await this.repository.contract.create({
            data: {
                id,
                number,
                local,
                installationDate: schedulingDate,
                installationHour: schedulingTime,
                products: [""],
                status: status as Status,
                price,
                phone: contact,
                user: { connect: { id: userId } },
                createdAt,
                updatedAt
            }
        });

        return;
    };

    public async find(id: string): Promise<OrderEntity> {
        const order = await this.repository.contract.findUnique({ where: { id }});

        if(!order) {
            throw new HttpException("pedido não localizado com esse id", HttpStatus.NOT_FOUND);
        };

        const output = orderMapper.toEntity(order);
        return output;
    };

    public async list(query: ListOrderInput): Promise<ListOrderOutput> {
        const { 
            page,
            limit,
            userId,
            schedulingDateIn,
            schedulingDateOut,
            createdDateIn,
            createdDateOut,
            status
        } = query;

        const queryArgs: Prisma.ContractFindManyArgs = {
            where: {
                user: { id: userId }
            },
            take: limit,
            skip: (page - 1) * limit,
            orderBy: {
                installationDate: "desc"
            }
        };

        const countArgs: Prisma.ContractCountArgs = {
            where: {
                user: { id: userId }
            }
        };

        if(createdDateIn && createdDateOut) {
            queryArgs.where = {
                ...queryArgs.where,
                createdAt: {
                    gte: createdDateIn,
                    lte: createdDateOut
                }
            };

            countArgs.where = {
                ...countArgs.where,
                createdAt: {
                    gte: createdDateIn,
                    lte: createdDateOut
                }
            };
        };

        if(schedulingDateIn && schedulingDateOut) {
            queryArgs.where = {
                ...queryArgs.where,
                installationDate
                : {
                    gte: schedulingDateIn,
                    lte: schedulingDateOut
                }
            };

            countArgs.where = {
                ...countArgs.where,
                installationDate
                : {
                    gte: schedulingDateIn,
                    lte: schedulingDateOut
                }
            };
        };

        if(status) {
            queryArgs.where = {
                ...queryArgs.where,
                status: status as Status
            };

            countArgs.where = {
                ...countArgs.where,
                status: status as Status
            };
        };

        const [orders, total] = await this.repository.$transaction([
            this.repository.contract.findMany(queryArgs),
            this.repository.contract.count(countArgs)
        ]);

        const orderList = orders.map((order) => {
            return orderMapper.toEntity(order)
        });

        const pages = Math.ceil(total / limit);

        return {
            orders: orderList,
            total,
            pages,
            limit
        };
    };

    public async updateStatus(id: string, status: StatusEnum, updatedAt: Date): Promise<void> {
        await this.find(id);

        await this.repository.contract.update({
            where: { id },
            data: {
                status,
                updatedAt
            }
        });

        return;
    };

    public async updateScheduling(id: string, schedulingDate: Date, schedulingTime: string, updatedAt: Date): Promise<void> {
        await this.find(id);

        await this.repository.contract.update({
            where: { id },
            data: {
                installationDate: schedulingDate,
                installationHour: schedulingTime,
                updatedAt
            }
        });

        return;
    };

    public async update(id: string, number: number, local: string, price: number, contact: string, updatedAt: Date): Promise<void> {
        await this.find(id);

        await this.repository.contract.update({
            where: { id },
            data: {
                number,
                local,
                phone: contact,
                price,
                updatedAt
            }
        });

        return;
    };

    public async delete(id: string): Promise<void> {
        await this.find(id);

        await this.repository.contract.delete({
            where: { id }
        });

        return;
    };
};