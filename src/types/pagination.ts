export interface PaginationInfoDetail {
    start: number;
    end: number;
    perPage: number;
    totalItems: number;
}

export interface PaginatedResponse<T> {
    items: T[];
    paginationMeta: PaginationInfoDetail;
}

export interface PaginationParam {
    pageNumber: number;
    perPage: number;
}

export function getOffsetFromPagination(pagination: PaginationParam) {
    if (!pagination || !pagination.perPage || pagination.perPage == null) {
        return 0;
    }
    return (Math.max(pagination.pageNumber, 1) - 1) * pagination.perPage;
}
export function getPaginationMeta<T>(
    params: PaginationParam,
    result: {
        items: T[];
        total: number;
    }
): PaginationInfoDetail {
    const start = getOffsetFromPagination(params);

    return {
        start: start,
        end: Math.max(result.total - 1, 0),
        perPage: params.perPage,
        totalItems: result.total,
    };
}

export function paginate<T>(
    data: T[],
    paginationDef: PaginationParam
): Omit<PaginatedResponse<T>, "status" | "errors"> {
    const start = getPaginationMeta(paginationDef, {
        items: data,
        total: data.length,
    });

    const items = data.slice(start.start, start.end);
    return {
        items: items,
        paginationMeta: start,
    };
}
