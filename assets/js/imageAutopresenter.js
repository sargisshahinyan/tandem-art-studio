Array.prototype.slice.call(document.querySelectorAll('input[type="file"][accept="image/*"]')).forEach(function (element) {
  var imgContainer = document.createElement('div');

  if (element.nextElementSibling) {
    element.parentElement.insertBefore(imgContainer, element.nextElementSibling);
  } else {
    element.parentElement.appendChild(imgContainer);
  }

  element.addEventListener('change', function () {
    var imageRequests = [];

    for (let i = 0; i < element.files.length; i++) {
      imageRequests.push(
        convertFileToImage(element.files[i])
      );
    }

    imgContainer.innerHTML = '';

    Promise.all(imageRequests)
      .then(function (sources) {
        sources.forEach(function (src) {
          var imageItem = document.createElement('div');
          imageItem.className = 'row';
          imageItem.style['min-height'] = '200px';
          imageItem.style.margin = '10px 0';
          var imageWrapper = document.createElement('div');
          imageWrapper.className = 'col-6';

          var img = new Image();
          img.src = src;
          img.className = 'img-fluid';
          imageWrapper.appendChild(img);
          imageItem.appendChild(imageWrapper);

          if (element.classList.contains('portfolio-images')) {
            var coordsTemplate = document.getElementById('img-coords');
            var coordsWrapper = coordsTemplate.content.cloneNode(true);

            var coordData = coordsWrapper.querySelectorAll('.coordData');
            coordsWrapper.querySelector('.sizes').addEventListener('change', function (e) {
              Array.from(coordData).forEach(function (el) {
                if (el.dataset.id === e.target.value) {
                  el.style.removeProperty('display');
                } else {
                  el.style.setProperty('display', 'none');
                }
              });
            });

            imageItem.appendChild(coordsWrapper);
          }

          imgContainer.appendChild(imageItem);
        });
      })
      .catch(console.log.bind(console));
  });
});
