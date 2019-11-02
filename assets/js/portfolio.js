var baseUrl = baseUrl || '';

window.addEventListener('load', function () {
  document.querySelector('form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const body = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      presentablePicture: await convertFileToImage(document.getElementById('presentablePicture').files[0]),
      mainPicture: await convertFileToImage(document.getElementById('mainPicture').files[0]),
    };

    const images = await Promise.all(
      Array.from(document.getElementById('images').files).map(async file => ({
        image: await convertFileToImage(file),
      }))
    );

    Array.from(document.getElementsByClassName('image-grid-data')).forEach((el, i) => {
      images[i].coords = [];

      Array.from(el.querySelectorAll('.coordData')).forEach(function (el) {
        images[i].coords.push({
          size: Number(el.dataset.id),
          xCoords: el.querySelector('.xCoords').value,
          yCoords: el.querySelector('.yCoords').value,
        })
      });
    });

    body.images = images;

    await axios.post(baseUrl + '/portfolio', body).then(window.location.reload.bind(window.location));
  });

  document.getElementById('portfolios-list').addEventListener('click', function (e) {
    if (!e.target.classList.contains('delete')) return;
    if (!confirm('Are you sure you want to remove this item?')) return;

    var id = e.target.closest('.portfolio-item').dataset.id;
    axios.delete(baseUrl + '/portfolio/' + id).then(window.location.reload.bind(window.location));
  });
});