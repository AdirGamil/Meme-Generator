'use strict'

function rednerGallery() {
  let elGallery = document.querySelector('.main-gallery')
  let imgs = gImgs

  const strHTMLS = imgs.map((img) => {
    return `
    
            <img
            data-img-id="${img.id}"
            src="img/${img.id}.jpg"
            alt="${img.id}"
            onclick="onImgSelect(this)"
            ></img>
            `
  })

  elGallery.innerHTML = strHTMLS.join('')
}

function onImgSelect(elImg) {
  const selectedImgId = +elImg.dataset.imgId
  gMeme.selectedImgId = selectedImgId
  renderMeme()
}

function addNewImg(img) {
  return createNewImg(img)
}
