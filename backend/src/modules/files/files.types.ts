// this is mix n match queries for files listing
export interface ListFilesQuery {
    page?: number;
    limit?: number;

    folderId?: string;

    search?: string;

    sortBy?: "created_at" | "name" | "size";
    sortOrder?: "asc" | "desc";
}