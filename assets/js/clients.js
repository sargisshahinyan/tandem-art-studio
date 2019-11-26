window.addEventListener('load', function () {
  var imageSections = document.getElementById('image-sections');
  var sectionTmp = document.getElementById('section-tmp');

  document.forms[0].addEventListener('submit', async function (e) {
    e.preventDefault();

    const body = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      clients: [],
    };

    body.clients = await Promise.all(
      Array.from(document.querySelectorAll('.section')).map(async (section) => ({
        order: Number(section.querySelector('.order').value),
        icon: await _getImage(section.querySelector('.icon')),
      })),
    );

    await axios.post(baseUrl + '/clients', body).then(window.location.reload.bind(window.location));
  });

  document.getElementById('add-section-btn').addEventListener('click', function () {
    var section = sectionTmp.content.cloneNode(true);

    _handleEvents(section.querySelector('.section'));

    imageSections.appendChild(section);
  });

  imageSections.addEventListener('change', function (e) {
    if (!e.target.classList.contains('order')) return;

    const sections = Array.from(document.querySelectorAll('.section'));
    sections.sort((a, b) => (
      Number(a.querySelector('.order').value) - Number(b.querySelector('.order').value)
    ));
    const parent = sections[0].parentNode;
    sections.forEach(section => parent.appendChild(section));
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
    var order = section.querySelector('.order');

    order.value = order.value || document.querySelectorAll('.section').length + 1;

    section.querySelector('.delete').addEventListener('click', function () {
      section.parentNode.removeChild(section);
    });

    if (typeof window.autoPresentImages === 'function') {
      window.autoPresentImages(section.querySelector('input'));
    }
  }
});
