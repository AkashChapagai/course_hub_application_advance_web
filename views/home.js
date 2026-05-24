export function homeView() {
  return `
    <section class="hero">
      <p class="eyebrow">University course discovery platform</p>
      <h2>Find the right undergraduate or postgraduate programme</h2>
      <p>
        Explore degree programmes, review modules by year of study,
        learn about teaching staff, and register your interest for future updates.
      </p>

      <div class="hero-actions">
        <a class="button" href="/programmes">Browse programmes</a>
        <a class="button secondary" href="/login">Admin login</a>
      </div>
    </section>

    <section class="feature-grid" aria-label="Key features">
      <article class="feature-card">
        <h3>Search programmes</h3>
        <p>Prospective students can explore available undergraduate and postgraduate courses.</p>
      </article>

      <article class="feature-card">
        <h3>View modules</h3>
        <p>Each programme will show modules grouped by year of study.</p>
      </article>

      <article class="feature-card">
        <h3>Register interest</h3>
        <p>Students can submit contact details to receive course updates.</p>
      </article>
    </section>
  `;
}