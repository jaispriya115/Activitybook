export interface Paginatination {
	currentPage: number;
	itemsPerPage: number;
	totalPages: number;
	totalItems: number;
}

export class PaginatedResult<T> {
	data: T;
	pagination: Paginatination;

	constructor(data: T, pagination: Paginatination) {
		this.data = data;
		this.pagination = pagination;
	}
}

export class PagingParams {
	pageNumber;
	pageSize;

	constructor(pageNumber = 1, pageSize = 3) {
		this.pageNumber = pageNumber;
		this.pageSize = pageSize;
	}
}
