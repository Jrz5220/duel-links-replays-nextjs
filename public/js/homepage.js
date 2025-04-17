console.log("homepage.js loaded");
  
var medias = Array.prototype.slice.apply(document.querySelectorAll('audio,video'));

medias.forEach(function(media) {
    media.addEventListener('play', function(event) {
        medias.forEach(function(media) {
        if(event.target != media) media.pause();
        });
    });
});

// expand decks accordian when "view-all-decks" button is clicked
const viewAllDecksBtn = document.getElementById("view-all-decks-btn");
const additionalDecks = document.getElementById("hideAdditionalDecks");
viewAllDecksBtn.addEventListener("click", function() {
    additionalDecks.classList.toggle("active");
});