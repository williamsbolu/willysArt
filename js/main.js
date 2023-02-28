//////////////////   Modal for the works section. ////////////////////////////////
const cardsContainer = document.querySelector(".card__container");
const slidesContainer = document.querySelector(".card__slide");
const galleryImgs = Array.from(document.querySelectorAll(".gallery__img"));
const modal = document.querySelector(".modal");
const modalImg = document.querySelector(".modal__img");

const cancelBtn = document.querySelector(".modal__button--cancel");
const prevButton = document.querySelector(".modal__button--prev");
const nextButton = document.querySelector(".modal__button--next");

// Video modal code
const recentContainer = document.querySelector(".recent");
const videoContainer = document.querySelector(".video");
const videoContent = document.querySelector(".video__content");
const videoBtn = document.querySelector(".video__button--cancel");

// Collapsible for the faqs section
const collapsiblesContainer = document.querySelector(".faqs");

// hamburger
const menuBtn = document.querySelector(".hamburger");

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

    const slidesElement = e.target.closest(".card");

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

// ------- Hamburger -----------//
const nav = document.querySelector(".nav-menu");
const navBtn = document.querySelector(".nav-cancel");
const navLinks = document.querySelectorAll(".nav-menu__item");

menuBtn.addEventListener("click", function () {
  // stops the body scrolling
  document.body.classList.add("stop-scrolling");

  nav.classList.remove("nav-inactive");
  nav.classList.add("nav-active");

  navLinks.forEach((link, index) => {
    link.style.animation = `navLinkFade 0.4s ease forwards ${index / 7 + 0.3}s`;
  });
});

navBtn.addEventListener("click", function () {
  navLinks.forEach((link, index) => {
    link.style.animation = `navLinkFadeOut 0.5s ease forwards ${
      index / 7 + 0.3
    }s`;
  });

  nav.classList.remove("nav-active");
  nav.classList.add("nav-inactive");

  document.body.classList.remove("stop-scrolling");
});

//////////////////   Collapsible for the faqs section  /////////////////////////////////

if (collapsiblesContainer) {
  collapsiblesContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("collapsible__content")) return;

    const clicked = e.target.closest(".collapsible");

    if (!clicked) return;

    clicked.classList.toggle("collapsible__expanded");
  });
}

// const mediaQueryHigh = window.matchMedia("(min-width: 960px)");

// if (mediaQueryHigh.matches) {
//   slides.forEach((s, i) => (s.style.transform = `translateX(0)`));
// }

// if (mediaQuery.matches) {
//   slider();
//   console.log("matched");
// }
