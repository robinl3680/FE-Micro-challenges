import { restaurants } from "./content.js";

const cardContainer = document.getElementById("card-container");
const pivot = document.getElementById("pivot");
let lastIndex;

const observer = new IntersectionObserver(handleIntersection, { threshold: 1 });
observer.observe(pivot);

const createCard = (fromIndex, count, fromObserver) => {
  lastIndex = fromIndex + count;
  for (let key = fromIndex; key < lastIndex; key++) {
    const restuarant = restaurants[key];
    if (restuarant) {
      const card = document.createElement("div");
      const h3 = document.createElement("h13");
      h3.textContent = restuarant.title;
      const article = document.createElement("article");
      article.textContent = restuarant.description;
      card.append(h3, article);
      card.classList.add("card");
      if (fromObserver) {
        card.classList.add("card-animation");
      }
      cardContainer.append(card);
    } else {
      observer.unobserve(pivot);
    }
  }
};

function handleIntersection(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.target === pivot) {
      createCard(lastIndex + 1, 2, true);
    }
  });
}

window.addEventListener("beforeunload", function () {
  window.scrollTo(0, 0);
});

createCard(0, 6);
