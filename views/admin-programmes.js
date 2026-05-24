import { escape } from "@std/html";

function statusBadge(programme) {
  return programme.published
    ? `<span class="status published">Published</span>`
    : `<span class="status draft">Draft</span>`;
}

function publishButton(programme) {
  if (programme.published) {
    return `
      <form method="POST" action="/admin/programmes/${programme.id}/unpublish">
        <button class="button secondary" type="submit">Unpublish</button>
      </form>
    `;
  }

  return `
    <form method="POST" action="/admin/programmes/${programme.id}/publish">
      <button class="button" type="submit">Publish</button>
    </form>
  `;
}

function adminProgrammeRow(programme) {
  return `
    <tr>
      <td>
        <strong>${escape(programme.title)}</strong>
        <p class="table-note">${escape(programme.description)}</p>
      </td>
      <td>${escape(programme.level)}</td>
      <td>${escape(programme.programmeLeader || "To be confirmed")}</td>
      <td>${statusBadge(programme)}</td>
      <td class="table-actions">
  <a class="button secondary" href="/admin/programmes/${programme.id}/edit">Edit</a>

  <a class="button secondary" href="/admin/programmes/${programme.id}/modules">Modules</a>

  ${publishButton(programme)}

  <form
    method="POST"
    action="/admin/programmes/${programme.id}/delete"
    onsubmit="return confirm('Delete this programme? This cannot be undone.')"
  >
    <button class="button danger" type="submit">Delete</button>
  </form>
</td>
      <
    </tr>
  `;
}

export function adminProgrammesView({ programmes }) {
  const rows = programmes.length
    ? programmes.map(adminProgrammeRow).join("")
    : `<tr><td colspan="5">No programmes found.</td></tr>`;

  return `
    <section class="page-heading">
      <p class="eyebrow">Admin area</p>
      <h2>Manage programmes</h2>
      <p>
        Admin users can view both published public programmes and unpublished draft programmes.
      </p>
    </section>

    <section class="page-panel">
      <div class="admin-actions">
        <a class="button" href="/admin">Back to dashboard</a>
      </div>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Programme</th>
              <th>Level</th>
              <th>Programme leader</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    </section>
  `;
}