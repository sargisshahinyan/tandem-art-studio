Array.prototype.slice.call(document.querySelectorAll('input[type="file"][accept="image/*"]')).forEach(autoPresentImages);

function autoPresentImages(element) {
  var imgContainer = element.parentElement.querySelector('.presenter-container');

  if (!imgContainer) {
    imgContainer = document.createElement('div');
    imgContainer.className = 'presenter-container';
  }

  if (element.nextElementSibling) {
    element.parentElement.insertBefore(imgContainer, element.nextElementSibling);
  } else {
    element.parentElement.appendChild(imgContainer);
  }

  element.addEventListener('change', function () {
    this.required = true;
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

          var img = new Image();
          img.src = src;
          img.className = 'img-fluid';
          imageWrapper.appendChild(img);
          imageItem.appendChild(imageWrapper);

          imgContainer.appendChild(imageItem);
        });
      })
      .catch(console.log.bind(console));
  });
}
