import { UserEntity } from "../entities/user.entity";





export type ListUserInput = {
    page: number;
    limit: number;
    search?: string;
};

export type ListUserOutput = {
    users: UserEntity[];
    total: number;
    pages: number;
    limit: number;
};


export interface UserInterface {
    create(user: UserEntity): Promise<void>;
    find(id: string): Promise<UserEntity>;
    list(query: ListUserInput): Promise<ListUserOutput>;
    update(id: string, username: string, firstName: string, lastName: string, updatedAt: Date): Promise<void>;
    updatePassword(id: string, password: string, updatedAt: Date): Promise<void>;
    delete(id: string): Promise<void>;
};