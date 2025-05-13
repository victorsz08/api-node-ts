import { v4 as uuid } from "uuid";



class GenerateRandonId {
    public generate(): string {
        const id = uuid();
        return id
    };
};

export default new GenerateRandonId();