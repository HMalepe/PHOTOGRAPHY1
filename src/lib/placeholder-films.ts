// Placeholder clips from Mixkit's free stock library until the client's own films replace them.
// Mixkit has served files under two URL schemes; listing both lets the browser fall through.
export const mixkit = (id: number, slug: string) => [
  `https://assets.mixkit.co/videos/${id}/${id}-720.mp4`,
  `https://assets.mixkit.co/videos/preview/mixkit-${slug}-${id}-large.mp4`,
];

// Pools for the looping reel at the top of the page. Only clips whose Mixkit license allows
// commercial use are listed. Each visit plays them in a different random order.
export const weddingReel = [
  mixkit(5217, "wedding-ceremony"),
  mixkit(35895, "wedding-stuff-background-video"),
  mixkit(40627, "bride-and-groom-at-their-wedding-standing-head-on-in-a"),
];
export const filmsReel = [
  ...weddingReel,
  mixkit(17631, "music-concert-crowd"),
  mixkit(13019, "a-rapper-with-headphones-recording-in-the-studio"),
  mixkit(13011, "a-man-singing-in-the-recording-studio"),
];
