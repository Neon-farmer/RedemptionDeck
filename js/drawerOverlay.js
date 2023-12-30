// Close the drawer when an area outside the drawer is clicked
document.getElementById('overlay').addEventListener('click', function() {
    document.getElementById('drawer-checkbox').checked = false;
  });