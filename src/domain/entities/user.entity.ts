import generateHashPattern from "../../patterns/libs/generate-hash.pattern";
import generateIdPattern from "../../patterns/libs/generate-id.pattern";
import { RoleEnum } from "../enum/role.enum";


export type UserType = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    role: RoleEnum;
    password: string;
    createdAt: Date;
    updatedAt: Date;
};


export class UserEntity {
    private constructor(private readonly props: UserType) {};

    public static async build(username: string, firstName: string, lastName: string, password: string) {
        return new UserEntity({
            id: generateIdPattern.generate(),
            username,
            firstName,
            lastName,
            role: RoleEnum.USER,
            password: await generateHashPattern.generate(password),
            createdAt: new Date(),
            updatedAt: new Date()
        });
    };

    public static with(props: UserType) {
        return new UserEntity(props);
    };

    public get id() {
        return this.props.id;
    };

    public get username() {
        return this.props.username;
    };

    public get firstName() {
        return this.props.firstName;
    };

    public get lastName() {
        return this.props.lastName;
    };

    public get role() {
        return this.props.role;
    };

    public get password() {
        return this.props.password;
    };

    public get createdAt() {
        return this.props.createdAt;
    };

    public get updatedAt() {
        return this.props.updatedAt;
    };
};