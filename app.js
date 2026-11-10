const programs = [
  {
    id: "local-small-business",
    title: "Small Business Support & Advising",
    provider: "Austin Small Business Program · Example",
    level: "local",
    geography: ["austin"],
    type: "Expert help",
    description: "Local advising and business support can help you plan a purchase, find neighborhood resources, and get application-ready. Check with your city for current services and eligibility.",
    keywords: ["local", "austin", "texas", "bakery", "food", "business", "equipment", "hiring", "hire", "planning", "advice", "advisor", "support", "growing", "growth", "startup"],
    needs: [],
    stages: ["starting", "growing", "established"],
    reasons: ["Local support", "Business advising"],
    link: "https://www.austintexas.gov/department/small-business"
  },
  {
    id: "sba-microloan",
    title: "SBA Microloan Program",
    provider: "U.S. Small Business Administration",
    level: "federal",
    type: "Microloan · up to $50,000",
    description: "Microloans are made through intermediary lenders and may help eligible small businesses with working capital, inventory, supplies, furniture, fixtures, machinery, or equipment.",
    keywords: ["loan", "loans", "microloan", "capital", "working", "equipment", "machinery", "inventory", "supplies", "business", "bakery", "food", "hiring", "hire", "growing", "growth"],
    needs: ["loans"],
    stages: ["starting", "growing", "established"],
    reasons: ["Equipment financing", "Small business lending"],
    link: "https://www.sba.gov/funding-programs/loans/microloans"
  },
  {
    id: "texas-ssbci",
    title: "Texas Small Business Credit Initiative",
    provider: "Texas Economic Development & Tourism",
    level: "state",
    geography: ["texas", "tx"],
    type: "Credit support · lender-led",
    description: "State credit-support initiatives may help small businesses access capital through participating lenders. Ask a lender or the state program administrator about active products and requirements.",
    keywords: ["texas", "tx", "loan", "loans", "capital", "credit", "financing", "equipment", "business", "bakery", "food", "hiring", "hire", "growing", "growth"],
    needs: ["loans"],
    stages: ["starting", "growing", "established"],
    reasons: ["Texas-based", "Access to capital"],
    link: "https://gov.texas.gov/business/page/ssbci"
  },
  {
    id: "sba-7a",
    title: "SBA 7(a) Loan Program",
    provider: "U.S. Small Business Administration",
    level: "federal",
    type: "Small business loan",
    description: "The SBA's primary loan program works with participating lenders to support eligible business needs. Loan amounts, permitted uses, terms, and qualifications vary by lender and application.",
    keywords: ["loan", "loans", "capital", "equipment", "working", "expansion", "business", "bakery", "food", "hiring", "hire", "growing", "growth", "established"],
    needs: ["loans"],
    stages: ["starting", "growing", "established"],
    reasons: ["Business expansion", "Participating lenders"],
    link: "https://www.sba.gov/funding-programs/loans/7a-loans"
  },
  {
    id: "usda-energy",
    title: "Rural Energy for America Program",
    provider: "U.S. Department of Agriculture",
    level: "federal",
    type: "Energy grants & loan guarantees",
    description: "REAP may support eligible rural small businesses and agricultural producers seeking renewable energy systems or energy-efficiency improvements. Rural location and project rules apply.",
    keywords: ["rural", "energy", "efficient", "efficiency", "equipment", "upgrade", "upgrades", "grant", "grants", "loan", "bakery", "food", "business", "sustainability"],
    needs: ["grants", "loans"],
    stages: ["starting", "growing", "established"],
    reasons: ["Energy efficiency", "Rural eligibility applies"],
    link: "https://www.rd.usda.gov/programs-services/energy-programs/rural-energy-america-program"
  },
  {
    id: "sbir",
    title: "America's Seed Fund — SBIR/STTR",
    provider: "U.S. Small Business Administration",
    level: "federal",
    type: "Non-dilutive R&D funding",
    description: "Federal agencies award competitive funding to eligible small businesses conducting research and development with commercial potential. This is most relevant to technology and innovation projects.",
    keywords: ["research", "technology", "innovation", "development", "r&d", "science", "federal", "grant", "grants", "startup", "idea"],
    needs: ["grants"],
    stages: ["idea", "starting", "growing"],
    reasons: ["Innovation funding", "Competitive R&D awards"],
    link: "https://www.sbir.gov/"
  },
  {
    id: "sba-certifications",
    title: "Small Business Contracting & Certifications",
    provider: "U.S. Small Business Administration",
    level: "federal",
    type: "Contracts · certifications · guidance",
    description: "SBA contracting resources explain federal contracting programs, small-business certifications, and steps for exploring government procurement opportunities.",
    keywords: ["contract", "contracts", "government", "federal", "procurement", "certification", "certifications", "business", "selling"],
    needs: ["contracts", "technical"],
    stages: ["growing", "established"],
    reasons: ["Government contracting", "Federal resources"],
    link: "https://www.sba.gov/federal-contracting"
  }
];

const form = document.querySelector("#match-form");
const ideaField = document.querySelector("#idea");
const locationField = document.querySelector("#location");
const stageField = document.querySelector("#stage");
const resultsList = document.querySelector("#results-list");
const summaryText = document.querySelector("#summary-text");
const noResults = document.querySelector("#no-results");
const charCount = document.querySelector("#char-count");
const filterButton = document.querySelector("#filter-button");
const filterPanel = document.querySelector("#filter-panel");
const filterCount = document.querySelector("#filter-count");
const documentUpload = document.querySelector("#document-upload");
const fileName = document.querySelector("#file-name");
let activeTier = "all";
let matches = [];
const savedPrograms = new Set();

function tokenize(value) {
  return new Set(value.toLowerCase().replace(/[^a-z0-9\s&-]/g, " ").split(/\s+/).filter((word) => word.length > 2));
}

function getLocationTerms(location) {
  const terms = new Set(location.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean));
  const stateAbbreviations = {
    al: "alabama", ak: "alaska", az: "arizona", ar: "arkansas", ca: "california", co: "colorado", ct: "connecticut",
    de: "delaware", fl: "florida", ga: "georgia", hi: "hawaii", id: "idaho", il: "illinois", in: "indiana",
    ia: "iowa", ks: "kansas", ky: "kentucky", la: "louisiana", me: "maine", md: "maryland", ma: "massachusetts",
    mi: "michigan", mn: "minnesota", ms: "mississippi", mo: "missouri", mt: "montana", ne: "nebraska", nv: "nevada",
    nh: "new hampshire", nj: "new jersey", nm: "new mexico", ny: "new york", nc: "north carolina", nd: "north dakota",
    oh: "ohio", ok: "oklahoma", or: "oregon", pa: "pennsylvania", ri: "rhode island", sc: "south carolina",
    sd: "south dakota", tn: "tennessee", tx: "texas", ut: "utah", vt: "vermont", va: "virginia", wa: "washington",
    wv: "west virginia", wi: "wisconsin", wy: "wyoming", dc: "district of columbia"
  };
  for (const term of terms) {
    if (stateAbbreviations[term]) terms.add(stateAbbreviations[term]);
  }
  return terms;
}

function scoreProgram(program, storyTerms, locationTerms, selectedNeeds, stage) {
  let score = 0;
  for (const keyword of program.keywords) {
    if (storyTerms.has(keyword)) score += keyword.length > 5 ? 2 : 1;
  }
  if (program.stages.includes(stage)) score += 1;
  if (program.needs.some((need) => selectedNeeds.includes(need))) score += 2;
  if (program.level === "federal") score += 1;
  if (program.level === "local" && [...locationTerms].some((term) => program.keywords.includes(term))) score += 5;
  if (program.level === "state" && [...locationTerms].some((term) => program.keywords.includes(term))) score += 5;
  return score;
}

function makeMatches() {
  const location = locationField.value.trim();
  const story = `${ideaField.value} ${location}`;
  const storyTerms = tokenize(story);
  const locationTerms = getLocationTerms(location);
  const selectedNeeds = [...form.querySelectorAll('input[name="needs"]:checked')].map((input) => input.value);
  const stage = stageField.value;

  matches = programs
    .map((program) => ({ program, score: scoreProgram(program, storyTerms, locationTerms, selectedNeeds, stage) }))
    .filter(({ program, score }) => {
      const locationMatches = program.level === "federal" || program.geography.some((term) => locationTerms.has(term));
      const needsMatch = selectedNeeds.length === 0 || program.needs.length === 0 || program.needs.some((need) => selectedNeeds.includes(need));
      return score >= 2 && locationMatches && needsMatch;
    })
    .sort((a, b) => b.score - a.score);
  renderMatches();
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function renderMatches() {
  const visible = matches.filter(({ program }) => activeTier === "all" || program.level === activeTier);
  resultsList.setAttribute("aria-busy", "false");
  resultsList.innerHTML = visible.map(({ program }) => `
    <article class="result-card">
      <div class="result-topline">
        <div class="result-provider"><span class="provider-mark" aria-hidden="true">${program.level === "local" ? "⌖" : program.level === "state" ? "✳" : "↗"}</span>${escapeHtml(program.provider)}</div>
        <span class="level-tag level-${program.level}">${program.level}</span>
      </div>
      <h3>${escapeHtml(program.title)}</h3>
      <p class="result-description">${escapeHtml(program.description)}</p>
      <div class="match-reason"><span class="reason-label">Why it may fit</span>${program.reasons.map((reason) => `<span class="reason-tag">${escapeHtml(reason)}</span>`).join("")}</div>
      <div class="result-bottom">
        <span class="support-type">${escapeHtml(program.type)}</span>
        <div class="result-actions">
          <button type="button" class="save-button${savedPrograms.has(program.id) ? " saved" : ""}" data-save="${program.id}" aria-pressed="${savedPrograms.has(program.id)}">${savedPrograms.has(program.id) ? "♥ Saved" : "♡ Save"}</button>
          <a class="details-link" href="${program.link}" target="_blank" rel="noopener noreferrer">Visit program ↗</a>
        </div>
      </div>
    </article>
  `).join("");
  noResults.hidden = visible.length > 0;
  if (matches.length === 0) {
    summaryText.textContent = "Try adjusting your description or choosing different support types.";
  } else if (visible.length === 0) {
    summaryText.textContent = `No ${activeTier} opportunities in these example results. Try another level.`;
  } else {
    summaryText.textContent = `${visible.length} ${visible.length === 1 ? "place" : "places"} to explore, based on what you shared.`;
  }
}

function updateCharCount() {
  charCount.textContent = `${ideaField.value.length} characters`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!locationField.value.trim()) {
    locationField.focus();
    return;
  }
  const button = form.querySelector(".primary-button");
  button.disabled = true;
  button.querySelector("span:first-child").textContent = "Finding your matches…";
  resultsList.setAttribute("aria-busy", "true");
  window.setTimeout(() => {
    makeMatches();
    button.disabled = false;
    button.querySelector("span:first-child").textContent = "Find my matches";
    document.querySelector("#matches").scrollIntoView({ behavior: "smooth", block: "start" });
  }, 350);
});

ideaField.addEventListener("input", updateCharCount);
updateCharCount();

documentUpload.addEventListener("change", async () => {
  const file = documentUpload.files?.[0];
  if (!file) return;
  if (file.size > 1_000_000) {
    fileName.textContent = "Please choose a text file smaller than 1 MB.";
    documentUpload.value = "";
    return;
  }
  try {
    const text = await file.text();
    ideaField.value = `${ideaField.value.trim()}\n\n${text.trim()}`.trim();
    updateCharCount();
    fileName.textContent = `Added: ${file.name}`;
  } catch {
    fileName.textContent = "Couldn't read that file. Please paste the relevant details instead.";
  }
});

filterButton.addEventListener("click", () => {
  const opening = filterPanel.hidden;
  filterPanel.hidden = !opening;
  filterButton.setAttribute("aria-expanded", String(opening));
});

document.querySelectorAll(".tier-filter").forEach((button) => {
  button.addEventListener("click", () => {
    activeTier = button.dataset.tier;
    document.querySelectorAll(".tier-filter").forEach((item) => item.classList.toggle("selected", item === button));
    filterCount.textContent = activeTier === "all" ? "0" : "1";
    renderMatches();
  });
});

resultsList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-save]");
  if (!button) return;
  const id = button.dataset.save;
  savedPrograms.has(id) ? savedPrograms.delete(id) : savedPrograms.add(id);
  renderMatches();
});

makeMatches();
