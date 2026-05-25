import { escape } from "@std/html";

function safe(value = "") {
  return escape(String(value ?? ""));
}

export function render(viewFunction, viewData = {}, ctx = {}) {
  const content = viewFunction(viewData);
  const session = ctx.session;

  const authNav = session
    ? `
      <a href="/admin">Admin</a>
      <form class="nav-form" method="POST" action="/logout">
        <button type="submit">Logout ${safe(session.username)}</button>
      </form>
    `
    : `<a href="/login">Admin Login</a>`;

  return new Response(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Student Course Hub</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <a class="skip-link" href="#main">Skip to main content</a>

  <header class="site-header">
    <div class="container header-content">
      <h1>Student Course Hub</h1>

      <nav aria-label="Main navigation">
        <a href="/">Home</a>
        <a href="/programmes">Programmes</a>
        ${authNav}
      </nav>
    </div>
  </header>

  <main id="main" class="container">
    ${content}
  </main>

  <footer class="site-footer">
    <div class="container">
      ${
        session
          ? `<p>Signed in as ${safe(session.username)} (${safe(session.role)})</p>`
          : `<p>&copy; 2026 Student Course Hub. Built with Deno, HTML, CSS and JavaScript.</p>`
      }
    </div>
  </footer>

  <script type="module" src="/app.js?v=3"></script>
</body>
</html>`, {
    status: ctx.status || 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}