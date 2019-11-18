window.addEventListener('load', function () {
  var imageSections = document.getElementById('image-sections');
  var sectionTmp = document.getElementById('section-tmp');

  document.forms[0].addEventListener('submit', async function (e) {
    e.preventDefault();

    const body = {
      description: document.getElementById('description').value,
      services: [],
    };

    body.services = await Promise.all(
      Array.from(document.querySelectorAll('.section')).map(async (section) => ({
        title: section.querySelector('.title').value,
        description: section.querySelector('.description').value,
        icon: await _getImage(section.querySelector('.icon')),
      })),
    );

    await axios.post(baseUrl + '/services', body).then(window.location.reload.bind(window.location));
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
    section.querySelector('.delete').addEventListener('click', function () {
      section.parentNode.removeChild(section);
    });
  }
});
