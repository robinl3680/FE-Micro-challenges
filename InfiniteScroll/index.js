import { restaurants } from "./content.js";

class Card {
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }
  render() {
    const card = document.createElement("div");
    const title = document.createElement("h3");
    const article = document.createElement("article");
    title.textContent = this.title;
    article.textContent = this.content;
    card.setAttribute("role", "article");
    card.append(title, article);
    card.classList.add("card");
    return card;
  }
}

window.addEventListener("beforeunload", function () {
  window.scrollTo(0, 0);
});

document.addEventListener("DOMContentLoaded", () => {
  let lastLoadedIndex = 0;
  const cardContainer = document.getElementById("card-container");
  const pivot = document.getElementById("pivot");

  const observer = new IntersectionObserver(handleIntersection, {
    threshold: 1,
  });
  observer.observe(pivot);

  function renderCards(cards) {
    const documentFragment = document.createDocumentFragment();
    cards.forEach((card) => {
      documentFragment.appendChild(card);
    });
    cardContainer.insertBefore(documentFragment, pivot);
  }

  function handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.target === pivot) {
        // Get the next two restaurants
        const nextRestaurants = restaurants.slice(
          lastLoadedIndex,
          lastLoadedIndex + 2
        );

        if (nextRestaurants.length > 0) {
          // Create and append the new cards
          const newCards = nextRestaurants.map((restaurant) => {
            const card = new Card(
              restaurant.title,
              restaurant.description
            ).render();
            card.classList.add("card-animation");
            return card;
          });
          renderCards(newCards);
          // Update the index for the next load
          lastLoadedIndex += nextRestaurants.length;
        }

        // If all restaurants are loaded, stop observing
        if (lastLoadedIndex >= restaurants.length) {
          observer.unobserve(pivot);
        }
      }
    });
  }

  (function createInitialCard() {
    const cards = restaurants.slice(0, 6).map((restaurant) => {
      return new Card(restaurant.title, restaurant.description).render();
    });
    renderCards(cards);
    lastLoadedIndex = 6; // Track that the first 5 are loaded
  })();
});
