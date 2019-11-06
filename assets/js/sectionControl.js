window.addEventListener('load', function () {
  var imageSections = document.getElementById('image-sections');
  var sectionTmp = document.getElementById('section-tmp');
  var imgInputTmp = document.getElementById('img-input-tmp');

  Array.from(document.querySelectorAll('.section')).forEach(_handleEvents);

  document.getElementById('add-section-btn').addEventListener('click', function () {
    var section = sectionTmp.content.cloneNode(true);
    var images = section.querySelector('.images');

    if (typeof window.autoPresentImages === 'function') {
      window.autoPresentImages(images.querySelector('input'));
    }

    _handleEvents(section.querySelector('.section'));

    imageSections.appendChild(section);
  });

  function _handleEvents(section) {
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

    section.querySelector('.delete').addEventListener('click', function () {
      section.parentNode.removeChild(section);
    });
  }
});