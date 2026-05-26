import { escape } from "@std/html";

function safe(value = "") {
  return escape(String(value ?? ""));
}

function errorMessage(errors, fieldName) {
  const message = errors?.[fieldName]?.message;

  if (!message) {
    return "";
  }

  return `<span class="error-message">${safe(message)}</span>`;
}

function oldValue(errors, fieldName) {
  return safe(errors?.[fieldName]?.value || "");
}

function programmeImage(programme) {
  if (!programme.imageUrl) {
    return "";
  }

  return `
    <img
      class="programme-detail-image"
      src="${safe(programme.imageUrl)}"
      alt="${safe(programme.title)} programme image"
      loading="lazy"
    >
  `;
}

function moduleImage(module) {
  if (!module.imageUrl) {
    return "";
  }

  return `
    <img
      class="module-card-image"
      src="${safe(module.imageUrl)}"
      alt="${safe(module.title)} module image"
      loading="lazy"
    >
  `;
}

function moduleItem(module) {
  return `
    <article class="module-card">
      ${moduleImage(module)}

      <div class="module-card-content">
        <h4>${safe(module.title)}</h4>
        <p>${safe(module.description)}</p>
        <p class="programme-leader">
          <strong>Module leader:</strong>
          ${safe(module.moduleLeader || "To be confirmed")}
        </p>
      </div>
    </article>
  `;
}

function modulesByYearHtml(modulesByYear) {
  const years = Object.keys(modulesByYear).sort((a, b) => Number(a) - Number(b));

  if (years.length === 0) {
    return `<p>No modules have been assigned to this programme yet.</p>`;
  }

  return years.map((year) => {
    const modules = modulesByYear[year];

    return `
      <section class="year-section">
        <h3>Year ${safe(year)}</h3>
        <div class="module-grid">
          ${modules.map(moduleItem).join("")}
        </div>
      </section>
    `;
  }).join("");
}

export function programmeDetailView({ programme, modulesByYear, errors = {} }) {
  return `
    <section class="programme-detail-header">
      ${programmeImage(programme)}

      <div class="programme-detail-content">
        <p class="programme-level">${safe(programme.level)}</p>
        <h2>${safe(programme.title)}</h2>
        <p>${safe(programme.description)}</p>

        <div class="leader-panel">
          <h3>Programme leader</h3>
          <p><strong>${safe(programme.programmeLeader || "To be confirmed")}</strong></p>
          ${
            programme.programmeLeaderEmail
              ? `<p><a href="mailto:${safe(programme.programmeLeaderEmail)}">${safe(programme.programmeLeaderEmail)}</a></p>`
              : ""
          }
          ${
            programme.programmeLeaderBio
              ? `<p>${safe(programme.programmeLeaderBio)}</p>`
              : ""
          }
        </div>
      </div>
    </section>

    <section class="page-panel">
      <h2>Modules by year of study</h2>
      ${modulesByYearHtml(modulesByYear)}
    </section>

    <section class="interest-panel">
      <h2>Register your interest</h2>
      <p>
        Leave your contact details to receive updates about this programme,
        open days and application deadlines.
      </p>

      <form method="POST" action="/programmes/${safe(programme.id)}/interests" class="form-grid" novalidate>
        <div class="form-field">
          <label for="studentName">Full name</label>
          <input
            id="studentName"
            name="studentName"
            type="text"
            value="${oldValue(errors, "studentName")}"
            aria-describedby="studentName-error"
            required
          >
          <span id="studentName-error">
            ${errorMessage(errors, "studentName")}
          </span>
        </div>

        <div class="form-field">
          <label for="studentEmail">Email address</label>
          <input
            id="studentEmail"
            name="studentEmail"
            type="email"
            value="${oldValue(errors, "studentEmail")}"
            aria-describedby="studentEmail-error"
            required
          >
          <span id="studentEmail-error">
            ${errorMessage(errors, "studentEmail")}
          </span>
        </div>

        <button class="button" type="submit">Register interest</button>
      </form>
    </section>
  `;
}