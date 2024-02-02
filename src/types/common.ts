import { User } from "@/app/user/domainModels/user";
import type { Transaction } from "sequelize";

export interface Auditor {
    updatedAt?: number;
    updatedById?: string;
    createdAt?: number;
    createdById?: string;
}

export interface OperationContext {
    user: User;
    transaction?: Transaction;
}
