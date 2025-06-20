import { restaurants } from "./content.js";

const cardContainer = document.getElementById("card-container");
const pivot = document.getElementById("pivot");
let lastIndex;

const observer = new IntersectionObserver(handleIntersection, { threshold: 1 });
observer.observe(pivot);

const createCard = (fromIndex, count, fromObserver) => {
  lastIndex = fromIndex + count;
  for (let key = fromIndex; key < lastIndex; key++) {
    const fragment = document.createDocumentFragment();
    const restaurant = restaurants[key];
    if (restaurant) {
      const card = document.createElement("div");
      const h3 = document.createElement("h3");
      h3.textContent = restaurant.title;
      const article = document.createElement("article");
      article.textContent = restaurant.description;
      card.append(h3, article);
      card.classList.add("card");
      if (fromObserver) {
        card.classList.add("card-animation");
      }
      fragment.append(card);
    } else {
      observer.unobserve(pivot);
    }
    cardContainer.appendChild(fragment);
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
