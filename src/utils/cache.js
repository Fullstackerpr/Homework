import NodeCache from "node-cache";

const cache = new NodeCache({stdTTl: 300});

export const getChashe = (key) => {
    return cache.get(key);
}

export const setChache = (key, value) => {
    return cache.set(key, value);
}