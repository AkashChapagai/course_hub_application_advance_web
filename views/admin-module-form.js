import { escape } from "@std/html";

function fieldError(errors, fieldName) {
  return errors?.[fieldName]?.message
    ? `<span class="error-message">${escape(errors[fieldName].message)}</span>`
    : "";
}

function valueFor(module, errors, fieldName) {
  if (errors?.[fieldName]?.value !== undefined) {
    return escape(errors[fieldName].value);
  }

  return escape(module?.[fieldName] ?? "");
}

function selected(currentValue, optionValue) {
  return String(currentValue) === String(optionValue) ? "selected" : "";
}

function staffOptions(staff, currentLeaderId) {
  const options = staff.map((member) => `
    <option value="${member.id}" ${selected(currentLeaderId, member.id)}>
      ${escape(member.name)} — ${escape(member.title)}
    </option>
  `).join("");

  return `
    <option value="">No module leader selected</option>
    ${options}
  `;
}

export function adminModuleFormView({
  mode,
  module = {},
  staff = [],
  errors = {}
}) {
  const isEdit = mode === "edit";

  const action = isEdit
    ? `/admin/modules/${module.id}/update`
    : "/admin/modules";

  const title = isEdit ? "Edit module" : "Create module";

  const currentLeaderId = errors?.moduleLeaderId?.value ?? module.moduleLeaderId ?? "";

  return `
    <section class="page-heading">
      <p class="eyebrow">Admin area</p>
      <h2>${title}</h2>
      <p>
        Use this form to manage module information and assign a module leader.
      </p>
    </section>

    <section class="page-panel">
      <form method="POST" action="${action}" class="form-grid admin-form" novalidate>
        <div>
          <label for="title">Module title</label>
          <input
            id="title"
            name="title"
            type="text"
            value="${valueFor(module, errors, "title")}"
          >
          ${fieldError(errors, "title")}
        </div>

        <div>
          <label for="moduleLeaderId">Module leader</label>
          <select id="moduleLeaderId" name="moduleLeaderId">
            ${staffOptions(staff, currentLeaderId)}
          </select>
          ${fieldError(errors, "moduleLeaderId")}
        </div>

        <div>
          <label for="description">Description</label>
          <textarea id="description" name="description" rows="7">${valueFor(module, errors, "description")}</textarea>
          ${fieldError(errors, "description")}
        </div>

        <div class="form-actions">
          <button class="button" type="submit">
            ${isEdit ? "Update module" : "Create module"}
          </button>

          <a class="button secondary" href="/admin/modules">Cancel</a>
        </div>
      </form>
    </section>
  `;
}