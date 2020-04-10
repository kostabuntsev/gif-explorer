const gifs = [
  "Funnygif",
  "Piston",
  "Chest",
  "Rolling",
  "love",
  "crying",
  "bye",
  "bear",
  "database",
  "System",
  "World",
  "temperature",
  "Clock",
  "Icon technology gif",
  "Coin",
  "Fall",
  "Healthy",
  "Furnace",
  "Cobblestone",
  "Lava",
  "Cauldron",
  "Ingots",
  "Message",
  "StoneBricks",
  "Repeater",
  "RepeaterSwitch",
  "Minecraft-tnt-explosion",
  "Torch",
  "Lantern",
  "Planks",
  "Plank.Slab",
  "usb",
  "Scaffolding",
  "Bomb",
  "Lamp",
  "Value",
  "Dust",
  "Boom",
  "chicken",
  "spin",
  "kiwi",
  "lemon",
  "eat",
  "hello",
].map(i => {
  const title = i.toLowerCase();
  return title.slice(0, 1).toUpperCase() + title.slice(1);
}).sort();

const PAGE_SIZE = 10;

const state = {
  pageNumber: 1,
};

function loadGifs() {
  const container = document.getElementById("gifsContainer");
  if (!container) {
    console.error("Cannot find gif container");
  }
  container.innerHTML = '';

  for (let i = (state.pageNumber - 1) * PAGE_SIZE; i < Math.min(gifs.length, state.pageNumber * PAGE_SIZE); i++) {
    let gifName = gifs[i];
    const slideContainer = document.createElement("div");
    slideContainer.classList.add("slideContainer");

    const a = document.createElement("a");
    a.setAttribute("download", `${gifName}.gif`);
    a.setAttribute("href", `gifs/${gifName}.gif`);
    a.setAttribute("title", gifName);

    const img = document.createElement("img");
    img.setAttribute("alt", gifName);
    img.setAttribute("src", `gifs/${gifName}.gif`);

    a.appendChild(img);

    const title = document.createElement('span');
    title.classList.add('slideTitle');
    title.innerText = gifName;

    slideContainer.appendChild(a);
    slideContainer.appendChild(title);
    container.appendChild(slideContainer);
  }
}

function loadPager() {
  const container = document.getElementById("pagerContainer");
  if (!container) {
    console.error("Cannot find pager container");
  }
  container.innerHTML = '';

  const pagesCount = Math.ceil(gifs.length / PAGE_SIZE);

  new Array(pagesCount).fill(0).forEach((el, i) => {
    const pageButton = document.createElement("div");

    pageButton.classList.add("pageButton");
    pageButton.innerText = i + 1;
    if (state.pageNumber == i + 1) {
      pageButton.classList.add("pageButtonActive");
    }

    pageButton.onclick = e => {
      state.pageNumber = parseInt(e.target.innerText);
      loadGifs();
      loadPager();
    };
    container.appendChild(pageButton);
  });
}
