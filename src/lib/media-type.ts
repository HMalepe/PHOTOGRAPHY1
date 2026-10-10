/** MIME type for a clip URL, so browsers can skip a format they can't play without downloading it. */
export const mediaType = (url: string) => (url.endsWith(".webm") ? "video/webm" : "video/mp4");
