const prodUrl = "https://api.linkio.world";
const devUrl = "http://localhost:5505";

export const server = process.env.NODE_ENV === "development" ? devUrl : prodUrl;

// SEP-24 anchor server
export const anchorUrl = "https://anchor.linkio.world/sep24";
// export const anchorUrl = "http://localhost:8000/sep24";
