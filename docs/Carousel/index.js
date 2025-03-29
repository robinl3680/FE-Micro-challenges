const imgCont = document.querySelector(".img-container");
const btnCont = document.querySelector(".btn-container");
const iconCont = document.querySelector(".icon-container");
let currentSlide = 1;
const imgs = [];
const dots = [];

for (let i = 0; i < 3; i++) {
  const dot = document.createElement("div");
  dot.classList.add("icon");
  dot.dataset.index = i;
  dot.addEventListener("click", (evt) => {
    console.log(currentSlide);
    currentSlide = +evt.target.dataset.index + 1;
    showSlide();
  });
  dots.push(dot);
  iconCont.appendChild(dot);
}

for (let i = 0; i < 3; i++) {
  const img = `https://picsum.photos/${200 + i}`;
  const imgEl = document.createElement("img");
  imgEl.src = img;
  imgEl.classList.add("img");
  imgEl.dataset.index = i;
  if (i + 1 === currentSlide) {
    imgEl.style.display = "block";
    dots[0].classList.add("active");
  }
  imgs.push(imgEl);
  imgCont.appendChild(imgEl);
}

const prevBtn = document.querySelector(".prev");
prevBtn.addEventListener("click", () => {
  console.log(currentSlide);
  currentSlide -= 1;
  if (currentSlide <= 0) {
    currentSlide = imgs.length;
  }
  showSlide();
});

const nextBtn = document.querySelector(".next");
nextBtn.addEventListener("click", () => {
  console.log(currentSlide);
  currentSlide += 1;
  if (currentSlide > imgs.length) {
    currentSlide = 1;
  }
  showSlide();
});

const showSlide = () => {
  for (let i = 0; i < imgs.length; i++) {
    imgs[i].style.display = "none";
    dots[i].classList.remove("active");
  }
  imgs[currentSlide - 1].style.display = "block";
  dots[currentSlide - 1].classList.add("active");
};
