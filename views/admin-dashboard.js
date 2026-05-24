import { escape } from "@std/html";

export function adminDashboardView({ session }) {
  return `
    <section class="page-heading">
      <p class="eyebrow">Admin area</p>
      <h2>Dashboard</h2>
      <p>
        Welcome, <strong>${escape(session.username)}</strong>.
        You are logged in as <strong>${escape(session.role)}</strong>.
      </p>
    </section>

    <section class="feature-grid">
      <article class="feature-card">
        <h3>Programmes</h3>
        <p>Create, update, publish and unpublish course programmes.</p>
        <a class="button" href="/admin/programmes">Manage programmes</a>
      </article>

      <article class="feature-card">
        <h3>Modules</h3>
        <p>Create, update and assign module leaders.</p>
        <a class="button" href="/admin/modules">Manage modules</a>
      </article>

      <article class="feature-card">
        <h3>Mailing lists</h3>
        <p>View prospective students who registered interest in programmes.</p>
        <a class="button" href="/admin/interests">View mailing lists</a>
      </article>
    </section>
  `;
}