import { escape } from "@std/html";

function errorMessage(errors, fieldName) {
  return errors?.[fieldName]?.message
    ? `<span class="error-message">${escape(errors[fieldName].message)}</span>`
    : "";
}

function oldValue(errors, fieldName) {
  return escape(errors?.[fieldName]?.value || "");
}

function moduleItem(module) {
  return `
    <article class="module-card">
      <h4>${escape(module.title)}</h4>
      <p>${escape(module.description)}</p>
      <p class="programme-leader">
        <strong>Module leader:</strong>
        ${escape(module.moduleLeader || "To be confirmed")}
      </p>
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
        <h3>Year ${escape(year)}</h3>
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
      <p class="programme-level">${escape(programme.level)}</p>
      <h2>${escape(programme.title)}</h2>
      <p>${escape(programme.description)}</p>

      <div class="leader-panel">
        <h3>Programme leader</h3>
        <p><strong>${escape(programme.programmeLeader || "To be confirmed")}</strong></p>
        ${
          programme.programmeLeaderEmail
            ? `<p><a href="mailto:${escape(programme.programmeLeaderEmail)}">${escape(programme.programmeLeaderEmail)}</a></p>`
            : ""
        }
        ${
          programme.programmeLeaderBio
            ? `<p>${escape(programme.programmeLeaderBio)}</p>`
            : ""
        }
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

      <form method="POST" action="/programmes/${programme.id}/interests" class="form-grid" novalidate>
        <div>
          <label for="studentName">Full name</label>
          <input
            id="studentName"
            name="studentName"
            type="text"
            value="${oldValue(errors, "studentName")}"
            aria-describedby="studentName-error"
          >
          <span id="studentName-error">
            ${errorMessage(errors, "studentName")}
          </span>
        </div>

        <div>
          <label for="studentEmail">Email address</label>
          <input
            id="studentEmail"
            name="studentEmail"
            type="email"
            value="${oldValue(errors, "studentEmail")}"
            aria-describedby="studentEmail-error"
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