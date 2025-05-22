"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteEntity = void 0;
const generate_id_pattern_1 = __importDefault(require("../../patterns/libs/generate-id.pattern"));
class NoteEntity {
    constructor(props) {
        this.props = props;
    }
    ;
    static build(content, userId) {
        return new NoteEntity({
            id: generate_id_pattern_1.default.generate(),
            content,
            userId,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }
    ;
    static with(props) {
        return new NoteEntity(props);
    }
    ;
    get id() {
        return this.props.id;
    }
    ;
    get content() {
        return this.props.content;
    }
    ;
    get userId() {
        return this.props.userId;
    }
    ;
    get createdAt() {
        return this.props.createdAt;
    }
    ;
    get updatedAt() {
        return this.props.updatedAt;
    }
    ;
}
exports.NoteEntity = NoteEntity;
;
