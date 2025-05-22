function hideMap() {
  const map = document.getElementById("map-container");
  if (map.style.display === "block" || map.style.display === "") {
    map.style.display = "none";
  } else {
    map.style.display = "block";
  }
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
}

window.addEventListener("message", (event) => {
  if (event.origin.includes("chatbase.co")) {
    const data = event.data;
    if (typeof data === "string") {
      speak(data);
    }
  }
});

function previewAndDetect(input) {
  const preview = document.getElementById("preview-container");
  const info = document.getElementById("disease-info");
  const loadingContainer = document.getElementById("loading-bar-container");
  const loadingBar = document.getElementById("loading-bar");

  // Clear previous content
  preview.innerHTML = "";
  info.innerHTML = "";
  loadingContainer.style.display = "block";
  loadingBar.style.width = "0%";

  // Animate loading bar
  let width = 0;
  const interval = setInterval(() => {
    if (width >= 100) {
      clearInterval(interval);
    } else {
      width += 2;
      loadingBar.style.width = width + "%";
    }
  }, 40); // ~2 seconds

  setTimeout(() => {
    const file = input.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.style.maxWidth = "300px";
        img.style.border = "1px solid #ccc";
        img.style.borderRadius = "8px";
        preview.appendChild(img);

        // Simulated disease detection based on filename
        const lowerName = file.name.toLowerCase();
        let matchedKey = Object.keys(diseaseData).find((key) =>
          lowerName.includes(key.split("_")[0])
        );

        // Default fallback
        if (!matchedKey) matchedKey = "tomato_blight";

        info.innerHTML = diseaseData[matchedKey];
        speak(stripHTML(diseaseData[matchedKey]));
      };
      reader.readAsDataURL(file);
    }
    loadingContainer.style.display = "none";
  }, 2000);
}

function stripHTML(html) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

const diseaseData = {
  tomato_blight: `
    <strong>Tomato Early Blight</strong><br>
    - Caused by Alternaria solani.<br>
    - Dark concentric spots on lower leaves.<br>
    - Leads to leaf drop and poor fruit.<br>
    - Develops under high humidity.<br>
    - Requires fungicide for control.
  `,
  rice_blast: `
    <strong>Rice Blast Disease</strong><br>
    - Caused by Magnaporthe oryzae.<br>
    - Spindle-shaped lesions on leaves.<br>
    - Common in wet paddy fields.<br>
    - Affects panicles and leaf sheaths.<br>
    - Managed with resistant varieties.
  `,
  wheat_rust: `
    <strong>Wheat Rust</strong><br>
    - Caused by Puccinia spp.<br>
    - Orange, yellow, or brown pustules on leaves.<br>
    - Reduces yield and grain quality.<br>
    - Spread by wind and moisture.<br>
    - Controlled with resistant cultivars.
  `,
  potato_late_blight: `
    <strong>Potato Late Blight</strong><br>
    - Caused by Phytophthora infestans.<br>
    - Water-soaked lesions on leaves.<br>
    - Affects tubers with rot.<br>
    - Common in humid, cool climates.<br>
    - Managed by fungicides and resistant varieties.
  `,
  sugarcane_red_rot: `
    <strong>Sugarcane Red Rot</strong><br>
    - Caused by Colletotrichum falcatum.<br>
    - Red discoloration inside cane.<br>
    - Wilting and drying of leaves.<br>
    - Spread through infected setts.<br>
    - Controlled with crop rotation.
  `,
  banana_sigatoka: `
    <strong>Banana Sigatoka</strong><br>
    - Caused by Mycosphaerella spp.<br>
    - Brown streaks on leaves.<br>
    - Reduces photosynthesis and yield.<br>
    - Fungal spores spread by wind.<br>
    - Managed by removing infected leaves.
  `,
  groundnut_tikka: `
    <strong>Groundnut Tikka Disease</strong><br>
    - Caused by Cercospora spp.<br>
    - Circular brown spots on leaves.<br>
    - Causes premature leaf fall.<br>
    - Favors warm, moist weather.<br>
    - Controlled with fungicides.
  `,
  cotton_bacterial_blight: `
    <strong>Cotton Bacterial Blight</strong><br>
    - Caused by Xanthomonas citri.<br>
    - Angular leaf spots and wilting.<br>
    - Leads to boll rot.<br>
    - Spread by rain splash.<br>
    - Managed with seed treatment.
  `,
  maize_turcicum_blight: `
    <strong>Maize Turcicum Leaf Blight</strong><br>
    - Caused by Exserohilum turcicum.<br>
    - Long necrotic lesions on leaves.<br>
    - Occurs in high humidity.<br>
    - Leads to yield loss.<br>
    - Managed with resistant hybrids.
  `,
  soybean_rust: `
    <strong>Soybean Rust</strong><br>
    - Caused by Phakopsora pachyrhizi.<br>
    - Tan or brown lesions on leaves.<br>
    - Causes early defoliation.<br>
    - Spreads rapidly in moist climates.<br>
    - Controlled with fungicide spray.
  `,
  brinjal_wilt: `
    <strong>Brinjal Wilt</strong><br>
    - Caused by Fusarium oxysporum.<br>
    - Yellowing and wilting of leaves.<br>
    - Affects plant’s vascular system.<br>
    - Reduces fruit yield.<br>
    - Controlled by crop rotation and resistant varieties.
  `,
  chilli_leaf_curl: `
    <strong>Chili Leaf Curl</strong><br>
    - Caused by Tobacco leaf curl virus (TLCV).<br>
    - Distorted leaves with yellow veins.<br>
    - Leads to stunted growth.<br>
    - Spread by whiteflies.<br>
    - Managed with insecticides.
  `,
  onion_downy_mildew: `
    <strong>Onion Downy Mildew</strong><br>
    - Caused by Peronospora destructor.<br>
    - Pale yellow lesions on leaves.<br>
    - Occurs in wet, cool conditions.<br>
    - Reduces bulb quality and yield.<br>
    - Controlled by fungicides.
  `,
  pea_powdery_mildew: `
    <strong>Pea Powdery Mildew</strong><br>
    - Caused by Erysiphe pisi.<br>
    - White, powdery growth on leaves.<br>
    - Leads to leaf distortion.<br>
    - Thrives in dry conditions.<br>
    - Managed with fungicides.
  `,
  mustard_white_rust: `
    <strong>Mustard White Rust</strong><br>
    - Caused by Albugo candida.<br>
    - White pustules on leaves and stems.<br>
    - Reduces yield by affecting flower formation.<br>
    - Controlled with fungicides.
  `,
  sorghum_downy_mildew: `
    <strong>Sorghum Downy Mildew</strong><br>
    - Caused by Peronosclerospora sorghi.<br>
    - Yellow streaks and distorted growth.<br>
    - Affects both leaves and panicles.<br>
    - Thrives in moist conditions.<br>
    - Managed by resistant varieties.
  `,
  tomato_leaf_curl: `
    <strong>Tomato Leaf Curl Virus</strong><br>
    - Caused by Tomato leaf curl virus (ToLCV).<br>
    - Curling and yellowing of leaves.<br>
    - Stunted growth and reduced fruit yield.<br>
    - Spread by whiteflies.<br>
    - Controlled by insecticides.
  `,
  bajra_ergot: `
    <strong>Bajra Ergot</strong><br>
    - Caused by Claviceps africana.<br>
    - Black sclerotia on spikelets.<br>
    - Reduces grain quality and yield.<br>
    - Affected seeds contain toxic alkaloids.<br>
    - Controlled by fungicides.
  `,
  cabbage_black_rot: `
    <strong>Cabbage Black Rot</strong><br>
    - Caused by Xanthomonas campestris.<br>
    - Yellow V-shaped lesions on leaves.<br>
    - Foul odor from infected plant tissue.<br>
    - Spread by rain splash and contaminated tools.<br>
    - Managed with crop rotation.
  `,
  spinach_downy_mildew: `
    <strong>Spinach Downy Mildew</strong><br>
    - Caused by Peronospora effusa.<br>
    - Yellowing and brown lesions on leaves.<br>
    - Leads to reduced yield and quality.<br>
    - Controlled by fungicides.
  `,
  sunflower_downy_mildew: `
    <strong>Sunflower Downy Mildew</strong><br>
    - Caused by Plasmopara halstedii.<br>
    - Yellowing and wilting of leaves.<br>
    - Reduces seed yield.<br>
    - Spread by wind and rain.<br>
    - Managed with fungicides.
  `,
  turmeric_leaf_blotch: `
    <strong>Turmeric Leaf Blotch</strong><br>
    - Caused by Phyllosticta spp.<br>
    - Brown to black blotches on leaves.<br>
    - Leads to reduced root yield.<br>
    - Occurs in wet, humid conditions.<br>
    - Controlled by fungicides.
  `,
  ginger_soft_rot: `
    <strong>Ginger Soft Rot</strong><br>
    - Caused by Fusarium solani.<br>
    - Soft, water-soaked rot on rhizomes.<br>
    - Spread by contaminated soil.<br>
    - Managed by removing infected rhizomes.
  `,
  apple_scab: `
    <strong>Apple Scab</strong><br>
    - Caused by Venturia inaequalis.<br>
    - Dark, velvety lesions on leaves.<br>
    - Reduces fruit quality and yield.<br>
    - Spread by rain.<br>
    - Controlled by fungicides.
  `,
  mango_anthracnose: `
    <strong>Mango Anthracnose</strong><br>
    - Caused by Colletotrichum gloeosporioides.<br>
    - Dark lesions on leaves and fruits.<br>
    - Affects fruit ripening and quality.<br>
    - Controlled with fungicides.
  `,
  grape_downy_mildew: `
    <strong>Grape Downy Mildew</strong><br>
    - Caused by Plasmopara viticola.<br>
    - White downy mold on leaves.<br>
    - Reduces grape quality and yield.<br>
    - Controlled by fungicides.
  `,
  papaya_ring_spot: `
    <strong>Papaya Ring Spot</strong><br>
    - Caused by Papaya ring spot virus (PRSV).<br>
    - Circular lesions on leaves and fruit.<br>
    - Leads to reduced fruit quality.<br>
    - Spread by aphids.<br>
    - Managed by using virus-free seeds.
  `,
  pomegranate_bacterial_blight: `
    <strong>Pomegranate Bacterial Blight</strong><br>
    - Caused by Xanthomonas axonopodis.<br>
    - Water-soaked lesions on leaves.<br>
    - Leads to fruit drop and decay.<br>
    - Managed with resistant varieties.
  `,
  coconut_bud_rot: `
    <strong>Coconut Bud Rot</strong><br>
    - Caused by Phytophthora palmivora.<br>
    - Yellowing and rot of bud.<br>
    - Leads to loss of leaves and fruit.<br>
    - Managed by removing infected plants.
  `,
  tea_blight: `
    <strong>Tea Blight</strong><br>
    - Caused by Colletotrichum camelliae.<br>
    - Brown lesions and rot on tea leaves.<br>
    - Reduces leaf yield.<br>
    - Controlled by fungicides.
  `,
};
