

// collapsible for the faqs section
const collapsibles = document.querySelectorAll('.collapsible');

collapsibles.forEach(curItem => {
    curItem.addEventListener('click', function() {
        this.classList.toggle('collapsible__expanded');
    });
})