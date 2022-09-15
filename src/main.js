import "./style.css";

import { ScrollSnapSlider } from "scroll-snap-slider/src/ScrollSnapSlider.js";
import { ScrollSnapDraggable } from "./ScrollSnapDraggable.js";

import EmblaCarousel from "embla-carousel";
import ClassNames from "embla-carousel-class-names";
import {
  setupPrevNextBtns,
  disablePrevNextBtns,
} from "./prevAndNextButtons.js";

/* =========================================================================
  Scroll Snap Slider
  ========================================================================== */

const sliderElement = document.querySelector(".scroll-snap-slider.js");
const slider = new ScrollSnapSlider(sliderElement, true, [
  new ScrollSnapDraggable(50),
]);

const prev = document.querySelector("#prev");
const next = document.querySelector("#next");

const updateArrows = function () {
  const isFirst = sliderElement.scrollLeft === 0;
  prev.disabled = isFirst ? true : false;

  const isLast =
    sliderElement.scrollLeft + sliderElement.offsetWidth >=
    sliderElement.scrollWidth;
  next.disabled = isLast ? true : false;
};

prev.addEventListener("click", function () {
  slider.slideTo(slider.slide - 1);
});

next.addEventListener("click", function () {
  slider.slideTo(slider.slide + 1);
});

updateArrows();

slider.addEventListener("slide-pass", updateArrows);
slider.addEventListener("slide-stop", updateArrows);

/* =========================================================================
  Embla Carousel
  ========================================================================== */
const emblaNode = document.querySelector(".embla");
const prevBtn = document.querySelector(".embla__button--prev");
const nextBtn = document.querySelector(".embla__button--next");

const options = {
  align: "start",
  slidesToScroll: 1,
  skipSnaps: true,
  containScroll: "trimSnaps",
  dragFree: true,
  breakpoints: {
    "(min-width: 768px)": { dragFree: false },
  },
};

const embla = EmblaCarousel(emblaNode, options, [ClassNames()]);

setupPrevNextBtns(prevBtn, nextBtn, embla);
const disablePrevAndNextBtns = disablePrevNextBtns(prevBtn, nextBtn, embla);

embla.on("select", disablePrevAndNextBtns);
embla.on("init", disablePrevAndNextBtns);

window.addEventListener("load", () => {
  embla.reInit();
});
