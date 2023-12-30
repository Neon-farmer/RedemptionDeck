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
    globalCardJSON.sort((a, b) => a.Name.localeCompare(b.Name));
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

     // Trim .jpg from the end of image files
     var trimmedImageFile = card.ImageFile.replace(/\.jpg$/, '');

      var cardTemplate = 
          `<div class="card">
          <img src="http://www.redemptionquick.com/lackey/sets/setimages/general/${trimmedImageFile}.jpg" 
            alt="${card.Name}" 
            class="card-image"
            onerror="handleImageError(this)">
          </div>`;

      cardList.innerHTML += cardTemplate;
      counter++;
    }
  }
}

// Fill unfound images with generic card image
function handleImageError(img) {
  img.src ='./images/cardback.jpg';
  img.className ='imageFileNotFound';
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
  legality: ["Rotation"],
};


/* This function updates the filteredJSON array by applying the filters
in the filter array to the original JSON array and then loads the first
24 filtered cards via the loadCards function*/
async function filterCards() {
  // The card counter is reset when a new filter is applied
  counter = 0;

  // Apply filters
  filteredCardJSON = await new Promise(resolve => {
    const filteredCards = globalCardJSON.filter(card => {
    
      // Filter by Brigade
      const brigadeCondition = 
        filters.brigade.length === 0 || 
        filters.brigade.every(selectedBrigade => card.Brigade.split('/').includes(selectedBrigade));

      // Filter by Type
      const typeCondition = 
        filters.type.length === 0 ||
        filters.type.every(selectedType => card.Type.split('/').includes(selectedType));
     
      // Filter by alignment
      const alignmentCondition = 
        filters.alignment.length === 0 ||
        filters.alignment.every(selectedAlignment => card.Alignment.split('/').includes(selectedAlignment));
      
      // Filter by legality
      const legalityCondition = 
      filters.legality.every(selectedLegality => card.Legality.includes(selectedLegality));
      
      // filters.legality.length === 0 ||


      return brigadeCondition &&
             typeCondition &&
             alignmentCondition &&
             legalityCondition;
  });

  resolve(filteredCards);
});

// Every time cards are filtered, the screen should be cleared and cards reloaded
  cardList.innerHTML = '';
  console.log(filteredCardJSON);
  loadCards();
}






  



