import { BaseHttpRequest, GeneratedApiClient } from "@/generated/api";
import { Auth } from "@/storage/auth";
import { env } from "@/utils/env";

export type ApiClientParams = {
  token: (typeof BaseHttpRequest.prototype)["config"]["TOKEN"];
};

function toBasePath(path: string) {
  return path.replace(/\/$/, ``);
}

export const ApiClientWith = ({ token }: ApiClientParams) =>
  new GeneratedApiClient({
    BASE: toBasePath(env("NEXT_PUBLIC_API_URL")),
    TOKEN: token,
  });

export const ApiClient = ApiClientWith({
  token: Auth.apiToken ?? undefined,
}).default;
