const prodUrl = "https://api.linkio.world";
const devUrl = "http://localhost:5505";

export const server = process.env.NODE_ENV === "development" ? devUrl : prodUrl;
