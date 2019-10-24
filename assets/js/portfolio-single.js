var baseUrl = baseUrl || '';
var id = id || null;

window.addEventListener('load', function () {
  document.querySelector('form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const body = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      xCoords: document.getElementById('xCoords').value,
      yCoords: document.getElementById('yCoords').value,
      rowsCount: document.getElementById('rowsCount').value,
      columnsCount: document.getElementById('colsCount').value,
      rowHeight: document.getElementById('rowHeight').value + 'px',
    };

    var mainPicture = document.getElementById('mainPicture');
    var presentablePicture = document.getElementById('presentablePicture');

    if (mainPicture.files[0]) {
      body.mainPicture = await convertFileToImage(mainPicture.files[0]);
    } else {
      body.mainPicture = await convertUrlToImage(mainPicture.parentElement.querySelector('img').src);
    }

    if (presentablePicture.files[0]) {
      body.presentablePicture = await convertFileToImage(presentablePicture.files[0]);
    } else {
      body.presentablePicture = await convertUrlToImage(presentablePicture.parentElement.querySelector('img').src);
    }

    let images = document.getElementById('images');

    if (images.files.length) {
      images = await Promise.all(
        Array.from(images.files).map(async file => ({
          image: await convertFileToImage(file),
        }))
      );
    } else {
      images = await Promise.all(
        Array.from(images.parentElement.querySelectorAll('img')).map(async el => ({
          image: await convertUrlToImage(el.src),
        }))
      );
    }

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

    await axios.put(baseUrl + '/portfolio/' + id, body);
    window.location.pathname = baseUrl + '/portfolio';
  });
});