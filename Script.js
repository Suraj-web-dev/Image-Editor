let filters = {
  brightness: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  contrast: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  saturation: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },

  hueRotate: {
    value: 0,
    min: 0,
    max: 360,
    unit: "deg",
  },
  blur: {
    value: 0,
    min: 0,
    max: 20,
    unit: "px",
  },
  sepia: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  grayscale: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  invert: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  opacity: {
    value: 100,
    min: 0,
    max: 100,
    unit: "%",
  },
};
const filtersContainer = document.querySelector(".filters");
const imageinput = document.querySelector("#image-Input");
const canvas = document.getElementById("image-canvas");
const reset = document.querySelector("#reset-btn");
const download = document.querySelector("#download-btn");
const ctx = canvas.getContext("2d");
let images = null;
function createFilterElement(name, unit = "%", value, min, max) {
  const div = document.createElement("div");
  div.classList.add("filter");

  const input = document.createElement("input");
  input.type = "range";
  input.min = min;
  input.max = max;
  input.value = value;
  input.id = name;

  const p = document.createElement("p");
  p.innerText = name.charAt(0).toUpperCase() + name.slice(1);

  div.appendChild(p);
  div.appendChild(input);

  input.addEventListener("input", (e) => {
    filters[name].value = e.target.value;
    applyFilters();
  });
  return div;
}
function createfilters(){
Object.keys(filters).forEach((key) => {
  const filterElement = createFilterElement(
    key,
    filters[key].unit,
    filters[key].value,
    filters[key].min,
    filters[key].max,
  );
  filtersContainer.appendChild(filterElement);
});
}
createfilters();

imageinput.addEventListener("change", (e) => {
  const files = e.target.files[0];
  canvas.style.display = "block";
  const imageplaceholder = document.querySelector(".placeholder");
  imageplaceholder.style.display = "none";
  const img = new Image();
  img.src = URL.createObjectURL(files);
  img.onload = function () {
    images = img;
    canvas.height = img.height;
    canvas.width = img.width;
    ctx.drawImage(img, 0, 0);
  };
});

function applyFilters() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.filter = `
    brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturation.value}${filters.saturation.unit})
    hue-rotate(${filters.hueRotate.value}${filters.hueRotate.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    grayscale(${filters.grayscale.value}${filters.grayscale.unit})
    invert(${filters.invert.value}${filters.invert.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
  `;
  //    ctx.globalAlpha = filters.opacity.value / 100;
  ctx.drawImage(images, 0, 0);
}

reset.addEventListener("click", () => {

  filters.brightness.value = 100;
  filters.contrast.value = 100;
  filters.saturation.value = 100;
  filters.hueRotate.value = 0;
  filters.blur.value = 0;
  filters.sepia.value = 0;
  filters.grayscale.value = 0;
  filters.invert.value = 0;
  filters.opacity.value = 100;

  applyFilters();
  filtersContainer.innerHTML = "";
  createfilters();
});

download.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "edited-image.png";
  link.href = canvas.toDataURL();
  link.click();
});