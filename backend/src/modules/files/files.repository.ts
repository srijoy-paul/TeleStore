import prisma from "../../lib/db/prisma";
import { ListFilesQuery } from "./files.types";

export const findFiles = async (query: ListFilesQuery) => {
    const {
        page = 1,
        limit = 20,
        folderId,
        search,
        sortBy = "createdAt",
        sortOrder = "desc"
    } = query;

    console.log("QUERY params received for fetch files listing: ", query)

    const skip = (page - 1) * limit;

    const where = {
        ...(folderId && { folderId }),

        ...(search && {
            name: {
                contains: search,
            }
        })
    };

    console.log("where clause received for fetch files listing (skip,where): ", skip, "\n", where)

    const [files, total] = await Promise.all([
        prisma.file.findMany({
            where,
            skip,
            take: limit,

            orderBy: {
                [sortBy]: sortOrder,
            },

            include: {
                folder: true,
            },
        }),

        prisma.file.count({
            where
        })

    ]);

    return {
        files,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        }
    }
};