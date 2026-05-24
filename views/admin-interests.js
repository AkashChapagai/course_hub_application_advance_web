import { escape } from "@std/html";

function programmeFilterOptions(programmes, selectedProgrammeId) {
  return programmes.map((programme) => `
    <option value="${programme.id}" ${String(selectedProgrammeId) === String(programme.id) ? "selected" : ""}>
      ${escape(programme.title)}
    </option>
  `).join("");
}

function interestRow(interest) {
  return `
    <tr>
      <td>
        <strong>${escape(interest.studentName)}</strong>
        <p class="table-note">${escape(interest.studentEmail)}</p>
      </td>

      <td>
        <strong>${escape(interest.programmeTitle)}</strong>
        <p class="table-note">${escape(interest.programmeLevel)}</p>
      </td>

      <td>${escape(interest.createdAt)}</td>

      <td class="table-actions">
        <form
          method="POST"
          action="/admin/interests/${interest.id}/delete"
          onsubmit="return confirm('Remove this interest registration?')"
        >
          <button class="button danger" type="submit">Remove</button>
        </form>
      </td>
    </tr>
  `;
}

export function adminInterestsView({
  interests = [],
  programmes = [],
  selectedProgrammeId = ""
}) {
  const rows = interests.length
    ? interests.map(interestRow).join("")
    : `<tr><td colspan="4">No interest registrations found.</td></tr>`;

  const exportLink = selectedProgrammeId
    ? `<a class="button" href="/admin/programmes/${selectedProgrammeId}/interests.csv">Export CSV</a>`
    : "";

  return `
    <section class="page-heading">
      <p class="eyebrow">Admin area</p>
      <h2>Student interest mailing lists</h2>
      <p>
        View prospective students who have registered interest in programmes.
        Admin users can filter by programme and export mailing lists.
      </p>
    </section>

    <section class="page-panel">
      <div class="admin-actions">
        <a class="button secondary" href="/admin">Back to dashboard</a>
        ${exportLink}
      </div>

      <form method="GET" action="/admin/interests" class="programme-toolbar">
        <label for="programmeId">Filter by programme</label>
        <select id="programmeId" name="programmeId">
          <option value="">All programmes</option>
          ${programmeFilterOptions(programmes, selectedProgrammeId)}
        </select>

        <button class="button" type="submit">Apply filter</button>
      </form>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Programme</th>
              <th>Registered at</th>
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