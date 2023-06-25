import { suggestionsList } from "./list.js";
const suggestion = document.getElementById("suggestion");
suggestion.addEventListener("mousedown", (event) => {
  const element = event.target;
  if (element.tagName.toLocaleLowerCase() === "li") {
    txt.value = element.textContent;
    resetSuggestion();
  }
});
const txt = document.getElementById("txt");
const showSuggestions = () => {
  suggestion.innerHTML = "";
  const textInput = txt.value.trim().toLowerCase();
  const filteredList = suggestionsList.filter((item) => {
    return item.toLocaleLowerCase().indexOf(textInput) > -1 && textInput !== "";
  });
  const nodes = filteredList.map((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    li.classList.add("list-item");
    return li;
  });
  suggestion.append(...nodes);
};

const debouncer = (cb, delay) => {
  let timerId;
  return function () {
    const args = arguments;
    const ctx = this;
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      cb.apply(ctx, args);
    }, delay);
  };
};

const resetSuggestion = () => {
  suggestion.innerHTML = "";
};

txt.addEventListener("blur", (event) => {
  resetSuggestion();
});

txt.addEventListener("input", debouncer(showSuggestions, 500));
