"use client";

export const Auth = {
  get apiToken() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth.api.token");
  },
  set apiToken(token: string | null) {
    if (typeof window === "undefined") return;
    if (token === null) localStorage.removeItem("auth.api.token");
    else localStorage.setItem("auth.api.token", token);
  },
};
