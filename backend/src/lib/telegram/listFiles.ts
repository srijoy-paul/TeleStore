import { client } from "./client";

export const listFilesFromTelegram = async (limit = 20) => {
    const mssgs = await client.getMessages("me", { limit });

    const files = mssgs
        .filter((mssg) => mssg.media)
        .map((mssg) => {
            const media = mssg.media as any;
            const document = media?.document;

            let fileName = "unknown";
            let size = 0;

            if (document) {
                // 1. Search attributes array robustly for DocumentAttributeFilename (which holds fileName)
                const fileAttr = document.attributes?.find(
                    (attr: any) => attr && typeof attr.fileName === "string"
                );
                if (fileAttr) {
                    fileName = fileAttr.fileName;
                }

                // 2. Extract size, safely handling GramJS custom Integer objects, bigint, or number
                if (document.size !== undefined && document.size !== null) {
                    if (typeof document.size === "object" && "value" in document.size) {
                        size = Number(document.size.value);
                    } else {
                        size = Number(document.size);
                    }
                }
            } else if (media?.photo) {
                // 3. Fallback for photos (MessageMediaPhoto)
                const photoId = media.photo.id;
                const safePhotoId = typeof photoId === "object" && "value" in photoId 
                    ? photoId.value.toString() 
                    : photoId.toString();
                
                fileName = `photo_${safePhotoId}.jpg`;

                // Retrieve largest photo size
                const photoSizes = media.photo.sizes;
                if (Array.isArray(photoSizes) && photoSizes.length > 0) {
                    const largestPhoto = photoSizes[photoSizes.length - 1];
                    const photoSize = largestPhoto?.size;
                    if (photoSize !== undefined && photoSize !== null) {
                        size = typeof photoSize === "object" && "value" in photoSize
                            ? Number(photoSize.value)
                            : Number(photoSize);
                    }
                }
            }

            // 4. Fallback if filename is still unknown but there is a caption message
            if ((!fileName || fileName === "unknown") && mssg.message) {
                const cleanCaption = mssg.message
                    .trim()
                    .slice(0, 30)
                    .replace(/[^a-zA-Z0-9_\-.]/g, "_");
                if (cleanCaption) {
                    fileName = cleanCaption;
                }
            }

            return {
                messageId: mssg.id,
                fileName: fileName || "unknown",
                size: size || 0,
                date: mssg.date
            };
        });

    return files;
};
