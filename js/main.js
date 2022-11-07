//////////////////   Modal for the works section. ////////////////////////////////
const cardsContainer = document.querySelector('.card__container');
const modal = document.querySelector('.modal');
const modalImg = document.querySelector('.modal__img');

const cancelBtn = document.querySelector(".modal__button--cancel");
const prevButton = document.querySelector(".modal__button--prev");
const nextButton = document.querySelector(".modal__button--next");

let indexNo = 0;
let curModalImgArr = null;
// console.log(curModalImgArr);


cardsContainer.addEventListener('click', function (e) {
    // if we click on the btn link.. return
    if(e.target.classList.contains('btn')) return;

    const cardElement = e.target.closest(".card");

    if (!cardElement) return; // if we dont get d card modal element

    const imagesArr = Array.from(document.querySelectorAll(`.${cardElement.dataset.modal}`));

    console.log(imagesArr);

    // stops the body scrolling
    document.body.classList.add('stop-scrolling');

    // display the modal
    modal.classList.remove("remove-display");
    modal.classList.add("add-display");

    // add the src
    modalImg.src = imagesArr[indexNo].src;

    // Animate the image
    modalImg.classList.remove("remove-image");
    modalImg.classList.add("add-image");

    curModalImgArr = imagesArr;
});

cancelBtn.addEventListener('click', function(e) {

    // Animate out the image
    modalImg.classList.remove("add-image");
    modalImg.classList.add("remove-image");

    // remove the modal
    modal.classList.remove("add-display");
    modal.classList.add("remove-display");

    document.body.classList.remove("stop-scrolling");

    indexNo = 0;

});

prevButton.addEventListener('click', function () {
    if(indexNo === 0) {
        indexNo = (curModalImgArr.length - 1);
        modalImg.src = curModalImgArr[indexNo].src;
    } else {
        indexNo -= 1;
        modalImg.src = curModalImgArr[indexNo].src;
    } 
    console.log(indexNo);
});

nextButton.addEventListener('click', function () {
    indexNo += 1;

    if(indexNo < curModalImgArr.length) { // if d index is equal to d length of d array 
        modalImg.src = curModalImgArr[indexNo].src;
    } else {
        indexNo = 0;
        modalImg.src = curModalImgArr[indexNo].src;
    }
    console.log(indexNo);
});



//////////////////    Video modal code    //////////////////////////////////
const recentContainer = document.querySelector('.recent');
const videoContainer = document.querySelector('.video');
const videoContent = document.querySelector('.video__content');
const videoBtn = document.querySelector(".video__button--cancel");

recentContainer.addEventListener('click', function(e) {

    const item = e.target.closest('.recent__item');

    if(!item) return;

    // stops the body scrolling
    document.body.classList.add('stop-scrolling');

    // display the modal
    videoContainer.classList.remove("remove-display");
    videoContainer.classList.add("add-display");

    // add the src
    videoContent.src = item.dataset.src;

    // Animate the video
    videoContent.classList.remove("remove-video");
    videoContent.classList.add("add-video");
});

videoBtn.addEventListener('click', function(e) {

    // Adds the body scrolling
    document.body.classList.remove('stop-scrolling');

    // removes the modal
    videoContainer.classList.remove("add-display");
    videoContainer.classList.add("remove-display"); 

    // Animate the video
    videoContent.classList.remove("add-video");
    videoContent.classList.add("remove-video");

    // add the src
    videoContent.src = '';

});


//////////////////   Collapsible for the faqs section  /////////////////////////////////
const collapsiblesContainer = document.querySelector('.faqs');

collapsiblesContainer.addEventListener('click', function (e) {

    if (e.target.classList.contains('collapsible__content')) return;

    const clicked = e.target.closest('.collapsible');

    if (!clicked) return;

    clicked.classList.toggle('collapsible__expanded');
});