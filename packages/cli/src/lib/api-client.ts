import { hc } from "hono/client";
import { AppType } from "@nightcode/server";

export const apiClient = hc<AppType>(
	process.env.API_URL ?? "http://localhost:3000",
);
