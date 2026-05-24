import { render } from "../tools/render.js";
import { notFoundView } from "../views/not-found.js";

export function notFoundController(ctx) {
  return render(notFoundView, {}, { ...ctx, status: 404 });
}