let images = [{
  url: "https://avatars.mds.yandex.net/get-autoru-vos/1893639/2208bae64dc5ce3d5b043ab310e31976/1200x900",
  title: "BMW M5 V (F10) 4.4 AMT (560 л.с.)"
}, {
  url: "https://s1.1zoom.ru/b5152/787/Toyota_Tuning_2016_GT86_CS_Red_541715_2048x1152.jpg",
  title: "GT86 CS Красный"
}, {
  url: "https://i.pinimg.com/736x/af/f2/66/aff2669bf30a3a9a7cd03d67273d592c.jpg",
  title: " Ferrari 812"
}, {
  url: "https://i.pinimg.com/originals/a7/1a/b7/a71ab7eb5bdcf74642e17c73415ce518.jpg",
  title: "1972 Monte Carlo"
}, {
  url: "https://rare-gallery.com/mocahbig/65575-White-Car-Car2009-Mini-Cooper-S-50-Camden.jpg",
  title: "Mini Cooper Белый"
}];

function initSlider(options) {
if (!images || !images.length) return;

options = options || {
  titles: false,
  dots: true,
  autoplay: false
};

let sliderImages = document.querySelector(".slider__images");
let sliderArrows = document.querySelector(".slider__arrows");
let sliderDots = document.querySelector(".slider__dots");

initImages();
initArrows();

if (options.dots) {
  initDots();
}

if (options.titles) {
  initTitles();
}

if (options.autoplay) {
  initAutoplay();
}

function initImages() {
  images.forEach((image, index) => {
    let imageDiv = `<div class="image n${index} ${index === 0? "active" : ""}" style="background-image:url(${images[index].url});" data-index="${index}"></div>`;
    sliderImages.innerHTML += imageDiv;
  });
}

function initArrows() {
  sliderArrows.querySelectorAll(".slider__arrow").forEach(arrow => {
    arrow.addEventListener("click", function() {
      let curNumber = +sliderImages.querySelector(".active").dataset.index;
      let nextNumber;
      if (arrow.classList.contains("left")) {
        nextNumber = curNumber === 0? images.length - 1 : curNumber - 1;
      } else {
        nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
      }
      moveSlider(nextNumber);
    });
  });
}

function initDots() {
  images.forEach((image, index) => {
    let dot = `<div class="slider__dots-item n${index} ${index === 0? "active" : ""}" data-index="${index}"></div>`;
    sliderDots.innerHTML += dot;
  });
  sliderDots.querySelectorAll(".slider__dots-item").forEach(dot => {
    dot.addEventListener("click", function() {
      moveSlider(this.dataset.index);
    })
  })
}

function moveSlider(num) {
  sliderImages.querySelector(".active").classList.remove("active");
  sliderImages.querySelector(".n" + num).classList.add("active");
  if (options.dots) {
    sliderDots.querySelector(".active").classList.remove("active");
    sliderDots.querySelector(".n" + num).classList.add("active");
  }
  if (options.titles) changeTitle(num);
}

function initTitles() {
  let titleDiv = `<div class="slider__images-title">${images[0].title}</div>`;
  sliderImages.innerHTML += cropTitle(titleDiv, 100);
}

function changeTitle(num) {
  if (!images[num].title) return;
  let sliderTitle = sliderImages.querySelector(".slider__images-title");
  sliderTitle.innerText = cropTitle(images[num].title, 50);
}

function cropTitle(title, size) {
  if (title.length <= size) {
    return title;
  } else {
    return title.substr(0, size) + "...";
  }
}

function initAutoplay() {
  setInterval(() => {
    let curNumber = +sliderImages.querySelector(".active").dataset.index;
    let nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
    moveSlider(nextNumber);
  }, options.autoplayInterval);
}
}

let sliderOptions = {
dots: true,
titles: true,
autoplay: true,
autoplayInterval: 3000
};

document.addEventListener("DOMContentLoaded", function() {
initSlider(sliderOptions);
});