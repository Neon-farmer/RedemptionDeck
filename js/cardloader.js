// Global Variables
let counter = 0;
let cardList = document.getElementById('card-list');
let globalCardJSON;
let filteredCardJSON;

// Load card metadata into globalCardJSON array
async function fetchCards() {
  try {
    const response = await fetch('./cards2.json');
    if (!response.ok) {
      throw new Error('Network error');
    }
    globalCardJSON = await response.json();
    globalCardJSON.forEach(card => {
      console.log(card);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

// Load the first 24 cards
initialize();

async function initialize() {
  await fetchCards();
  filterCards();

}

// Render the list of cards
function loadCards() {
  console.log("Cards to be loaded " + filteredCardJSON);

  for (let i = 0; i < 24 && i < filteredCardJSON.length; i++) {
    var card = filteredCardJSON[counter];
    // cardData = JSON.parse(card.card);

    if (card && card.ImageFile && card.Name) {
    console.log(card);
      var cardTemplate = 
          `<div class="card">
          <img src="http://www.redemptionquick.com/lackey/sets/setimages/general/${card.ImageFile}.jpg" alt="${card.Name}" class="card-image">
          </div>`;

      cardList.innerHTML += cardTemplate;
      counter++;
    }
  }
}

// Lazy Loading
$(window).scroll(function(){
  var scrollH = $(window).scrollTop()+$(window).height();
  var documentH = $(document).height();
  var halfwayFromBottom = documentH - ($(window).height() / 2);
  if (scrollH >= halfwayFromBottom) {
      loadCards();
    }
  }
);

/* Each element of the filters array is a Key-Value pair that has the
filter name as the key and an array of the selected criteria as the value.
These filters begin empty and are updated by the toggleSelection function */
let filters = {
  name: [],
  set: [],
  brigade: [],
  type: [],
  class: [],
  identifier: [],
  ability: [],
  rarity: [],
  alignment: [],
  legality: [],
};

async function filterCards() {
  // Reset counter
  counter = 0;

  // Apply filters
  filteredCardJSON = await new Promise(resolve => {
    const filteredCards = globalCardJSON.filter(card => {
    
      // Check if the card meets the filter criteria for each filter
      const brigadeCondition = 
        filters.brigade.length === 0 || 
        filters.brigade.every(selectedBrigade => card.Brigade.split('/').includes(selectedBrigade));

      const typeCondition = 
        filters.type.length === 0 ||
        filters.type.every(selectedType => card.Type.split('/').includes(selectedType));

      // Add more conditions for additional filters

      // If no filter is applied, keep the card
      return brigadeCondition &&
             typeCondition;
  });

  resolve(filteredCards);
});

// Every time cards are filtered, the screen should be cleared and cards reloaded
  cardList.innerHTML = '';
  console.log(filteredCardJSON);
  loadCards();
}






  



