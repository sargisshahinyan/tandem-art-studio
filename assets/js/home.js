window.addEventListener('load', function () {
  var imageSections = document.getElementById('image-sections');
  var sectionTmp = document.getElementById('section-tmp');

  document.forms[0].addEventListener('submit', async function (e) {
    e.preventDefault();

    const body = {
      slidePaths: [],
    };

    body.slidePaths = await Promise.all(
      Array.from(document.querySelectorAll('.section')).map(async (section) => {
        const [main, text] = await Promise.all([
          _getImage(section.querySelector('.main')),
          _getImage(section.querySelector('.secondary')),
        ]);

        return { main, text };
      }),
    );

    await axios.post(baseUrl + '/home', body).then(window.location.reload.bind(window.location));
  });

  document.getElementById('add-section-btn').addEventListener('click', function () {
    var section = sectionTmp.content.cloneNode(true);

    _handleEvents(section.querySelector('.section'));

    imageSections.appendChild(section);
  });

  Array.from(document.querySelectorAll('.section')).forEach(_handleEvents);

  async function _getImage(el) {
    return el.files[0] ? (
      convertFileToImage(el.files[0])
    ) : (
      (() => {
        const img = el.parentNode.querySelector('img');

        return img && img.src ? convertUrlToImage(
          el.parentNode.querySelector('img').src
        ) : null;
      })()
    );
  }


  function _handleEvents(section) {
    if (typeof window.autoPresentImages === 'function') {
      Array.from(section.querySelectorAll('input')).forEach(window.autoPresentImages);
    }

    section.querySelector('.delete').addEventListener('click', function () {
      section.parentNode.removeChild(section);
    });
  }
});
