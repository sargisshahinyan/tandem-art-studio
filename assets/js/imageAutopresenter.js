Array.prototype.slice.call(document.querySelectorAll('input[type="file"][accept="image/*"]')).forEach(function (element) {
  var img = new Image();
  img.style.display = 'none';

  if (element.nextElementSibling) {
    element.parentElement.insertBefore(img, element.nextElementSibling);
  } else {
    element.parentElement.appendChild(img);
  }

  element.addEventListener('change', function () {
    convertFileToImage(element.files[0])
      .then(function (src) {
        img.style.display = 'block';
        img.src = src;
      })
      .catch(function (err) {
        console.log(err);
        img.style.display = 'none';
        img.src = '';
      })
  });
});
