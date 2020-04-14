//HASHTAGS
const HASHTAG_CRAWLING = 'Crawling';
const HASHTAG_EXPLOSION = 'Explosion';
const HASHTAG_BIG = 'Big';
const HASHTAG_SPIN = 'Spin';

const gifs = [
  { name: "Funnygif", tags: [] },
  { name: "Piston", tags: [] },
  { name: "Chest", tags: [] },
  { name: "Rolling", tags: [] },
  { name: "love", tags: [] },
  { name: "crying", tags: [] },
  { name: "bye", tags: [] },
  { name: "bear", tags: [HASHTAG_CRAWLING] },
  { name: "database", tags: [] },
  { name: "System", tags: [] },
  { name: "World", tags: [] },
  { name: "temperature", tags: [] },
  { name: "Clock", tags: [] },
  { name: "Icon technology gif", tags: [] },
  { name: "Coin", tags: [] },
  { name: "Fall", tags: [] },
  { name: "Healthy", tags: [] },
  { name: "Furnace", tags: [] },
  { name: "Cobblestone", tags: [] },
  { name: "Lava", tags: [] },
  { name: "Cauldron", tags: [] },
  { name: "Ingots", tags: [] },
  { name: "Message", tags: [] },
  { name: "StoneBricks", tags: [] },
  { name: "Repeater", tags: [] },
  { name: "RepeaterSwitch", tags: [] },
  { name: "Minecraft-tnt-explosion", tags: [] },
  { name: "Torch", tags: [] },
  { name: "Lantern", tags: [] },
  { name: "Planks", tags: [] },
  { name: "Plank.Slab", tags: [] },
  { name: "usb", tags: [] },
  { name: "Scaffolding", tags: [] },
  { name: "Bomb", tags: [HASHTAG_BIG, HASHTAG_EXPLOSION] },
  { name: "Lamp", tags: [] },
  { name: "Value", tags: [] },
  { name: "Dust", tags: [] },
  { name: "Boom", tags: [HASHTAG_EXPLOSION] },
  { name: "chicken", tags: [] },
  { name: "spin", tags: [] },
  { name: "kiwi", tags: [] },
  { name: "lemon", tags: [HASHTAG_SPIN] },
  { name: "eat", tags: [] },
  { name: "hello", tags: [] }
].map(i => {
  let title = i.name.toLowerCase();
  title = title.slice(0, 1).toUpperCase() + title.slice(1);
  return { name: title, tags: i.tags };
}).sort((a, b) => a.name.localeCompare(b.name));

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
    let gifName = gifs[i].name;
    console.log(gifs[i]);
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
    let titleText = gifName;
    if (gifs[i].tags.length > 0) {
      titleText += ' # ' + gifs[i].tags.reduce((acc, el) => `${acc} # ${el}`);
    }
    title.innerText = titleText;

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
