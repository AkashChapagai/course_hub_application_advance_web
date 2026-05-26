(function () {
  console.log("app.js file loaded with image support");

  function safeText(value) {
    return String(value ?? "");
  }

  function createProgrammeImage(programme) {
    if (!programme.imageUrl) {
      return null;
    }

    const image = document.createElement("img");
    image.className = "programme-card-image";
    image.src = safeText(programme.imageUrl);
    image.alt = `${safeText(programme.title)} programme image`;
    image.loading = "lazy";

    return image;
  }

  function createProgrammeCard(programme) {
    const card = document.createElement("article");
    card.className = "programme-card";

    const image = createProgrammeImage(programme);

    if (image) {
      card.append(image);
    }

    const content = document.createElement("div");
    content.className = "programme-card-content";

    const level = document.createElement("span");
    level.className = "programme-level";
    level.textContent = safeText(programme.level);

    const title = document.createElement("h3");
    title.textContent = safeText(programme.title);

    const description = document.createElement("p");
    description.textContent = safeText(programme.description);

    const leader = document.createElement("p");
    leader.className = "programme-leader";
    leader.textContent = `Programme leader: ${
      safeText(programme.programmeLeader) || "To be confirmed"
    }`;

    content.append(level, title, description, leader);

    const link = document.createElement("a");
    link.className = "button";
    link.href = `/programmes/${safeText(programme.id)}`;
    link.textContent = "View details";

    card.append(content, link);

    return card;
  }

  function initProgrammeSearch() {
    const searchInput = document.querySelector("#programme-search");
    const levelFilter = document.querySelector("#programme-level-filter");
    const resultsContainer = document.querySelector("#programme-results");
    const resultCount = document.querySelector("#programme-result-count");

    if (!searchInput || !levelFilter || !resultsContainer || !resultCount) {
      return;
    }

    let programmes = [];

    function updateResultCount(count) {
      const programmeWord = count === 1 ? "programme" : "programmes";
      resultCount.textContent = `Showing ${count} ${programmeWord}.`;
    }

    function showMessage(message) {
      resultsContainer.replaceChildren();

      const paragraph = document.createElement("p");
      paragraph.className = "empty-message";
      paragraph.textContent = message;

      resultsContainer.append(paragraph);
    }

    function renderProgrammes(filteredProgrammes) {
      resultsContainer.replaceChildren();

      if (filteredProgrammes.length === 0) {
        showMessage("No programmes match your search or filter.");
        updateResultCount(0);
        return;
      }

      for (const programme of filteredProgrammes) {
        resultsContainer.append(createProgrammeCard(programme));
      }

      updateResultCount(filteredProgrammes.length);
    }

    function filterProgrammes() {
      const searchTerm = searchInput.value.trim().toLowerCase();
      const selectedLevel = levelFilter.value;

      const filteredProgrammes = programmes.filter((programme) => {
        const searchableText = [
          programme.title,
          programme.description,
          programme.level,
          programme.programmeLeader,
        ]
          .map(safeText)
          .join(" ")
          .toLowerCase();

        const matchesSearch = searchableText.includes(searchTerm);
        const matchesLevel =
          selectedLevel === "all" || safeText(programme.level) === selectedLevel;

        return matchesSearch && matchesLevel;
      });

      renderProgrammes(filteredProgrammes);
    }

    async function loadProgrammes() {
      try {
        const response = await fetch("/api/programmes");

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        programmes = Array.isArray(data.programmes) ? data.programmes : [];

        console.log("Programmes loaded from API:", programmes);

        renderProgrammes(programmes);

        searchInput.addEventListener("input", filterProgrammes);
        levelFilter.addEventListener("change", filterProgrammes);
      } catch (error) {
        console.error("Programme search failed:", error);
        updateResultCount(0);
        showMessage(
          "Programme search is currently unavailable. Please refresh the page and try again.",
        );
      }
    }

    loadProgrammes();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initProgrammeSearch);
  } else {
    initProgrammeSearch();
  }
})();