import { RoleEnum } from "../enum/role.enum";




export interface SecurityInterface {
    recovery(id: string, password: string, updatedAt: Date): Promise<void>;
    grantedUser(id: string, role: RoleEnum, updatedAt: Date): Promise<void>;
};