import { dirname } from "path";

/**
 * Get __dirname (give import.metadata.url)
 */
export const getDirname = (url: string): string => {
    return dirname(url.substring(7));
};
