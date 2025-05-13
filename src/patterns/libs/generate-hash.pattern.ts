import { compare, hash } from "bcryptjs";




class GenerateHash {
    public async generate(value: string): Promise<string> {
        const hashString = await hash(value, 10);
        
        return hashString;
    };

    public async compareHash(password: string, hash: string): Promise<boolean> {
        const validate = await compare(password, hash);

        return validate;
    };
};

export default new GenerateHash();