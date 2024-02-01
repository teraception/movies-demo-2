import { OperationContext } from "@/types/common";
import dayjs from "dayjs";
import { defaults } from "lodash";

export function getUpdatedAt(context: OperationContext) {
    if (context && context.user) {
        return {
            updatedAt: dayjs().unix(),
            updatedById: context.user.id,
        };
    }

    return {
        updatedAt: dayjs().unix(),
        updatedById: null,
    };
}
export function getCreatedAt(context: OperationContext) {
    if (context && context.user) {
        return {
            createdAt: dayjs().unix(),
            createdById: context.user.id,
        };
    }

    return {
        createdAt: dayjs().unix(),
        createdById: null,
    };
}

export function getContextProps(context: OperationContext) {
    if (context && context.transaction) {
        return {
            transaction: context.transaction,
        };
    } else {
        return {
            transaction: null,
        };
    }
}

export function initOperationContext(
    values?: OperationContext,
    old: OperationContext = {
        user: null,
    }
) {
    const op = defaults({}, values, old);
    return op;
}
