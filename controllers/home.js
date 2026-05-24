import { render } from "../tools/render.js";
import { homeView } from "../views/home.js";

export function homeController(ctx) {
  return render(homeView, {}, ctx);
}