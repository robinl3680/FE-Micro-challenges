const text = document.getElementById("content");
const toast = document.getElementById("toast-container");
const toast_template = document.getElementById("toast-template");
const showToast = () => {
  const removeToast = async () => {
    wrapper.classList.add("fadeRight");
    await new Promise((resolve) => setTimeout(resolve, 500));
    wrapper.remove();
  };
  const clone = toast_template.content.cloneNode(true);
  const wrapper = clone.querySelector(".toast-wrapper");
  const btn = clone.querySelector(".remove");
  btn.addEventListener("click", removeToast);
  wrapper.firstElementChild.textContent = text.value;
  toast.append(wrapper);
  setTimeout(removeToast, 5000);
};

const throttler = (cb, delay) => {
  let timer;
  return function () {
    const context = this;
    const args = arguments;
    if (!timer) {
      cb.apply(context, args);
      timer = setTimeout(() => {
        timer = undefined;
      }, delay);
    }
  };
};
const throttledShow = throttler(showToast, 500);
document.getElementById("show").addEventListener("click", throttledShow);
