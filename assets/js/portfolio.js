var baseUrl = baseUrl || '';

window.addEventListener('load', function () {
  var imageSections = document.getElementById('image-sections');
  var sectionTmp = document.getElementById('section-tmp');
  var imgInputTmp = document.getElementById('img-input-tmp');

  document.querySelector('form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const body = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      presentablePicture: await convertFileToImage(document.getElementById('presentablePicture').files[0]),
      mainPicture: await convertFileToImage(document.getElementById('mainPicture').files[0]),
    };

    const sections = await Promise.all(
      Array.from(document.getElementById('images').files).map(async file => ({
        image: await convertFileToImage(file),
      }))
    );

    Array.from(document.getElementsByClassName('image-grid-data')).forEach((el, i) => {
      sections[i].coords = [];

      Array.from(el.querySelectorAll('.coordData')).forEach(function (el) {
        sections[i].coords.push({
          size: Number(el.dataset.id),
          xCoords: el.querySelector('.xCoords').value,
          yCoords: el.querySelector('.yCoords').value,
        })
      });
    });

    body.sections = sections;

    await axios.post(baseUrl + '/portfolio', body).then(window.location.reload.bind(window.location));
  });

  document.getElementById('add-section-btn').addEventListener('click', function () {
    var section = sectionTmp.content.cloneNode(true);
    var images = section.querySelector('.images');

    section.querySelector('.columns-count').addEventListener('change', function () {
      var count = Number(this.value);

      images.innerHTML = '';
      for (let i = 0; i < count; ++i) {
        var imgInput = imgInputTmp.content.cloneNode(true);
        imgInput.children[0].classList.add('col-' + (12 / count));

        if (typeof window.autoPresentImages === 'function') {
          window.autoPresentImages(imgInput.querySelector('input'));
        }

        images.appendChild(imgInput);
      }
    });

    imageSections.appendChild(section);
  });

  document.getElementById('portfolios-list').addEventListener('click', function (e) {
    if (!e.target.classList.contains('delete')) return;
    if (!confirm('Are you sure you want to remove this item?')) return;

    var id = e.target.closest('.portfolio-item').dataset.id;
    axios.delete(baseUrl + '/portfolio/' + id).then(window.location.reload.bind(window.location));
  });
});