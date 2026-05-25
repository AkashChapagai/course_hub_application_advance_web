import { escape } from "@std/html";

function safe(value = "") {
  return escape(String(value ?? ""));
}

function programmeCard(programme) {
  return `
    <article class="programme-card">
      <div>
        <span class="programme-level">${safe(programme.level)}</span>
        <h3>${safe(programme.title)}</h3>
        <p>${safe(programme.description)}</p>
        <p class="programme-leader">
          Programme leader: ${safe(programme.programmeLeader || "To be confirmed")}
        </p>
      </div>

      <a class="button" href="/programmes/${safe(programme.id)}">
        View details
      </a>
    </article>
  `;
}

export function programmesView({ programmes }) {
  const programmeCards = programmes.length
    ? programmes.map(programmeCard).join("")
    : `
      <p class="empty-message">
        No published programmes are currently available.
      </p>
    `;

  return `
    <section class="page-heading">
      <p class="eyebrow">Explore our courses</p>
      <h2>Available programmes</h2>
      <p>
        Browse undergraduate and postgraduate programmes. Select a programme to
        view its modules, teaching staff and interest registration form.
      </p>
    </section>

    <section class="programme-toolbar" aria-labelledby="programme-search-heading">
      <h3 id="programme-search-heading">Search and filter programmes</h3>

      <div class="programme-filters">
        <div>
          <label for="programme-search">Search by keyword</label>
          <input
            id="programme-search"
            type="search"
            placeholder="Try Cyber Security, Computing or Data"
            autocomplete="off"
          >
        </div>

        <div>
          <label for="programme-level-filter">Filter by level</label>
          <select id="programme-level-filter">
            <option value="all">All levels</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Postgraduate">Postgraduate</option>
          </select>
        </div>
      </div>

      <p class="hint">
        This list first loads using server-side rendering, then updates with
        JavaScript using fetch, JSON and DOM manipulation.
      </p>

      <p id="programme-result-count" class="hint" aria-live="polite">
        Showing ${programmes.length} programme${programmes.length === 1 ? "" : "s"}.
      </p>
    </section>

    <section
      id="programme-results"
      class="programme-grid"
      aria-label="Programme results"
    >
      ${programmeCards}
    </section>
  `;
}