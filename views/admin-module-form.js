import { escape } from "@std/html";

function safe(value = "") {
  return escape(String(value ?? ""));
}

function fieldError(errors, fieldName) {
  const message = errors?.[fieldName]?.message;

  if (!message) {
    return "";
  }

  return `
    <p class="error-message" id="${fieldName}-error" role="alert">
      ${safe(message)}
    </p>
  `;
}

function valueFor(module, errors, fieldName) {
  if (errors?.[fieldName]?.value !== undefined) {
    return safe(errors[fieldName].value);
  }

  return safe(module?.[fieldName] ?? "");
}

function selected(currentValue, optionValue) {
  return String(currentValue) === String(optionValue) ? "selected" : "";
}

function staffOptions(staff, currentLeaderId) {
  const options = staff.map((member) => `
    <option value="${safe(member.id)}" ${selected(currentLeaderId, member.id)}>
      ${safe(member.name)} — ${safe(member.title)}
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
  errors = {},
}) {
  const isEdit = mode === "edit";

  const action = isEdit
    ? `/admin/modules/${safe(module.id)}/update`
    : "/admin/modules";

  const title = isEdit ? "Edit module" : "Create module";
  const buttonText = isEdit ? "Update module" : "Create module";

  const currentLeaderId = errors?.moduleLeaderId?.value ??
    module.moduleLeaderId ??
    "";

  return `
    <section class="page-heading">
      <p class="eyebrow">Admin area</p>
      <h2>${title}</h2>
      <p>
        Use this form to manage module information, add an image link and assign
        a module leader.
      </p>
    </section>

    <section class="page-panel">
      <form method="POST" action="${action}" class="form-grid admin-form" novalidate>
        <div class="form-field">
          <label for="title">Module title</label>
          <input
            id="title"
            name="title"
            type="text"
            value="${valueFor(module, errors, "title")}"
            aria-describedby="title-error"
            required
          >
          ${fieldError(errors, "title")}
        </div>

        <div class="form-field">
          <label for="moduleLeaderId">Module leader</label>
          <select
            id="moduleLeaderId"
            name="moduleLeaderId"
            aria-describedby="moduleLeaderId-error"
          >
            ${staffOptions(staff, currentLeaderId)}
          </select>
          ${fieldError(errors, "moduleLeaderId")}
        </div>

        <div class="form-field">
          <label for="imageUrl">Module image URL</label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            value="${valueFor(module, errors, "imageUrl")}"
            placeholder="https://example.com/module-image.jpg"
            aria-describedby="imageUrl-help imageUrl-error"
          >
          <p id="imageUrl-help" class="hint">
            Optional. Paste a direct image link beginning with http:// or https://.
          </p>
          ${fieldError(errors, "imageUrl")}
        </div>

        <div class="form-field">
          <label for="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="7"
            aria-describedby="description-error"
            required
          >${valueFor(module, errors, "description")}</textarea>
          ${fieldError(errors, "description")}
        </div>

        <div class="form-actions">
          <button class="button" type="submit">${buttonText}</button>
          <a class="button secondary" href="/admin/modules">Cancel</a>
        </div>
      </form>
    </section>
  `;
}