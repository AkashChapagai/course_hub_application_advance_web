import { escape } from "@std/html";

function safe(value = "") {
  return escape(String(value ?? ""));
}

export function adminDashboardView({ session }) {
  const username = safe(session?.username || "admin");
  const role = safe(session?.role || "administrator");

  return `
    <section class="dashboard-hero">
      <div>
        <p class="eyebrow">Admin area</p>
        <h2>Student Course Hub Dashboard</h2>
        <p>
          Welcome, <strong>${username}</strong>. You are signed in as
          <strong>${role}</strong> and can manage the programme information shown
          on the public student-facing website.
        </p>
      </div>

      <div class="dashboard-meta" aria-label="Current admin session">
        <span>Signed in</span>
        <strong>${username}</strong>
        <small>Role: ${role}</small>
      </div>
    </section>

    <section class="dashboard-actions" aria-labelledby="quick-actions-heading">
      <div>
        <p class="eyebrow">Quick actions</p>
        <h3 id="quick-actions-heading">Common admin tasks</h3>
      </div>

      <div class="dashboard-action-buttons">
        <a class="button" href="/admin/programmes/new">Create programme</a>
        <a class="button secondary" href="/admin/modules/new">Add module</a>
        <a class="button secondary" href="/admin/interests">View mailing lists</a>
      </div>
    </section>

    <section class="dashboard-grid" aria-label="Admin management sections">
      <article class="dashboard-card">
        <div class="dashboard-card-icon" aria-hidden="true">📘</div>
        <div>
          <h3>Programmes</h3>
          <p>
            Create, update, publish and unpublish undergraduate and postgraduate
            programmes. Only published programmes appear on the public website.
          </p>
          <div class="card-actions">
            <a class="button" href="/admin/programmes">Manage programmes</a>
            <a class="button secondary" href="/admin/programmes/new">Create new</a>
          </div>
        </div>
      </article>

      <article class="dashboard-card">
        <div class="dashboard-card-icon" aria-hidden="true">🧩</div>
        <div>
          <h3>Modules</h3>
          <p>
            Add and update modules, assign module leaders and keep course content
            accurate for prospective students.
          </p>
          <div class="card-actions">
            <a class="button" href="/admin/modules">Manage modules</a>
            <a class="button secondary" href="/admin/modules/new">Add module</a>
          </div>
        </div>
      </article>

      <article class="dashboard-card">
        <div class="dashboard-card-icon" aria-hidden="true">📧</div>
        <div>
          <h3>Mailing lists</h3>
          <p>
            View prospective students who registered interest in programmes and
            export targeted mailing lists for communication.
          </p>
          <div class="card-actions">
            <a class="button" href="/admin/interests">View interests</a>
          </div>
        </div>
      </article>

      <article class="dashboard-card">
        <div class="dashboard-card-icon" aria-hidden="true">🌐</div>
        <div>
          <h3>Public website</h3>
          <p>
            Review the student-facing programme list, keyword search and level
            filter as prospective students would experience them.
          </p>
          <div class="card-actions">
            <a class="button" href="/programmes">View public programmes</a>
          </div>
        </div>
      </article>
    </section>

    <section class="dashboard-note">
      <h3>Admin responsibilities</h3>
      <ul>
        <li>Keep programme and module information accurate and up to date.</li>
        <li>Publish only valid programmes to the student-facing website.</li>
        <li>Protect student contact details and mailing lists from unauthorised access.</li>
        <li>Remove invalid or duplicate interest registrations when required.</li>
      </ul>
    </section>
  `;
}