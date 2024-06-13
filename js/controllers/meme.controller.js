'use strict'

let gElCanvas
let gCtx

function onInit() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')

  renderMeme()
}

function renderMeme() {
  const imgUrl = gImgs[0].url
  const img = new Image()
  img.src = imgUrl

  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

    gCtx.font = '40px Arial'
    gCtx.fillStyle = 'white'
    gCtx.strokeStyle = 'black'
    gCtx.textAlign = 'center'

    const text = 'Your Meme Text'
    gCtx.fillText(text, gElCanvas.width / 2, 50) 
    gCtx.strokeText(text, gElCanvas.width / 2, 50)
  }
}
