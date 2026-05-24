import { escape } from "@std/html";

function moduleRow(module) {
  return `
    <tr>
      <td>
        <strong>${escape(module.title)}</strong>
        <p class="table-note">${escape(module.description)}</p>
      </td>

      <td>
        ${escape(module.moduleLeader || "To be confirmed")}
        ${
          module.moduleLeaderEmail
            ? `<p class="table-note">${escape(module.moduleLeaderEmail)}</p>`
            : ""
        }
      </td>

      <td class="table-actions">
        <a class="button secondary" href="/admin/modules/${module.id}/edit">Edit</a>

        <form
          method="POST"
          action="/admin/modules/${module.id}/delete"
          onsubmit="return confirm('Delete this module? This may remove it from programme structures.')"
        >
          <button class="button danger" type="submit">Delete</button>
        </form>
      </td>
    </tr>
  `;
}

export function adminModulesView({ modules }) {
  const rows = modules.length
    ? modules.map(moduleRow).join("")
    : `<tr><td colspan="3">No modules found.</td></tr>`;

  return `
    <section class="page-heading">
      <p class="eyebrow">Admin area</p>
      <h2>Manage modules</h2>
      <p>
        Admin users can create, edit and delete modules, as well as assign module leaders.
      </p>
    </section>

    <section class="page-panel">
      <div class="admin-actions">
        <a class="button secondary" href="/admin">Back to dashboard</a>
        <a class="button" href="/admin/modules/new">Create module</a>
      </div>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Module</th>
              <th>Module leader</th>
              <th>Actions</th>
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