export class PaginatedList<T> {

    public docs: T[] = [];
    public limit: number = 15;
    public page: number = 1;
    public pages: number = 1;
    public total: number = 0;
}

