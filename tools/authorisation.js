import { redirect } from "./redirect.js";

export function requireLogin(ctx) {
  if (!ctx.session) {
    return redirect("/login");
  }

  return null;
}

export function requireAdmin(ctx) {
  const loginBlock = requireLogin(ctx);

  if (loginBlock) {
    return loginBlock;
  }

  if (ctx.session.role !== "admin") {
    return new Response("Forbidden: admin access required.", {
      status: 403,
      headers: {
        "content-type": "text/plain; charset=utf-8"
      }
    });
  }

  return null;
}