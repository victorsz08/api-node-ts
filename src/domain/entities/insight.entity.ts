

export type InsightType = {
    revenue: number;
    completionRate: number;
    cancelledRate: number;
    sales: number;
    connected: number;
    cancelled: number;
    pending: number;
};


export class InsightEntity {
    private constructor(private readonly props: InsightType) {};

    public static with(props: InsightType) {
        return new InsightEntity(props);
    };

    public get revenue() {
        return this.props.revenue;
    };

    public get sales() {
        return this.props.sales;
    };

    public get completionRate() {
        return this.props.completionRate;
    };

    public get cancelledRate() {
        return this.props.cancelledRate;
    };

    public get connected() {
        return this.props.connected;
    };

    public get cancelled() {
        return this.props.cancelled;
    };

    public get pending() {
        return this.props.pending;
    };
};