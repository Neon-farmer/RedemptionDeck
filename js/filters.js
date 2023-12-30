const brigades = [
  'Black', 'Blue', 'Brown', 'Clay', 'Crimson',
  'Gold', 'Gray', 'Green', 'Multi', 'Orange',
  'Pale Green', 'Purple', 'Red', 'Silver', 'Teal',
  'White'
];


/* 
  Template for dropdown: <div class="multi-select" id="{filterName}-filter"></div>
*/
function buildDropdownFilter(filterName, dropdownItemArray, placeholderText, maxItemSelection) {

  // Select the preexisting filter container
  var filterContainer = document.getElementById(filterName + "-filter");

  // Create the input container
  var inputContainer = document.createElement('div');
  inputContainer.classList.add('input-container');
  inputContainer.id = filterName + '-input-container';

  // Create the selected tags container
  var selectedTags = document.createElement('div');
  selectedTags.classList.add('selected-tags');
  selectedTags.id = filterName + '-selected-tags';
  selectedTags.onclick = function() {
    toggleDropdown(filterName);
  };

  // Create the placeholder div
  var placeholder = document.createElement('div');
  placeholder.classList.add('placeholder');
  placeholder.id = filterName + '-placeholder'
  placeholder.textContent = placeholderText;
  placeholder.onclick = function() {
    toggleDropdown(filterName);
  };

  // Create the clear all div
  var clearAll = document.createElement('div');
  clearAll.classList.add('clear-all');
  clearAll.id = filterName + '-clear-all';
  clearAll.onclick = function() {
    clearAllItems(filterName);
  };

  // Create the clear div icon
  var clearIcon = document.createElement('i');
  clearIcon.classList.add('fa-solid', 'fa-xmark', 'fa-2xl', 'clear-all');
  clearAll.appendChild(clearIcon);

  // Append elements to input container
  inputContainer.appendChild(selectedTags);
  inputContainer.appendChild(placeholder);
  inputContainer.appendChild(clearAll);

  // Append input container to the main container
  filterContainer.appendChild(inputContainer);

  // Create the dropdown div
  var dropdown = document.createElement('div');
  dropdown.classList.add('dropdown');
  dropdown.id = filterName + '-dropdown';
  dropdown.style.display = 'none';

  // Build the dropdown items
  dropdownItemArray.forEach(item => {
    var dropdownItem = document.createElement('div');
    dropdownItem.classList.add('dropdown-item');
    dropdownItem.dataset.value = item;
    dropdownItem.textContent = item;
    dropdownItem.onclick = function() {
      toggleSelection(item, filterName + '-dropdown', maxItemSelection);
    };
    dropdown.appendChild(dropdownItem);
  });

  // Append dropdown to the main container
  filterContainer.appendChild(dropdown);

}

// Show or hide the dropdown
function toggleDropdown(filterName) {
  var dropdown = document.getElementById(filterName + '-dropdown');
  dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}

buildDropdownFilter('brigade', brigades, 'Brigade', 3);
buildDropdownFilter('type', brigades, 'Brigade', 3);

function toggleSelection(item, filterName, maxItemSelection) {
  var selectedTags = document.getElementById(filterName + '-selected-tags');
  var dropdown = document.getElementById(filterName + '-dropdown');

  // Check the number of selected tags
  var selectedTagCount = selectedTags.querySelectorAll('.selected-tag').length;
 

  if (selectedTagCount < maxItemSelection) {
      // Check if the tag is already selected
      if (!selectedTags.querySelector(`[data-value="${item}"]`)) {
          // Create a new tag element
          const tag = document.createElement('div');
          tag.classList.add('selected-tag');
          tag.textContent = item;
          tag.dataset.value = item;

          // Append the tag to the selected tags container
          selectedTags.appendChild(tag);

          // Exclude the selected option from the dropdown
          const dropdownItem = dropdown.querySelector(`.dropdown-item[data-value="${item}"]`);
          dropdownItem.style.display = 'none';
          document.querySelector('.placeholder').style.display = 'none';

          // Add item to the filter array
          filters[filterName].push(item);
          filterCards();
      }
  }
}


function clearAllItems(filterName) {
  const selectedTags = document.getElementById(filterName + '-selected-tags');
  const dropdown = document.getElementById(filterName + '-dropdown');

  // Show all items in the dropdown
  dropdown.querySelectorAll('.dropdown-item').forEach(item => {
    item.style.display = 'block';
  });

  // Clear all selected tags
  selectedTags.innerHTML = '';

  // Show the placeholder
  document.querySelector('.placeholder').style.display = 'block';

  // Clear filters array
  filters.brigade = [];
  filterCards();
}

// Hide dropdown if clicked outside the multi-select component
window.addEventListener('click', function(event) {
  const multiSelect = document.querySelector('.multi-select');
  const dropdowns = document.getElementsByClassName('dropdown');

  // Convert HTMLCollection to an array for easier iteration
  const dropdownArray = Array.from(dropdowns);

  // Check if the event target is outside the multi-select and dropdown components
  if (
    !multiSelect.contains(event.target) &&
    !dropdownArray.some(dropdown => dropdown.contains(event.target))
  ) {
    dropdownArray.forEach(dropdown => {
      dropdown.style.display = 'none';
    });
  }
});