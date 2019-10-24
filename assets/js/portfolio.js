var globalData = globalData || {};
var baseUrl = baseUrl || '';

window.addEventListener('load', function () {
  var rowsCount = document.getElementById('rowsCountGlobal');
  var colsCount = document.getElementById('colsCountGlobal');
  var rowHeightGlobal = document.getElementById('rowHeightGlobal');

  var sizes = document.getElementById('sizes');

  sizes.addEventListener('change', _fillGlobalStyles);
  _fillGlobalStyles();

  document.getElementById('update').addEventListener('click', function () {
    var body = Object.assign({}, globalData);

    body[sizes.value] = {
      rows_count: rowsCount.value,
      columns_count: colsCount.value,
      row_height: rowHeightGlobal.value + 'px'
    };

    axios.put(baseUrl + '/portfolio', body).then(function (res) {
      globalData = res.data;
    });
  });

  document.querySelector('form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const body = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      presentablePicture: await convertFileToImage(document.getElementById('presentablePicture').files[0]),
      mainPicture: await convertFileToImage(document.getElementById('mainPicture').files[0]),
      xCoords: document.getElementById('xCoords').value,
      yCoords: document.getElementById('yCoords').value,
      rowsCount: document.getElementById('rowsCount').value,
      columnsCount: document.getElementById('colsCount').value,
      rowHeight: document.getElementById('rowHeight').value + 'px',
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

  function _fillGlobalStyles() {
    var size = sizes.value;
    var selectedData = globalData[size];

    rowsCount.value = selectedData.rows_count;
    colsCount.value = selectedData.columns_count;
    rowHeightGlobal.value = parseInt(selectedData.row_height);
  }
});