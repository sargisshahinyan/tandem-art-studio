var baseUrl = baseUrl || '';

window.addEventListener('load', function () {
  document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    const body = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      color: document.getElementById('color').value,
      presentablePicture: document.getElementById('presentablePicture').parentNode.querySelector('img').src,
      mainPicture: document.getElementById('mainPicture').parentNode.querySelector('img').src,
    };

    body.sections = Array.from(document.querySelectorAll('.section')).map((section) => ({
      colsCount: Number(section.querySelector('select').value),
      images: Array.from(section.querySelectorAll('input')).map((el) => (
        el.parentNode.querySelector('img').src
      ))
    }));

    axios.post(baseUrl + '/portfolio', body).then(window.location.reload.bind(window.location));
  });

  document.getElementById('portfolios-list').addEventListener('click', function (e) {
    if (!e.target.classList.contains('delete')) return;
    if (!confirm('Are you sure you want to remove this item?')) return;

    var id = e.target.closest('.portfolio-item').dataset.id;
    axios.delete(baseUrl + '/portfolio/' + id).then(window.location.reload.bind(window.location));
  });

  $('#portfolios-list')
    .sortable()
    .disableSelection()
    .on('sortupdate', function(event, ui) {
      const body = {
        portfolios: Array.from(this.children).map((item, i) => ({
          id: Number(item.dataset.id),
          position: i + 1,
        })),
      };

      axios.put(baseUrl + '/portfolio/order', body)
    });
});
