const brigades = [
  'Black', 'Blue', 'Brown', 'Clay', 'Crimson',
  'Gold', 'Gray', 'Green', 'Multi', 'Orange',
  'Pale Green', 'Purple', 'Red', 'Silver', 'Teal',
  'White'
];

function buildDropdown(dropDownID, dropdownItemArray) {
  var dropdown = document.getElementById(dropDownID);
    dropdownItemArray.forEach(item => {
      var itemTemplate = `<div class="dropdown-item" data-value="${item}" onclick="toggleSelection('${item}')">${item}</div>`;
      dropdown.innerHTML += itemTemplate;
    });
}

buildDropdown('brigadeDropdown', brigades);





function toggleSelection(value) {
    const selectedTags = document.getElementById('selectedBrigades');
    const dropdown = document.getElementById('brigadeDropdown');
    const maxSelection = 4;

    // Check the number of selected tags
    const selectedTagCount = selectedTags.querySelectorAll('.selected-tag').length;

    if (selectedTagCount < maxSelection) {
      // Check if the tag is already selected
      if (!selectedTags.querySelector(`[data-value="${value}"]`)) {
        // Create a new tag element
        const tag = document.createElement('div');
        tag.classList.add('selected-tag');
        tag.textContent = value;
        tag.dataset.value = value;

        // Append the tag to the selected tags container
        selectedTags.appendChild(tag);

        // Exclude the selected option from the dropdown
        const dropdownItem = dropdown.querySelector(`.dropdown-item[data-value="${value}"]`);
        dropdownItem.style.display = 'none';
        document.querySelector('.placeholder').style.display = 'none';

        // Add brigade to the filter array
        filters.brigade.push(value);
        filterCards();
      }
    }
}

function clearAll() {
  const selectedTags = document.getElementById('selectedBrigades');
  const dropdown = document.getElementById('brigadeDropdown');

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


  function toggleDropdown() {
    const dropdown = document.getElementById('brigadeDropdown');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
  }

  // Hide dropdown if clicked outside the multi-select component
  window.addEventListener('click', function(event) {
    const multiSelect = document.querySelector('.multi-select');
    const dropdown = document.getElementById('brigadeDropdown');

    if (!multiSelect.contains(event.target) && event.target !== dropdown) {
      dropdown.style.display = 'none';
    }
  });