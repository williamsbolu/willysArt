//////////////////   Modal for the works section. ////////////////////////////////
const cardsContainer = document.querySelector(".card__container");
const slidesContainer = document.querySelector(".slides");
const galleryImgs = Array.from(document.querySelectorAll(".gallery__img"));
const modal = document.querySelector(".modal");
const modalImg = document.querySelector(".modal__img");

const cancelBtn = document.querySelector(".modal__button--cancel");
const prevButton = document.querySelector(".modal__button--prev");
const nextButton = document.querySelector(".modal__button--next");

let indexNo = 0;
let curModalImgArr = null;
// console.log(curModalImgArr);

const galleryHandler = (element, datasetIsValid = true, imgIndexNo = 0) => {
  let imagesArr;

  if (datasetIsValid) {
    imagesArr = Array.from(
      document.querySelectorAll(`.${element.dataset.modal}`)
    );
  } else {
    imagesArr = Array.from(document.querySelectorAll(`.${element}`));
  }

  console.log(imagesArr);

  // stops the body scrolling
  document.body.classList.add("stop-scrolling");

  // display the modal
  modal.classList.remove("remove-display");
  modal.classList.add("add-display");

  // update the index current index no.
  indexNo += imgIndexNo;

  // add the src
  modalImg.src = imagesArr[indexNo].src;

  // Animate the image
  modalImg.classList.remove("remove-image");
  modalImg.classList.add("add-image");

  curModalImgArr = imagesArr;
};

if (cardsContainer) {
  cardsContainer.addEventListener("click", function (e) {
    // if we click on the btn link.. return
    if (e.target.classList.contains("btn")) return;

    const cardElement = e.target.closest(".card");

    if (!cardElement) return; // if we dont get d card modal element

    galleryHandler(cardElement);
  });
}

if (slidesContainer) {
  slidesContainer.addEventListener("click", function (e) {
    // if we click on the btn link.. return
    if (e.target.classList.contains("btn")) return;

    const slidesElement = e.target.closest(".slide");

    if (!slidesElement) return; // if we dont get d card modal element

    galleryHandler(slidesElement);
  });
}

galleryImgs.forEach((cur) => {
  cur.addEventListener("click", () => {
    const currentIndexNo = galleryImgs.indexOf(cur);

    galleryHandler("gallery__img", false, currentIndexNo);
  });
});

cancelBtn.addEventListener("click", function (e) {
  // Animate out the image
  modalImg.classList.remove("add-image");
  modalImg.classList.add("remove-image");

  // remove the modal
  modal.classList.remove("add-display");
  modal.classList.add("remove-display");

  document.body.classList.remove("stop-scrolling");

  indexNo = 0;
});

prevButton.addEventListener("click", function () {
  if (indexNo === 0) {
    indexNo = curModalImgArr.length - 1;
    modalImg.src = curModalImgArr[indexNo].src;
  } else {
    indexNo -= 1;
    modalImg.src = curModalImgArr[indexNo].src;
  }
  console.log(indexNo);
});

nextButton.addEventListener("click", function () {
  indexNo += 1;

  if (indexNo < curModalImgArr.length) {
    // if d index is equal to d length of d array
    modalImg.src = curModalImgArr[indexNo].src;
  } else {
    indexNo = 0;
    modalImg.src = curModalImgArr[indexNo].src;
  }
  console.log(indexNo);
});

//////////////////    Video modal code    //////////////////////////////////
const recentContainer = document.querySelector(".recent");
const videoContainer = document.querySelector(".video");
const videoContent = document.querySelector(".video__content");
const videoBtn = document.querySelector(".video__button--cancel");

if (recentContainer) {
  recentContainer.addEventListener("click", function (e) {
    const item = e.target.closest(".recent__item");

    if (!item) return;

    // stops the body scrolling
    document.body.classList.add("stop-scrolling");

    // display the modal
    videoContainer.classList.remove("remove-display");
    videoContainer.classList.add("add-display");

    // add the src
    videoContent.src = item.dataset.src;

    // Animate the video
    videoContent.classList.remove("remove-video");
    videoContent.classList.add("add-video");
  });
}

if (videoBtn) {
  videoBtn.addEventListener("click", function (e) {
    // Adds the body scrolling
    document.body.classList.remove("stop-scrolling");

    // removes the modal
    videoContainer.classList.remove("add-display");
    videoContainer.classList.add("remove-display");

    // Animate the video
    videoContent.classList.remove("add-video");
    videoContent.classList.add("remove-video");

    // add the src
    videoContent.src = "";
  });
}

//////////////////   Collapsible for the faqs section  /////////////////////////////////
const collapsiblesContainer = document.querySelector(".faqs");

if (collapsiblesContainer) {
  collapsiblesContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("collapsible__content")) return;

    const clicked = e.target.closest(".collapsible");

    if (!clicked) return;

    clicked.classList.toggle("collapsible__expanded");
  });
}

//////////////////////////////////////////////////////////////////
// SLIDES

const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

const slider = function () {
  // current slide
  let currentSlide = 0;
  const maxSlide = slides.length;

  //////  FUNCTIONS  ///////
  const createDots = function () {
    // Loop over the slides to create a button dot for each of them, with the slide data set to the index number
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    // function for adding the active class to the dots based on d active slide number
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    // selecting based the data attribute we use [].
    // here we are selecting the element based on the data-slide attribute value.s
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (curSlide) {
    // console.log(curSlide);
    // slides.forEach((s, i) => s.style.transform = `translateX(${100 * i}%)`);
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - curSlide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0; // restarts the slides
    } else {
      currentSlide++; // move to d next slide
    }

    // currentSlide = 0:  0% 100% 200% 300%
    // currentSlide = 1: -100% 0% 100% 200%
    // currentSlide = 2: -200% -100% 0% 100%
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }

    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const init = function () {
    goToSlide(0); // this here sets the first slide to 0 (default)

    createDots();
    activateDot(0); // set the dot to d first dot
  };

  init();

  ///// EVENT HANDLERS /////
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide(); // short circuiting can also be used
  });

  dotContainer.addEventListener("click", function (e) {
    // here we use (event deligation) again

    if (e.target.classList.contains("dots__dot")) {
      // if d element contains d class we specified
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

if ((slides, btnLeft, btnRight, dotContainer)) {
  slider();
}

// const mediaQueryHigh = window.matchMedia("(min-width: 960px)");

// if (mediaQueryHigh.matches) {
//   slides.forEach((s, i) => (s.style.transform = `translateX(0)`));
// }

// if (mediaQuery.matches) {
//   slider();
//   console.log("matched");
// }
