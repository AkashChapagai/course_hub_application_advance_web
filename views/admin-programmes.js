import { escape } from "@std/html";

function safe(value = "") {
  return escape(String(value ?? ""));
}

function statusBadge(programme) {
  return programme.published
    ? `<span class="status-badge published">Published</span>`
    : `<span class="status-badge draft">Draft</span>`;
}

function publishAction(programme) {
  if (programme.published) {
    return `
      <form method="POST" action="/admin/programmes/${safe(programme.id)}/unpublish">
        <button class="button secondary" type="submit">Unpublish</button>
      </form>
    `;
  }

  return `
    <form method="POST" action="/admin/programmes/${safe(programme.id)}/publish">
      <button class="button secondary" type="submit">Publish</button>
    </form>
  `;
}

function programmeRow(programme) {
  return `
    <tr>
      <td>
        <strong>${safe(programme.title)}</strong>
        <p>${safe(programme.description)}</p>
      </td>

      <td>${safe(programme.level)}</td>

      <td>${safe(programme.programmeLeader || "To be confirmed")}</td>

      <td>${statusBadge(programme)}</td>

      <td>
        <div class="action-group">
          <a class="button secondary" href="/admin/programmes/${safe(programme.id)}/edit">
            Edit
          </a>

          <a class="button secondary" href="/admin/programmes/${safe(programme.id)}/modules">
            Modules
          </a>

          ${publishAction(programme)}

          <form
            method="POST"
            action="/admin/programmes/${safe(programme.id)}/delete"
            onsubmit="return confirm('Are you sure you want to delete this programme?');"
          >
            <button class="button danger" type="submit">Delete</button>
          </form>
        </div>
      </td>
    </tr>
  `;
}

export function adminProgrammesView({ programmes = [] }) {
  const programmeRows = programmes.length
    ? programmes.map(programmeRow).join("")
    : `
      <tr>
        <td colspan="5">
          <p class="empty-message">No programmes have been created yet.</p>
        </td>
      </tr>
    `;

  return `
    <section class="page-heading">
      <p class="eyebrow">Admin area</p>
      <h2>Manage programmes</h2>
      <p>
        Admin users can create, edit, publish and unpublish programmes.
        Published programmes appear on the student-facing website.
      </p>
    </section>

    <section class="admin-panel">
      <div class="admin-actions">
        <a class="button" href="/admin/programmes/new">Create programme</a>
        <a class="button secondary" href="/admin">Back to dashboard</a>
      </div>

      <div class="table-wrapper">
        <table>
          <caption>Programme management table</caption>
          <thead>
            <tr>
              <th scope="col">Programme</th>
              <th scope="col">Level</th>
              <th scope="col">Programme leader</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            ${programmeRows}
          </tbody>
        </table>
      </div>
    </section>
  `;
}