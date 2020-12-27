var slides = document.getElementsByClassName('item');
var currentSlide = 0;
setInterval(nextSlide,2000);

function nextSlide() {
    slides[currentSlide].className = 'item';
    currentSlide = (currentSlide+1)%slides.length;
    slides[currentSlide].className = 'item show';
}