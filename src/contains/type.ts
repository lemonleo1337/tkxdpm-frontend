export type PaginationType = {
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
};
export type SortEnum = "asc" | "desc";

export type PageType = {
    page: number;
    take: number | undefined;
    sort: SortEnum;
    sort_by: string;
}