// Self-hosted placeholder clips (public/clips): slow camera moves over the placeholder photos.
//
// They replace third-party stock footage that was hot-linked from Mixkit. A hot-linked file can be
// blocked or moved at any time, and some phones refuse a video unless the server answers partial
// ("range") requests properly, so a clip on the site's own domain is the reliable choice.
//
// Each clip comes as H.264 .mp4 (plays everywhere, including iPhones) with a .webm fallback. To use
// the client's real footage, export the same two files (720p, no audio, small) into public/clips and
// point a name at them: nothing else in the site needs to change.
export const clip = (name: string) => [`/clips/${name}.mp4`, `/clips/${name}.webm`];

// Pools for the looping reel at the top of the page. Each visit plays them in a different random order.
export const weddingReel = [clip("ceremony"), clip("details"), clip("celebration"), clip("dance")];
export const filmsReel = [...weddingReel, clip("stage"), clip("studio")];
