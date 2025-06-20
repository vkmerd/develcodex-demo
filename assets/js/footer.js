function svgFetch(){
    fetch('assets/images/svg-sprite.svg')
    .then(response => response.text())
    .then(data => {
      document.getElementById('svg-sprite-container').innerHTML = data;
    })
    .catch(error => console.error('SVG yüklenirken hata oluştu:', error));
}

svgFetch();


document.querySelectorAll('.collapsed-item').forEach(function(item) {
  item.addEventListener('click', function() {
    const footer = item.closest('footer');

    if (!item.classList.contains('opened')) {
      footer.querySelectorAll('.collapsed-item.opened').forEach(function(openedItem) {
        openedItem.classList.remove('opened');
      });
    }

    item.classList.toggle('opened');
  });
});