var baseUrl = baseUrl || '';
var id = id || null;

window.addEventListener('load', function () {
  document.querySelector('form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const body = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
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

    body.sections = await Promise.all(
      Array.from(document.querySelectorAll('.section')).map(async (section) => ({
        colsCount: Number(section.querySelector('select').value),
        images: await Promise.all(
          Array.from(section.querySelectorAll('input')).map((el) => (
            el.files[0] ? (
              convertFileToImage(el.files[0])
            ) : (
              convertUrlToImage(
                el.parentNode.querySelector('img').src
              )
            )
          ))
        )
      })),
    );

    await axios.put(baseUrl + '/portfolio/' + id, body);
    window.location.pathname = baseUrl + '/portfolio';
  });
});