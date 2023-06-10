import { RateLimiter } from "limiter";

export const limiter = new RateLimiter({
  interval: "min",
  tokensPerInterval: 10,
  fireImmediately: true,
});
