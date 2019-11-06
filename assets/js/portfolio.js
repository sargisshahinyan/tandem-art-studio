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

    body.sections = await Promise.all(
      Array.from(document.querySelectorAll('.section')).map(async (section) => ({
        colsCount: Number(section.querySelector('select').value),
        images: await Promise.all(
          Array.from(section.querySelectorAll('input')).map(({ files: [file] }) => (
            convertFileToImage(file)
          ))
        )
      })),
    );

    await axios.post(baseUrl + '/portfolio', body).then(window.location.reload.bind(window.location));
  });

  document.getElementById('portfolios-list').addEventListener('click', function (e) {
    if (!e.target.classList.contains('delete')) return;
    if (!confirm('Are you sure you want to remove this item?')) return;

    var id = e.target.closest('.portfolio-item').dataset.id;
    axios.delete(baseUrl + '/portfolio/' + id).then(window.location.reload.bind(window.location));
  });
});
