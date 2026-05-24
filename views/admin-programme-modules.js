import { escape } from "@std/html";

function fieldError(errors, fieldName) {
  return errors?.[fieldName]?.message
    ? `<span class="error-message">${escape(errors[fieldName].message)}</span>`
    : "";
}

function selected(currentValue, optionValue) {
  return String(currentValue) === String(optionValue) ? "selected" : "";
}

function moduleOptions(modules, selectedModuleId) {
  return modules.map((module) => `
    <option value="${module.id}" ${selected(selectedModuleId, module.id)}>
      ${escape(module.title)}
    </option>
  `).join("");
}

function currentModuleRow(programmeModule) {
  return `
    <tr>
      <td>Year ${escape(String(programmeModule.year))}</td>
      <td>
        <strong>${escape(programmeModule.title)}</strong>
        <p class="table-note">${escape(programmeModule.description)}</p>
      </td>
      <td>${escape(programmeModule.moduleLeader || "To be confirmed")}</td>
      <td class="table-actions">
        <form
          method="POST"
          action="/admin/programmes/${programmeModule.programmeId}/modules/${programmeModule.moduleId}/remove"
          onsubmit="return confirm('Remove this module from the programme?')"
        >
          <button class="button danger" type="submit">Remove</button>
        </form>
      </td>
    </tr>
  `;
}

export function adminProgrammeModulesView({
  programme,
  currentModules = [],
  allModules = [],
  errors = {}
}) {
  const rows = currentModules.length
    ? currentModules.map(currentModuleRow).join("")
    : `<tr><td colspan="4">No modules are attached to this programme yet.</td></tr>`;

  const selectedModuleId = errors?.moduleId?.value || "";
  const selectedYear = errors?.year?.value || "";

  return `
    <section class="page-heading">
      <p class="eyebrow">Admin area</p>
      <h2>Manage modules for ${escape(programme.title)}</h2>
      <p>
        Attach existing modules to this programme and choose the year of study
        in which each module is taught.
      </p>
    </section>

    <section class="page-panel">
      <div class="admin-actions">
        <a class="button secondary" href="/admin/programmes">Back to programmes</a>
        <a class="button secondary" href="/admin/modules">Manage all modules</a>
      </div>

      <h3>Attach module</h3>

      <form
        method="POST"
        action="/admin/programmes/${programme.id}/modules"
        class="form-grid admin-form"
        novalidate
      >
        <div>
          <label for="moduleId">Module</label>
          <select id="moduleId" name="moduleId">
            <option value="">Select module</option>
            ${moduleOptions(allModules, selectedModuleId)}
          </select>
          ${fieldError(errors, "moduleId")}
        </div>

        <div>
          <label for="year">Year of study</label>
          <select id="year" name="year">
            <option value="">Select year</option>
            <option value="1" ${selected(selectedYear, "1")}>Year 1</option>
            <option value="2" ${selected(selectedYear, "2")}>Year 2</option>
            <option value="3" ${selected(selectedYear, "3")}>Year 3</option>
            <option value="4" ${selected(selectedYear, "4")}>Year 4</option>
          </select>
          ${fieldError(errors, "year")}
        </div>

        <button class="button" type="submit">Attach module</button>
      </form>
    </section>

    <section class="page-panel">
      <h3>Current programme structure</h3>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Module</th>
              <th>Module leader</th>
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