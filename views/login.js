import { escape } from "@std/html";

function fieldError(errors, fieldName) {
  return errors?.[fieldName]?.message
    ? `<span class="error-message">${escape(errors[fieldName].message)}</span>`
    : "";
}

function oldValue(errors, fieldName) {
  return escape(errors?.[fieldName]?.value || "");
}

export function loginView({ errors = {} }) {
  return `
    <section class="page-panel auth-panel">
      <p class="eyebrow">Administrator access</p>
      <h2>Admin login</h2>
      <p>
        Sign in to manage programmes, modules, staff and student interest lists.
      </p>

      ${
        errors.credentials
          ? `<p class="error-summary">${escape(errors.credentials)}</p>`
          : ""
      }

      <form method="POST" action="/sessions" class="form-grid" novalidate>
        <div>
          <label for="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value="${oldValue(errors, "username")}"
            autocomplete="username"
          >
          ${fieldError(errors, "username")}
        </div>

        <div>
          <label for="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
          >
          ${fieldError(errors, "password")}
        </div>

        <button class="button" type="submit">Sign in</button>
      </form>

      <p class="hint">
        Demo admin account: <strong>admin</strong> / <strong>admin123</strong>
      </p>
    </section>
  `;
}