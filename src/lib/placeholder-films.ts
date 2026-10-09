// Placeholder clips from Mixkit's free stock library until the client's own films replace them.
// Mixkit has served files under two URL schemes; listing both lets the browser fall through.
export const mixkit = (id: number, slug: string) => [
  `https://assets.mixkit.co/videos/${id}/${id}-720.mp4`,
  `https://assets.mixkit.co/videos/preview/mixkit-${slug}-${id}-large.mp4`,
];
