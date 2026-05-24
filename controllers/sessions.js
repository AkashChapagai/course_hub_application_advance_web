import { render } from "../tools/render.js";
import { redirect } from "../tools/redirect.js";
import { loginView } from "../views/login.js";
import { validateCredentials } from "../models/user.js";
import { login, logout } from "../tools/auth.js";
import {
  validateSchema,
  loginSchema
} from "../tools/validation.js";

export function loginFormController(ctx) {
  if (ctx.session) {
    return redirect("/admin");
  }

  return render(loginView, {}, ctx);
}

export async function loginController(ctx) {
  const { request } = ctx;
  const formData = await request.formData();

  const { isValid, errors, validated } = validateSchema(formData, loginSchema);

  if (!isValid) {
    return render(loginView, { errors }, { ...ctx, status: 400 });
  }

  const result = await validateCredentials(validated);

  if (!result.ok) {
    return render(
      loginView,
      { errors: { ...errors, ...result.errors } },
      { ...ctx, status: 401 }
    );
  }

  const headers = new Headers();
  login(headers, result.user);

  return redirect("/admin", headers);
}

export function logoutController(ctx) {
  const headers = new Headers();

  logout(headers, ctx.request);

  return redirect("/", headers);
}