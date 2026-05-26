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

function valueFor(programme, errors, fieldName) {
  if (errors?.[fieldName]?.value !== undefined) {
    return safe(errors[fieldName].value);
  }

  return safe(programme?.[fieldName] ?? "");
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
    <option value="">No programme leader selected</option>
    ${options}
  `;
}

export function adminProgrammeFormView({
  mode,
  programme = {},
  staff = [],
  errors = {},
}) {
  const isEdit = mode === "edit";
  const title = isEdit ? "Edit programme" : "Create programme";
  const buttonText = isEdit ? "Update programme" : "Create programme";
  const action = isEdit
    ? `/admin/programmes/${safe(programme.id)}/update`
    : "/admin/programmes";

  const currentLevel = errors?.level?.value ?? programme.level ?? "Undergraduate";
  const currentLeaderId = errors?.programmeLeaderId?.value ??
    programme.programmeLeaderId ??
    "";
  const currentPublished = errors?.published?.value ??
    String(programme.published ? 1 : 0);

  return `
    <section class="page-panel">
      <p class="eyebrow">Admin area</p>
      <h2>${title}</h2>

      <p>
        Use this form to manage programme information, assign a programme leader,
        add an image link, and control whether the programme is visible on the
        public website.
      </p>

      <form class="form-grid" method="POST" action="${action}" novalidate>
        <div class="form-field">
          <label for="title">Programme title</label>
          <input
            id="title"
            name="title"
            type="text"
            value="${valueFor(programme, errors, "title")}"
            aria-describedby="title-error"
            required
          >
          ${fieldError(errors, "title")}
        </div>

        <div class="form-field">
          <label for="level">Programme level</label>
          <select
            id="level"
            name="level"
            aria-describedby="level-error"
            required
          >
            <option value="Undergraduate" ${selected(currentLevel, "Undergraduate")}>
              Undergraduate
            </option>
            <option value="Postgraduate" ${selected(currentLevel, "Postgraduate")}>
              Postgraduate
            </option>
          </select>
          ${fieldError(errors, "level")}
        </div>

        <div class="form-field">
          <label for="programmeLeaderId">Programme leader</label>
          <select
            id="programmeLeaderId"
            name="programmeLeaderId"
            aria-describedby="programmeLeaderId-error"
          >
            ${staffOptions(staff, currentLeaderId)}
          </select>
          ${fieldError(errors, "programmeLeaderId")}
        </div>

        <div class="form-field">
          <label for="imageUrl">Programme image URL</label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            value="${valueFor(programme, errors, "imageUrl")}"
            placeholder="https://example.com/programme-image.jpg"
            aria-describedby="imageUrl-help imageUrl-error"
          >
          <p id="imageUrl-help" class="hint">
            Optional. Paste a direct image link beginning with http:// or https://.
          </p>
          ${fieldError(errors, "imageUrl")}
        </div>

        <div class="form-field">
          <label for="description">Programme description</label>
          <textarea
            id="description"
            name="description"
            rows="7"
            aria-describedby="description-error"
            required
          >${valueFor(programme, errors, "description")}</textarea>
          ${fieldError(errors, "description")}
        </div>

        <div class="form-field">
          <label for="published">Published status</label>
          <select id="published" name="published">
            <option value="0" ${selected(currentPublished, "0")}>Draft</option>
            <option value="1" ${selected(currentPublished, "1")}>Published</option>
          </select>
          ${fieldError(errors, "published")}
        </div>

        <div class="form-actions">
          <button class="button" type="submit">${buttonText}</button>
          <a class="button secondary" href="/admin/programmes">Cancel</a>
        </div>
      </form>
    </section>
  `;
}