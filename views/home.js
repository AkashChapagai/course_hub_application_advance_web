export function homeView() {
  return `
    <section class="home-hero" aria-labelledby="home-title">
      <div class="home-hero-bg" aria-hidden="true"></div>

      <div class="home-hero-content">
      

        <h2 id="home-title">
          Discover courses that shape your next chapter.
        </h2>

        <p class="home-lead">
          Explore undergraduate and postgraduate programmes, compare modules by
          year of study, meet teaching staff and register your interest in a
          few simple steps.
        </p>

        <div class="home-actions">
          <a class="button home-primary-action" href="/programmes">
            Browse programmes
          </a>
          <a class="button secondary home-secondary-action" href="/login">
            Admin login
          </a>
        </div>

        <div class="home-metrics" aria-label="Platform highlights">
          <article>
            <strong>UG & PG</strong>
            <span>Programme discovery</span>
          </article>

          <article>
            <strong>Year by year</strong>
            <span>Module structure</span>
          </article>

          <article>
            <strong>Secure</strong>
            <span>Admin management</span>
          </article>
        </div>
      </div>

      <div class="home-visual">
        <div class="home-image-frame">
          <img
            src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1400&q=85"
            alt="University graduates celebrating together on campus"
          >
        </div>

        <article class="home-glass-card home-card-search">
          <span class="home-card-number">01</span>
          <strong>Search instantly</strong>
          <p>Find programmes using keyword search and level filters.</p>
        </article>

        <article class="home-glass-card home-card-interest">
          <span class="home-card-number">02</span>
          <strong>Register interest</strong>
          <p>Receive course updates, open day news and deadline reminders.</p>
        </article>
      </div>
    </section>

    <section class="home-pathways" aria-labelledby="pathways-title">
      <div class="home-section-intro">
    
        <h2 id="pathways-title">Everything needed to explore a programme clearly.</h2>
        <p>
          The platform brings course information, teaching staff, modules and
          interest registration together in one focused experience.
        </p>
      </div>

      <div class="home-pathway-grid">
        <article class="home-pathway-card">
          <div class="home-pathway-icon" aria-hidden="true">⌕</div>
          <h3>Search programmes</h3>
          <p>
            Quickly browse available undergraduate and postgraduate courses
            using live search and level filtering.
          </p>
        </article>

        <article class="home-pathway-card">
          <div class="home-pathway-icon" aria-hidden="true">▦</div>
          <h3>Compare modules</h3>
          <p>
            View modules grouped by year of study so students understand the
            academic journey before registering.
          </p>
        </article>

        <article class="home-pathway-card">
          <div class="home-pathway-icon" aria-hidden="true">✉</div>
          <h3>Register interest</h3>
          <p>
            Submit contact details securely and withdraw interest later if
            course updates are no longer required.
          </p>
        </article>
      </div>
    </section>
  `;
}