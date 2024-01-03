
buildDropdownFilter('brigade', brigades, 'Brigade', 3);
buildDropdownFilter('type', types, 'Type', 3);
buildDropdownFilter('set', sets, 'Set', 1);
buildDropdownFilter('alignment', alignment, 'Alignment', 2);

// Build the multiselect filters
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
      toggleSelection(item, filterName, maxItemSelection);
    };
    dropdown.appendChild(dropdownItem);
  });

  // Append dropdown to the main container
  filterContainer.appendChild(dropdown);

}









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
          document.getElementById(filterName + '-placeholder').style.display = 'none';

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
  document.getElementById(filterName + '-placeholder').style.display = 'block';

  // Clear filters array
  Object.keys(filters).forEach(property => {
    filters[property] = [];
  });
  filters.legality = ["Rotation"];
  filterCards();
}

// Show or hide the dropdown
function toggleDropdown(filterName) {
  var dropdown = document.getElementById(filterName + '-dropdown');
  console.log(filterName + '-dropdown');
  dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}

// Hide dropdowns of all multi-selects except the clicked one, and hide dropdowns if none are clicked
window.addEventListener('click', function(event) {
  const multiSelects = document.querySelectorAll('.multi-select');
  const dropdowns = document.querySelectorAll('.dropdown');

  // Check if the event target is outside all multi-select and dropdown components
  if (
    !multiSelects || 
    !Array.from(multiSelects).some(multiSelect => multiSelect.contains(event.target))
  ) {
    // Hide dropdowns of all multi-selects
    console.log("Hide all dropdowns");
    dropdowns.forEach(dropdown => {
      dropdown.style.display = 'none';
    });

    // Show the dropdown of the clicked multi-select
    const clickedMultiSelect = Array.from(multiSelects).find(multiSelect => multiSelect.contains(event.target));
    if (clickedMultiSelect) {
      const clickedDropdown = clickedMultiSelect.querySelector('.dropdown');
      if (clickedDropdown) {
        clickedDropdown.style.display = 'block';
      }
    }
  } else {
    // Hide dropdowns of all multi-selects except the clicked one
    multiSelects.forEach(multiSelect => {
      if (!multiSelect.contains(event.target)) {
        const dropdown = multiSelect.querySelector('.dropdown');
        if (dropdown) {
          dropdown.style.display = 'none';
        }
      }
    });
  }
});

