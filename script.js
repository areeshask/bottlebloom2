
/* =========================================
   BOTTLEBLOOM — COMPLETE UPDATED JAVASCRIPT
========================================= */

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  }[c]));
}

let toastTimer;
function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

/* =========================================
   1. PLANT INFORMATION FOR HOME
========================================= */

const plants = [
  {
    name:"Coriander", scientific:"Coriandrum sativum",
    category:"Herb",
    image:"https://images.unsplash.com/photo-1615485500704-8e990f9900f2?w=800",
    description:"A fragrant culinary herb whose fresh leaves and seeds are widely used.",
    sunlight:"4–6 hours of sunlight",
    water:"Keep soil lightly moist.",
    soil:"Fertile, well-draining soil.",
    care:"Harvest outer leaves regularly."
  },
  {
    name:"Mint", scientific:"Mentha",
    category:"Herb",
    image:"https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=800",
    description:"An aromatic herb that grows well in containers.",
    sunlight:"Partial sunlight",
    water:"Water when the surface begins to dry.",
    soil:"Moist, well-draining soil.",
    care:"Trim regularly to encourage new growth."
  },
  {
    name:"Basil", scientific:"Ocimum basilicum",
    category:"Herb",
    image:"https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=800",
    description:"A popular aromatic herb with soft, fragrant leaves.",
    sunlight:"6–8 hours of sunlight",
    water:"Water when the top soil feels dry.",
    soil:"Rich, well-draining soil.",
    care:"Pinch off flower buds to encourage leafy growth."
  },
  {
    name:"Aloe Vera", scientific:"Aloe vera",
    category:"Succulent",
    image:"https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=800",
    description:"A succulent with thick leaves.",
    sunlight:"Bright light",
    water:"Allow soil to dry between watering.",
    soil:"Sandy, well-draining soil.",
    care:"Avoid overwatering."
  },
  {
    name:"Snake Plant", scientific:"Dracaena trifasciata",
    category:"Indoor plant",
    image:"https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=800",
    description:"A hardy indoor plant with upright, patterned leaves.",
    sunlight:"Low to bright indirect light",
    water:"Water after soil dries out.",
    soil:"Well-draining potting mix.",
    care:"Avoid standing water."
  },
  {
    name:"Peace Lily", scientific:"Spathiphyllum",
    category:"Flowering plant",
    image:"https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=800",
    description:"An elegant indoor plant with dark leaves and white spathes.",
    sunlight:"Bright indirect light",
    water:"Keep soil lightly moist.",
    soil:"Moist, well-draining mix.",
    care:"Keep away from harsh direct sunlight."
  },
  {
    name:"Money Plant", scientific:"Epipremnum aureum",
    category:"Climbing plant",
    image:"https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800",
    description:"A popular trailing houseplant with attractive green leaves.",
    sunlight:"Bright indirect light",
    water:"Water when the top soil dries.",
    soil:"Well-draining potting mix.",
    care:"Trim long vines regularly."
  },
  {
    name:"Spider Plant", scientific:"Chlorophytum comosum",
    category:"Indoor plant",
    image:"https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=800",
    description:"A leafy plant known for producing small baby plants.",
    sunlight:"Bright indirect light",
    water:"Water when the top soil begins to dry.",
    soil:"Well-draining soil.",
    care:"Remove dry leaf tips."
  },
  {
    name:"Jade Plant", scientific:"Crassula ovata",
    category:"Succulent",
    image:"https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800",
    description:"A succulent with thick, fleshy leaves.",
    sunlight:"Bright light",
    water:"Allow soil to dry between watering.",
    soil:"Cactus or succulent mix.",
    care:"Use a pot with drainage."
  },
  {
    name:"Areca Palm", scientific:"Dypsis lutescens",
    category:"Indoor plant",
    image:"https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=800",
    description:"A tropical palm with graceful fronds.",
    sunlight:"Bright indirect light",
    water:"Keep soil lightly moist.",
    soil:"Well-draining potting mix.",
    care:"Protect from cold drafts."
  },
  {
    name:"Rubber Plant", scientific:"Ficus elastica",
    category:"Indoor plant",
    image:"https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800",
    description:"A decorative plant with large, glossy leaves.",
    sunlight:"Bright indirect light",
    water:"Water when the top soil dries.",
    soil:"Well-draining soil.",
    care:"Wipe leaves gently."
  },
  {
    name:"ZZ Plant", scientific:"Zamioculcas zamiifolia",
    category:"Indoor plant",
    image:"https://images.unsplash.com/photo-1597055181300-a8c7f4f4b5f1?w=800",
    description:"A low-maintenance plant with shiny, upright leaves.",
    sunlight:"Low to bright indirect light",
    water:"Allow soil to dry between watering.",
    soil:"Well-draining soil.",
    care:"Avoid overwatering."
  },
  {
    name:"Rose", scientific:"Rosa",
    category:"Flowering plant",
    image:"https://images.unsplash.com/photo-1494972308805-463bc619d34e?w=800",
    description:"A flowering plant known for colourful, fragrant blooms.",
    sunlight:"At least 6 hours of sunlight",
    water:"Water at the base when soil begins to dry.",
    soil:"Fertile, well-draining soil.",
    care:"Remove faded flowers."
  },
  {
    name:"Hibiscus", scientific:"Hibiscus rosa-sinensis",
    category:"Flowering plant",
    image:"https://images.unsplash.com/photo-1597848212624-e6b7b9b2e1d0?w=800",
    description:"A tropical flowering plant with large, colourful blooms.",
    sunlight:"Full sunlight",
    water:"Water regularly during warm weather.",
    soil:"Rich, well-draining soil.",
    care:"Prune lightly."
  },
  {
    name:"Cactus", scientific:"Cactaceae",
    category:"Succulent",
    image:"https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=800",
    description:"A diverse group of plants adapted to dry environments.",
    sunlight:"Usually bright light; needs vary by species.",
    water:"Water sparingly.",
    soil:"Specialist cactus mix.",
    care:"Care varies by species."
  },
  {
    name:"Tomato", scientific:"Solanum lycopersicum",
    category:"Vegetable plant",
    image:"https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=800",
    description:"An edible plant that produces juicy fruits.",
    sunlight:"6–8 hours of sunlight",
    water:"Keep soil consistently moist, not soggy.",
    soil:"Rich, well-draining soil.",
    care:"Provide support as the plant grows."
  }
];

/* =========================================
   2. WELCOME SCREEN
========================================= */

const welcomeScreen = $("#welcomeScreen");
const app = $("#app");
const userNameInput = $("#userName");
const savedName = localStorage.getItem("bottlebloomName");

if (savedName && userNameInput) userNameInput.value = savedName;

$("#startButton").addEventListener("click", () => {
  const name = userNameInput.value.trim();

  if (!name) {
    showToast("Please enter your name first.");
    userNameInput.focus();
    return;
  }

  localStorage.setItem("bottlebloomName", name);
  $("#welcomeName").textContent = name;
  welcomeScreen.classList.add("hidden");
  app.classList.remove("hidden");

  loadHome();
  showToast(`Welcome to BottleBloom, ${name}!`);
});

if (savedName) $("#welcomeName").textContent = savedName;

/* =========================================
   3. NAVIGATION
========================================= */

function showPage(pageId) {
  $$(".page").forEach(page => {
    page.classList.toggle("active", page.id === pageId);
  });

  $$(".nav-item").forEach(button => {
    button.classList.toggle("active", button.dataset.page === pageId);
  });

  window.scrollTo({top:0, behavior:"smooth"});
}

$$(".nav-item").forEach(button => {
  button.addEventListener("click", () => showPage(button.dataset.page));
});

$$("[data-page-link]").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    showPage(link.dataset.pageLink);
  });
});

/* =========================================
   4. HOME PAGE
========================================= */

function loadHome() {
  const name = localStorage.getItem("bottlebloomName") || "Gardener";
  $("#welcomeName").textContent = name;

  const today = new Date();
  const plant = plants[today.getDate() % plants.length];

  $("#dailyPlantCard").innerHTML = `
    <img src="${escapeHTML(plant.image)}"
      alt="${escapeHTML(plant.name)}"
      onerror="this.style.display='none'">
    <h3>${escapeHTML(plant.name)}</h3>
    <p>${escapeHTML(plant.description)}</p>
    <button class="text-btn" id="dailyPlantExplore">
      Discover this plant →
    </button>
  `;

  $("#dailyPlantExplore").addEventListener("click", () => {
    openPlantDetails(plant);
  });

  const tips = [
    "Check the soil before watering. Different plants have different needs.",
    "Clean dusty leaves gently so your plants can receive light.",
    "Reuse clean plastic bottles as creative planters.",
    "Rotate indoor plants occasionally for more even light exposure.",
    "Remove dead leaves to keep your plants tidy.",
    "Choose plants according to the sunlight available in your space.",
    "Make sure your plant pots have proper drainage."
  ];

  $("#dailyTip").textContent = tips[today.getDate() % tips.length];
}

/* =========================================
   5. EXPLORE — ONLINE PLANT SEARCH
========================================= */

let onlinePlants = [];

const plantResults = $("#plantResults");

$$(".library-tab").forEach(tab => tab.remove());

function renderPlants(list) {
  plantResults.innerHTML = "";

  if (!list.length) {
    $("#noPlantsMessage").classList.remove("hidden");
    $("#plantCount").textContent = "No matching plants found.";
    return;
  }

  $("#noPlantsMessage").classList.add("hidden");
  $("#plantCount").textContent =
    `${list.length} plant${list.length === 1 ? "" : "s"} found`;

  list.forEach(plant => {
    const card = document.createElement("article");
    card.className = "plant-card";

    card.innerHTML = `
      ${plant.image
        ? `<img src="${escapeHTML(plant.image)}"
            alt="${escapeHTML(plant.name)}" loading="lazy">`
        : `<div class="plant-image-fallback">🌿</div>`}
      <div class="plant-card-content">
        <h3>${escapeHTML(plant.name)}</h3>
        <p><em>${escapeHTML(plant.scientific || "")}</em></p>
        <span class="card-link">Explore plant →</span>
      </div>
    `;

    const image = card.querySelector("img");

    if (image) {
      image.addEventListener("error", () => {
        image.style.display = "none";
      }, {once:true});
    }

    card.addEventListener("click", () => openPlantDetails(plant));
    plantResults.appendChild(card);
  });
}

async function searchOnlinePlants(query) {
  plantResults.innerHTML = "<p>Searching the plant database...</p>";
  $("#noPlantsMessage").classList.add("hidden");

  try {
    const url =
      "https://api.inaturalist.org/v1/taxa/autocomplete?q=" +
      encodeURIComponent(query) +
      "&taxon_id=47126&rank=species&is_active=true&per_page=30";

    const response = await fetch(url);

    if (!response.ok) throw new Error("Database unavailable");

    const data = await response.json();

    onlinePlants = (data.results || [])
      .filter(item => item.name)
      .map(item => ({
        name: item.preferred_common_name || item.name,
        scientific: item.name,
        category: "Plant species",
        description:
          `${item.preferred_common_name || item.name} is listed in the iNaturalist biodiversity database. Growing requirements depend on the exact species.`,
        image:
          item.default_photo?.medium_url ||
          item.default_photo?.square_url || "",
        sunlight: "Species-specific. Check a reliable growing guide.",
        water: "Water requirements vary by species.",
        soil: "Soil requirements vary by species.",
        care: "Research the exact species for reliable care advice."
      }));

    renderPlants(onlinePlants);

  } catch (error) {
    plantResults.innerHTML = "";
    $("#noPlantsMessage").classList.remove("hidden");
    $("#plantCount").textContent = "Online search is unavailable.";
    showToast("Check your internet connection and try again.");
  }
}

function runPlantSearch() {
  const query = $("#plantSearch").value.trim();

  if (!query) {
    showToast("Enter a plant name first.");
    return;
  }

  searchOnlinePlants(query);
}

$("#plantSearchButton").addEventListener("click", runPlantSearch);

$("#plantSearch").addEventListener("keydown", event => {
  if (event.key === "Enter") runPlantSearch();
});

/* =========================================
   6. PLANT DETAILS
========================================= */

function openPlantDetails(plant) {
  showPage("plantDetails");

  $("#plantDetailsContent").innerHTML = `
    <div class="plant-detail-hero">
      ${plant.image ? `
        <img src="${escapeHTML(plant.image)}"
          alt="${escapeHTML(plant.name)}"
          onerror="this.style.display='none'">
      ` : ""}
      <h1>${escapeHTML(plant.name)}</h1>
      <p><em>${escapeHTML(plant.scientific || "")}</em></p>
      <p>${escapeHTML(plant.description || "Explore this plant.")}</p>
    </div>

    <div class="plant-care-grid">
      <div class="care-item">
        <strong>☀ Sunlight</strong>
        <p>${escapeHTML(plant.sunlight || "Species-specific")}</p>
      </div>
      <div class="care-item">
        <strong>💧 Watering</strong>
        <p>${escapeHTML(plant.water || "Species-specific")}</p>
      </div>
      <div class="care-item">
        <strong>🌱 Soil</strong>
        <p>${escapeHTML(plant.soil || "Species-specific")}</p>
      </div>
      <div class="care-item">
        <strong>✿ Care Advice</strong>
        <p>${escapeHTML(plant.care || "Research the exact species.")}</p>
      </div>
    </div>
  `;
}

$("#backToExplore").addEventListener("click", () => showPage("explore"));

/* =========================================
   7. LEAFLENS — GUIDED SYMPTOM CHECKER
========================================= */

const symptomOptions = [
  ["healthy","🌿","Looks Healthy","No unusual visible signs"],
  ["fungus","🍄","Fungal Spots","Unusual spots or patches"],
  ["powdery","☁️","White Powdery Coating","White or grey powder-like layer"],
  ["yellowing","🍂","Yellowing","Leaves turning yellow"],
  ["withering","🥀","Withering or Wilting","Drooping or drying leaves"],
  ["spots","🟤","Brown or Dark Spots","Dark marks or patches"],
  ["curling","🍃","Curled or Twisted Leaves","Distorted leaf shape"],
  ["holes","🕳️","Holes or Chewed Leaves","Missing pieces or irregular holes"],
  ["pests","🐛","Insects or Pests","Visible insects or webbing"],
  ["mosaic","🎨","Mosaic or Patchy Patterns","Uneven light and dark patches"],
  ["edges","🔥","Burnt or Crispy Edges","Dry or brown leaf edges"],
  ["pale","🌱","Pale or Faded Leaves","Leaves losing green colour"],
  ["silvery","✨","Silvery or Scraped Patches","Shiny or scraped-looking areas"]
];

$("#symptomOptions").innerHTML = symptomOptions.map(item => `
  <button type="button" class="symptom-option"
    data-symptom="${item[0]}" aria-pressed="false">
    <span class="symptom-icon">${item[1]}</span>
    <span>
      <strong>${item[2]}</strong>
      <small>${item[3]}</small>
    </span>
    <span class="option-check">○</span>
  </button>
`).join("");

let uploadedPhoto = null;
let selectedSymptoms = new Set();
const leafPhoto = $("#leafPhoto");

function resetSymptoms() {
  selectedSymptoms.clear();

  $$(".symptom-option").forEach(option => {
    option.classList.remove("selected");
    option.querySelector(".option-check").textContent = "○";
    option.setAttribute("aria-pressed", "false");
  });

  $("#scanButton").disabled = true;
}

leafPhoto.addEventListener("change", event => {
  const file = event.target.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    showToast("Please choose an image file.");
    return;
  }

  if (file.size > 8 * 1024 * 1024) {
    showToast("Choose an image smaller than 8 MB.");
    leafPhoto.value = "";
    return;
  }

  uploadedPhoto = file;
  resetSymptoms();

  const reader = new FileReader();

  reader.onload = () => {
    $("#leafPreview").src = reader.result;
    $("#previewArea").classList.remove("hidden");
    $("#symptomSection").classList.remove("hidden");
    $("#scanResult").classList.add("hidden");
  };

  reader.readAsDataURL(file);
});

$("#changePhotoButton").addEventListener("click", () => leafPhoto.click());

$$(".symptom-option").forEach(option => {
  option.addEventListener("click", () => {
    const key = option.dataset.symptom;

    if (key === "healthy") {
      selectedSymptoms.clear();
      selectedSymptoms.add("healthy");
    } else {
      selectedSymptoms.delete("healthy");

      if (selectedSymptoms.has(key)) {
        selectedSymptoms.delete(key);
      } else {
        selectedSymptoms.add(key);
      }
    }

    $$(".symptom-option").forEach(item => {
      const selected = selectedSymptoms.has(item.dataset.symptom);
      item.classList.toggle("selected", selected);
      item.querySelector(".option-check").textContent =
        selected ? "✓" : "○";
      item.setAttribute("aria-pressed", String(selected));
    });

    $("#scanButton").disabled = selectedSymptoms.size === 0;
  });
});

const symptomGuidance = {
  fungus: {
    title:"Possible fungal problem",
    causes:[
      "Some fungal diseases cause spots or unusual patches.",
      "High humidity and poor airflow can encourage fungal growth."
    ],
    advice:[
      "Improve airflow around the plant.",
      "Avoid keeping leaves wet for long periods.",
      "Remove severely affected fallen leaves using clean tools.",
      "Identify the problem before choosing a treatment."
    ]
  },
  powdery: {
    title:"Possible powdery mildew",
    causes:[
      "White powder-like growth can be associated with powdery mildew.",
      "Other residues or pests may sometimes look similar."
    ],
    advice:[
      "Check whether the coating spreads.",
      "Improve airflow around the plant.",
      "Seek species-specific advice before treatment."
    ]
  },
  yellowing: {
    title:"Yellowing leaves",
    causes:[
      "Overwatering or poor drainage.",
      "Insufficient light.",
      "Natural ageing of older leaves.",
      "Possible nutrient-related problems."
    ],
    advice:[
      "Check soil moisture before watering again.",
      "Make sure the pot drains properly.",
      "Review the plant's sunlight requirements."
    ]
  },
  withering: {
    title:"Possible wilting or drying",
    causes:[
      "The soil may be too dry.",
      "Excess water may be affecting the roots.",
      "Heat or environmental stress may be involved."
    ],
    advice:[
      "Check soil moisture before watering.",
      "Check the drainage of the pot.",
      "Protect the plant from harsh heat if necessary."
    ]
  },
  spots: {
    title:"Brown or dark leaf spots",
    causes:[
      "Fungal or bacterial diseases can cause spots.",
      "Sun scorch or physical damage may create dark patches."
    ],
    advice:[
      "Check whether spots are spreading.",
      "Avoid splashing water onto leaves.",
      "Monitor the plant closely."
    ]
  },
  curling: {
    title:"Curled or twisted leaves",
    causes:[
      "Heat or irregular watering may distort leaves.",
      "Sap-feeding pests may affect new growth."
    ],
    advice:[
      "Check soil moisture.",
      "Inspect the undersides of leaves for insects.",
      "Review recent temperature changes."
    ]
  },
  holes: {
    title:"Holes or chewed leaves",
    causes:[
      "Caterpillars, beetles and other chewing insects may cause holes.",
      "Physical damage can sometimes look similar."
    ],
    advice:[
      "Inspect both sides of the leaves.",
      "Look for insects or signs of feeding.",
      "Monitor new leaves for further damage."
    ]
  },
  pests: {
    title:"Possible pest activity",
    causes:[
      "Aphids, mealybugs, whiteflies and mites are common plant pests.",
      "Fine webbing or insect clusters may indicate pest activity."
    ],
    advice:[
      "Inspect leaf undersides and stems.",
      "Identify the pest before choosing treatment.",
      "Monitor nearby plants for similar signs."
    ]
  },
  mosaic: {
    title:"Mosaic or patchy patterns",
    causes:[
      "Some viral diseases cause uneven patterns.",
      "Nutrient problems, pests and natural leaf patterns may look similar."
    ],
    advice:[
      "Compare new leaves with older leaves.",
      "Inspect the plant for pests.",
      "Seek expert advice if the pattern spreads."
    ]
  },
  edges: {
    title:"Burnt or crispy leaf edges",
    causes:[
      "Heat or inconsistent watering may cause crispy edges.",
      "Salt buildup or excess fertilizer may contribute."
    ],
    advice:[
      "Check soil moisture and drainage.",
      "Review the plant's sunlight needs.",
      "Avoid extra fertilizer until the cause is clearer."
    ]
  },
  pale: {
    title:"Pale or faded leaves",
    causes:[
      "Insufficient light may affect leaf colour.",
      "Nutrient problems, root stress or pests may also contribute."
    ],
    advice:[
      "Check the plant's light requirements.",
      "Inspect leaves and stems for pests.",
      "Review watering and drainage."
    ]
  },
  silvery: {
    title:"Silvery or scraped-looking patches",
    causes:[
      "Thrips and some other pests can leave silvery marks.",
      "Physical rubbing or damage may look similar."
    ],
    advice:[
      "Inspect leaf undersides for tiny insects.",
      "Monitor new leaves for similar marks.",
      "Identify the pest before choosing treatment."
    ]
  }
};

$("#scanButton").addEventListener("click", () => {
  if (!uploadedPhoto || !selectedSymptoms.size) {
    showToast("Upload a photo and select a symptom first.");
    return;
  }

  const selected = [...selectedSymptoms];

  if (selected.includes("healthy")) {
    $("#resultTitle").textContent = "Your leaf looks healthy!";
    $("#resultSummary").textContent =
      "You selected that your leaf appears healthy. Continue observing it as it grows.";

    $("#symptomResults").innerHTML = `
      <h3>Observation</h3>
      <ul>
        <li>No unusual visible signs were selected.</li>
        <li>This does not rule out problems that are not visible.</li>
      </ul>
      <h3>Care Advice</h3>
      <ul>
        <li>Provide suitable light and watering.</li>
        <li>Check the leaves and soil regularly.</li>
      </ul>
    `;
  } else {
    $("#resultTitle").textContent =
      selected.length === 1
        ? symptomGuidance[selected[0]].title
        : `${selected.length} symptoms selected`;

    $("#resultSummary").textContent =
      "These are possible explanations based on the signs you selected, not a confirmed diagnosis.";

    $("#symptomResults").innerHTML = selected.map(key => {
      const result = symptomGuidance[key];

      return `
        <section class="symptom-report">
          <h3>${escapeHTML(result.title)}</h3>
          <strong>Possible Causes</strong>
          <ul>${result.causes.map(x => `<li>${escapeHTML(x)}</li>`).join("")}</ul>
          <strong>Care Advice</strong>
          <ul>${result.advice.map(x => `<li>${escapeHTML(x)}</li>`).join("")}</ul>
        </section>
      `;
    }).join("");
  }

  $("#scanResult").classList.remove("hidden");
  $("#scanResult").scrollIntoView({behavior:"smooth",block:"start"});
});

$("#scanAgainButton").addEventListener("click", () => {
  uploadedPhoto = null;
  leafPhoto.value = "";
  $("#leafPreview").src = "";
  $("#previewArea").classList.add("hidden");
  $("#symptomSection").classList.add("hidden");
  $("#scanResult").classList.add("hidden");
  resetSymptoms();
  $("#uploadArea").scrollIntoView({behavior:"smooth"});
});

/* =========================================
   8. PLANTSAFE — EXPANDED DATABASE

   This is a built-in reference list, not a
   complete veterinary or medical database.
========================================= */

const safetyDatabase = [];

function addSafety(names, title, status, cat, dog, child) {
  safetyDatabase.push({
    names: names.split("|"),
    title, status, cat, dog, child
  });
}

/* CAUTION: plants with recognised toxicity risks */

const cautionPlants = [
  ["tulip|tulipa|tulipa gesneriana","Tulip",
   "Tulips can harm cats if eaten, especially the bulb.",
   "Tulips can harm dogs if eaten, especially the bulb.",
   "Do not allow children to eat ornamental tulips, particularly bulbs."],

  ["daffodil|narcissus|narcissus pseudonarcissus","Daffodil",
   "Daffodils can be toxic to cats, particularly the bulbs.",
   "Daffodils can be toxic to dogs, particularly the bulbs.",
   "All parts may be harmful if eaten. Keep out of reach."],

  ["lily|true lily|lilium|easter lily|asiatic lily|tiger lily|daylily|hemerocallis","Lily",
   "Many true lilies and daylilies are extremely dangerous to cats. Contact a veterinarian immediately if exposure is suspected.",
   "Some lilies can cause illness in dogs. Contact a veterinarian if eaten.",
   "Do not eat ornamental lilies. Seek medical advice if ingestion is suspected."],

  ["sago palm|cycas revoluta","Sago Palm",
   "Highly toxic if eaten.",
   "Highly toxic if eaten. Seeds are especially dangerous.",
   "All parts can be harmful if eaten. Keep completely out of reach."],

  ["aloe vera|aloe barbadensis|aloe","Aloe Vera",
   "Can cause illness if chewed or eaten.",
   "Can cause illness if chewed or eaten.",
   "Do not eat the plant. Keep out of reach."],

  ["snake plant|dracaena trifasciata|sansevieria|mother in laws tongue","Snake Plant",
   "Can cause stomach upset if chewed or eaten.",
   "Can cause stomach upset if chewed or eaten.",
   "Keep out of reach; ingestion may cause irritation or stomach upset."],

  ["peace lily|spathiphyllum","Peace Lily",
   "Can cause oral irritation if chewed.",
   "Can cause oral irritation if chewed.",
   "Can irritate the mouth if eaten. Keep out of reach."],

  ["pothos|money plant|devils ivy|epipremnum aureum|golden pothos","Pothos / Money Plant",
   "Can cause oral irritation if chewed.",
   "Can cause oral irritation if chewed.",
   "Can irritate the mouth if eaten. Keep away from young children."],

  ["monstera|monstera deliciosa|swiss cheese plant","Monstera",
   "Can cause oral irritation if chewed.",
   "Can cause oral irritation if chewed.",
   "Can irritate the mouth if eaten."],

  ["jade plant|crassula ovata|money tree succulent","Jade Plant",
   "Considered toxic to cats if eaten.",
   "Considered toxic to dogs if eaten.",
   "Do not allow young children to chew or eat the plant."],

  ["rubber plant|ficus elastica|indian rubber plant","Rubber Plant",
   "Can cause irritation if chewed or eaten.",
   "Can cause irritation if chewed or eaten.",
   "Sap can irritate skin and the mouth."],

  ["zz plant|zamioculcas zamiifolia","ZZ Plant",
   "Can cause irritation if chewed or eaten.",
   "Can cause irritation if chewed or eaten.",
   "Keep out of reach; ingestion can cause irritation."],

  ["dieffenbachia|dumb cane","Dieffenbachia",
   "Can cause significant mouth irritation if chewed.",
   "Can cause significant mouth irritation if chewed.",
   "Can cause strong mouth and throat irritation if eaten."],

  ["philodendron|heartleaf philodendron|philodendron hederaceum","Philodendron",
   "Can cause oral irritation if chewed.",
   "Can cause oral irritation if chewed.",
   "Can irritate the mouth if eaten."],

  ["english ivy|hedera helix|common ivy","English Ivy",
   "Can cause illness if eaten.",
   "Can cause illness if eaten.",
   "Keep away from young children; ingestion may cause illness."],

  ["kalanchoe|kalanchoe blossfeldiana|mother of thousands","Kalanchoe",
   "Can be toxic if eaten.",
   "Can be toxic if eaten.",
   "Do not eat; keep out of reach."],

  ["caladium|caladium bicolor|elephant ears","Caladium",
   "Can cause oral irritation if chewed.",
   "Can cause oral irritation if chewed.",
   "Can irritate the mouth if eaten."],

  ["tomato|solanum lycopersicum|tomato plant","Tomato Plant",
   "Unripe fruit and green parts can be harmful if eaten.",
   "Unripe fruit and green parts can be harmful if eaten.",
   "Ripe tomato fruit is commonly eaten, but avoid leaves, stems and unripe fruit."],

  ["oleander|nerium oleander","Oleander",
   "Highly toxic if eaten.",
   "Highly toxic if eaten.",
   "All parts can be dangerous if eaten. Keep away from children."],

  ["azalea|rhododendron|rhododendron simsii","Azalea / Rhododendron",
   "Can cause serious illness if eaten.",
   "Can cause serious illness if eaten.",
   "Can be harmful if eaten. Keep out of reach."],

  ["foxglove|digitalis purpurea","Foxglove",
   "Can cause serious illness if eaten.",
   "Can cause serious illness if eaten.",
   "Do not eat any part of this plant."],

  ["autumn crocus|colchicum autumnale","Autumn Crocus",
   "Highly toxic if eaten.",
   "Highly toxic if eaten.",
   "Dangerous if eaten. Keep away from children."],

  ["cyclamen|cyclamen persicum","Cyclamen",
   "Can cause illness if eaten, especially the tuber.",
   "Can cause illness if eaten, especially the tuber.",
   "Keep out of reach; ingestion may cause illness."],

  ["castor bean|ricinus communis|castor oil plant","Castor Bean Plant",
   "Seeds are highly toxic if chewed or eaten.",
   "Seeds are highly toxic if chewed or eaten.",
   "Seeds are extremely dangerous if chewed or swallowed."],

  ["yew|taxus baccata|taxus","Yew",
   "Parts of the plant can be highly toxic if eaten.",
   "Parts of the plant can be highly toxic if eaten.",
   "Do not eat any part of this plant."],

  ["dracaena|dracaena marginata|dragon tree","Dracaena",
   "Can cause illness if eaten.",
   "Can cause illness if eaten.",
   "Keep out of reach; do not eat ornamental leaves."],

  ["bird of paradise|strelitzia reginae","Bird of Paradise",
   "Can cause stomach upset if eaten.",
   "Can cause stomach upset if eaten.",
   "Do not eat ornamental plant parts."],

  ["schefflera|umbrella plant|schefflera arboricola","Schefflera",
   "Can cause irritation if chewed.",
   "Can cause irritation if chewed.",
   "Keep out of reach; ingestion may cause irritation."],

  ["hydrangea|hydrangea macrophylla","Hydrangea",
   "Can cause illness if eaten.",
   "Can cause illness if eaten.",
   "Do not eat leaves or flowers."],

  ["amaryllis|hippeastrum","Amaryllis",
   "Can be toxic if eaten, particularly the bulb.",
   "Can be toxic if eaten, particularly the bulb.",
   "Keep bulbs and plant parts away from children."],

  ["chrysanthemum|mum|dendranthema","Chrysanthemum",
   "Can cause illness if eaten.",
   "Can cause illness if eaten.",
   "Avoid eating ornamental flowers or leaves."],

  ["poinsettia|euphorbia pulcherrima","Poinsettia",
   "Sap may cause irritation; eating the plant can cause stomach upset.",
   "Sap may cause irritation; eating the plant can cause stomach upset.",
   "Sap may irritate skin and mouth. Keep out of reach."],

  ["geranium|pelargonium","Geranium",
   "Some varieties can cause illness if eaten.",
   "Some varieties can cause illness if eaten.",
   "Identify the exact variety; do not eat ornamental plants."],

  ["lily of the valley|convallaria majalis","Lily of the Valley",
   "Highly toxic if eaten.",
   "Highly toxic if eaten.",
   "Can be dangerous if eaten. Keep away from children."]
];

cautionPlants.forEach(([names, title, cat, dog, child]) =>
  addSafety(names, title, "caution", cat, dog, child)
);

/* GENERALLY LOWER-RISK PLANTS
   Lower risk does not mean edible or safe
   to eat in unlimited amounts. */

const lowerRiskPlants = [
  ["spider plant|chlorophytum comosum","Spider Plant"],
  ["areca palm|dypsis lutescens|golden cane palm","Areca Palm"],
  ["parlor palm|chamaedorea elegans","Parlor Palm"],
  ["bamboo palm|chamaedorea seifrizii","Bamboo Palm"],
  ["calathea|goeppertia","Calathea"],
  ["prayer plant|maranta leuconeura","Prayer Plant"],
  ["peperomia|peperomia obtusifolia","Peperomia"],
  ["hoya|wax plant|hoya carnosa","Hoya"],
  ["african violet|saintpaulia","African Violet"],
  ["phalaenopsis|moth orchid|orchid","Orchid"],
  ["rose|rosa","Rose"],
  ["sunflower|helianthus annuus","Sunflower"],
  ["marigold|tagetes","Marigold"],
  ["snapdragon|antirrhinum majus","Snapdragon"],
  ["zinnia|zinnia elegans","Zinnia"],
  ["petunia|petunia hybrida","Petunia"],
  ["basil|ocimum basilicum|sweet basil","Basil"],
  ["rosemary|salvia rosmarinus","Rosemary"],
  ["thyme|thymus vulgaris","Thyme"],
  ["cilantro|coriander|coriandrum sativum","Coriander"],
  ["sage|salvia officinalis","Sage"],
  ["dill|anethum graveolens","Dill"],
  ["parsley|petroselinum crispum","Parsley"],
  ["chives|allium schoenoprasum","Chives"],
  ["lettuce|lactuca sativa","Lettuce"],
  ["carrot|daucus carota","Carrot"],
  ["cucumber|cucumis sativus","Cucumber"],
  ["pumpkin|cucurbita pepo","Pumpkin"],
  ["zucchini|courgette","Zucchini"],
  ["bell pepper|capsicum annuum|capsicum","Bell Pepper"],
  ["strawberry|fragaria x ananassa","Strawberry"],
  ["blueberry|vaccinium","Blueberry"],
  ["boston fern|nephrolepis exaltata","Boston Fern"],
  ["maidenhair fern|adiantum","Maidenhair Fern"],
  ["bird nest fern|asplenium nidus","Bird's Nest Fern"],
  ["haworthia|haworthiopsis","Haworthia"],
  ["echeveria","Echeveria"],
  ["burros tail|sedum morganianum","Burro's Tail"],
  ["hens and chicks|sempervivum","Hens and Chicks"],
  ["gloxinia|sinningia speciosa","Gloxinia"],
  ["bromeliad|bromeliaceae","Bromeliad"],
  ["money tree|pachira aquatica","Money Tree"],
  ["ponytail palm|beaucarnea recurvata","Ponytail Palm"],
  ["cast iron plant|aspidistra elatior","Cast Iron Plant"],
  ["polka dot plant|hypoestes phyllostachya","Polka Dot Plant"],
  ["baby rubber plant|peperomia obtusifolia","Baby Rubber Plant"]
];

lowerRiskPlants.forEach(([names, title]) => {
  addSafety(
    names,
    title,
    "lower",
    "Generally considered non-toxic to cats, according to common pet-plant references. Avoid allowing excessive chewing.",
    "Generally considered non-toxic to dogs, according to common pet-plant references. Avoid allowing excessive chewing.",
    "Not generally identified as a poisonous plant, but ornamental plants should not be eaten. Check the exact species."
  );
});

/* OTHER PLANTS WITH SPECIES-SPECIFIC CAUTION */

addSafety(
  "mint|mentha|peppermint|mentha x piperita|spearmint|mentha spicata",
  "Mint",
  "caution",
  "Some mint varieties and concentrated mint oils can be harmful. Identify the exact species.",
  "Some mint varieties and concentrated mint oils can be harmful. Identify the exact species.",
  "Culinary mint is used as food, but concentrated oils and unidentified varieties should not be consumed."
);

addSafety(
  "hibiscus|hibiscus rosa sinensis|china rose",
  "Hibiscus",
  "lower",
  "Common hibiscus is generally considered non-toxic to cats.",
  "Common hibiscus is generally considered non-toxic to dogs.",
  "Do not eat unidentified ornamental flowers. Confirm the exact species."
);

/* =========================================
   PLANTSAFE SEARCH
========================================= */

function normalizeName(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ");
}

function findSafetyPlant(query) {
  const q = normalizeName(query);
  if (!q) return null;

  // First: exact common-name or scientific-name match
  let match = safetyDatabase.find(plant =>
    plant.names.some(name => normalizeName(name) === q)
  );

  if (match) return match;

  // Second: allow a longer search phrase to contain an alias
  match = safetyDatabase.find(plant =>
    plant.names.some(name => {
      const n = normalizeName(name);
      return n.length >= 4 && q.includes(n);
    })
  );

  if (match) return match;

  // Third: allow the user to type the beginning of a longer name
  if (q.length >= 4) {
    match = safetyDatabase.find(plant =>
      plant.names.some(name => {
        const n = normalizeName(name);
        return n.startsWith(q) || q.startsWith(n);
      })
    );
  }

  return match || null;
}

function showSafetyResult() {
  const query = $("#safetySearch").value.trim();

  if (!query) {
    showToast("Enter a plant name first.");
    return;
  }

  const plant = findSafetyPlant(query);
  const result = $("#safetyResult");

  if (!plant) {
    result.innerHTML = `
      <span class="safety-status unknown">Not verified</span>
      <h2>${escapeHTML(query)} — information not verified</h2>
      <p>This plant is not currently in BottleBloom's built-in safety database. This does not mean it is safe.</p>

      <div class="safety-category">
        <strong>🐱 Cats</strong>
        <p>Safety information is not verified. Keep the plant out of reach.</p>
      </div>

      <div class="safety-category">
        <strong>🐶 Dogs</strong>
        <p>Safety information is not verified. Keep the plant out of reach.</p>
      </div>

      <div class="safety-category">
        <strong>🧒 Young children</strong>
        <p>Safety information is not verified. Do not allow chewing or eating.</p>
      </div>

      <p class="safety-note">
        Try the common name or scientific name. Different plants can share similar names.
      </p>
    `;
    return;
  }

  const statusText = plant.status === "lower"
    ? "Generally considered lower risk"
    : "Caution — potential toxicity";

  result.innerHTML = `
    <span class="safety-status ${plant.status}">
      ${statusText}
    </span>
    <h2>${escapeHTML(plant.title)}</h2>
    <p>General safety information:</p>

    <div class="safety-category">
      <strong>🐱 Cats</strong>
      <p>${escapeHTML(plant.cat)}</p>
    </div>

    <div class="safety-category">
      <strong>🐶 Dogs</strong>
      <p>${escapeHTML(plant.dog)}</p>
    </div>

    <div class="safety-category">
      <strong>🧒 Young children</strong>
      <p>${escapeHTML(plant.child)}</p>
    </div>

    <p class="safety-note">
      This is general educational information, not a medical or veterinary diagnosis.
      If a child or pet may have eaten a potentially toxic plant, contact a medical professional or veterinarian.
    </p>
  `;
}

$("#safetySearchButton").addEventListener("click", showSafetyResult);

$("#safetySearch").addEventListener("keydown", event => {
  if (event.key === "Enter") showSafetyResult();
});

/* =========================================
   9. REMINDERS
========================================= */

let reminders = JSON.parse(
  localStorage.getItem("bottlebloomReminders") || "[]"
);

function saveReminders() {
  localStorage.setItem("bottlebloomReminders", JSON.stringify(reminders));
}

function renderReminders() {
  const list = $("#reminderList");
  list.innerHTML = "";

  if (!reminders.length) {
    list.innerHTML =
      `<p class="empty-state">No reminders yet. Add one to get started 🌱</p>`;
    return;
  }

  reminders.forEach((reminder, index) => {
    const item = document.createElement("article");
    item.className = "saved-item";

    item.innerHTML = `
      <div>
        <h3>${escapeHTML(reminder.plant)}</h3>
        <p>${escapeHTML(reminder.task)} ·
          ${escapeHTML(reminder.date)} at ${escapeHTML(reminder.time)}</p>
      </div>
      <button class="delete-btn" data-delete-reminder="${index}">
        Delete
      </button>
    `;

    list.appendChild(item);
  });

  $$("[data-delete-reminder]").forEach(button => {
    button.addEventListener("click", () => {
      reminders.splice(Number(button.dataset.deleteReminder), 1);
      saveReminders();
      renderReminders();
      showToast("Reminder deleted.");
    });
  });
}

$("#reminderForm").addEventListener("submit", event => {
  event.preventDefault();

  const reminder = {
    plant: $("#reminderPlant").value.trim(),
    task: $("#reminderTask").value,
    date: $("#reminderDate").value,
    time: $("#reminderTime").value
  };

  if (!reminder.plant || !reminder.task ||
      !reminder.date || !reminder.time) {
    showToast("Please complete all reminder fields.");
    return;
  }

  reminders.push(reminder);
  saveReminders();
  renderReminders();
  event.target.reset();
  showToast("Your reminder has been saved!");
});

/* =========================================
   10. MY GARDEN
========================================= */

let gardenPlants = JSON.parse(
  localStorage.getItem("bottlebloomGarden") || "[]"
);

function saveGarden() {
  localStorage.setItem("bottlebloomGarden", JSON.stringify(gardenPlants));
}

function renderGarden() {
  const list = $("#gardenList");
  list.innerHTML = "";

  $("#gardenCount").textContent =
    `${gardenPlants.length} plant${gardenPlants.length === 1 ? "" : "s"}`;

  if (!gardenPlants.length) {
    list.innerHTML =
      `<p class="empty-state">Your garden is waiting for its first plant. 🌱</p>`;
    return;
  }

  gardenPlants.forEach((plant, index) => {
    const card = document.createElement("article");
    card.className = "garden-card";

    card.innerHTML = `
      <div class="garden-plant-icon">🪴</div>
      <h3>${escapeHTML(plant.name)}</h3>
      <p>Added: ${escapeHTML(plant.date)}</p>
      <button class="delete-btn" data-delete-plant="${index}">
        Remove
      </button>
    `;

    list.appendChild(card);
  });

  $$("[data-delete-plant]").forEach(button => {
    button.addEventListener("click", () => {
      gardenPlants.splice(Number(button.dataset.deletePlant), 1);
      saveGarden();
      renderGarden();
      showToast("Plant removed from your garden.");
    });
  });
}

$("#plantForm").addEventListener("submit", event => {
  event.preventDefault();

  const name = $("#newPlantName").value.trim();
  const date = $("#newPlantDate").value;

  if (!name || !date) {
    showToast("Please enter a plant name and date.");
    return;
  }

  gardenPlants.push({name, date});
  saveGarden();
  renderGarden();
  event.target.reset();
  showToast(`${name} added to your garden!`);
});

/* =========================================
   11. INITIAL SETUP
========================================= */

renderReminders();
renderGarden();

if (savedName) {
  loadHome();
}
