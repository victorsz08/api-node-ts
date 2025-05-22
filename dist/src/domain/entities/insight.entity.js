"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsightEntity = void 0;
class InsightEntity {
    constructor(props) {
        this.props = props;
    }
    ;
    static with(props) {
        return new InsightEntity(props);
    }
    ;
    get revenue() {
        return this.props.revenue;
    }
    ;
    get sales() {
        return this.props.sales;
    }
    ;
    get completionRate() {
        return this.props.completionRate;
    }
    ;
    get cancelledRate() {
        return this.props.cancelledRate;
    }
    ;
    get connected() {
        return this.props.connected;
    }
    ;
    get cancelled() {
        return this.props.cancelled;
    }
    ;
    get pending() {
        return this.props.pending;
    }
    ;
}
exports.InsightEntity = InsightEntity;
;
