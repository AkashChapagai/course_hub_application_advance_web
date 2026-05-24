import { escape } from "@std/html";

function programmeCard(programme) {
  return `
    <article class="programme-card">
      <div>
        <p class="programme-level">${escape(programme.level)}</p>
        <h3>${escape(programme.title)}</h3>
        <p>${escape(programme.description)}</p>
        <p class="programme-leader">
          <strong>Programme leader:</strong>
          ${escape(programme.programmeLeader || "To be confirmed")}
        </p>
      </div>

      <a class="button" href="/programmes/${programme.id}">
        View details
      </a>
    </article>
  `;
}

export function programmesView({ programmes }) {
  const programmeCards = programmes.length
    ? programmes.map(programmeCard).join("")
    : `<p>No published programmes are currently available.</p>`;

  return `
    <section class="page-heading">
      <p class="eyebrow">Explore our courses</p>
      <h2>Available programmes</h2>
      <p>
        Browse undergraduate and postgraduate programmes. Select a programme
        to view its modules, teaching staff and interest registration form.
      </p>
    </section>

    <section class="programme-toolbar" aria-label="Programme filters">
      <label for="programme-search">Search programmes</label>
      <input
        id="programme-search"
        type="search"
        name="search"
        placeholder="Try Cyber, Web, Data..."
        autocomplete="off"
      >
      <p class="hint">Live search will be added later using fetch, JSON and DOM updates.</p>
    </section>

    <section class="programme-grid" aria-label="Programme list">
      ${programmeCards}
    </section>
  `;
}