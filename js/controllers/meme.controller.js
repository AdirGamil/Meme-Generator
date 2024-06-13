'use strict'

let gElCanvas
let gCtx

function onInit() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')

  renderMeme()
  rednerGallery()
}

function renderMeme() {
  const meme = getMeme()
  const imgId = meme.selectedImgId
  const imgRender = gImgs.find((img) => img.id === imgId)
  if (!imgRender) return

  const imgUrl = imgRender.url
  const img = new Image()
  img.src = imgUrl

  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

    meme.lines.forEach((line) => {
      gCtx.font = `${line.size}px ${gFontFamily}`
      gCtx.fillStyle = line.color
      gCtx.strokeStyle = gStrokeColor
      gCtx.textAlign = 'center'

      const x = gElCanvas.width / 2
      const y = 50

      gCtx.fillText(line.txt, x, y)
      gCtx.strokeText(line.txt, x, y)
      drawTxtOnMeme()
    })
  }
}

function onTextInputChange(event) {
  const newText = event.target.value
  setLineTxt(newText)
  renderMeme()
}


function coverCanvasWithImg(elImg) {
  gElCanvas.height =
    (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}


function onDownloadCanvas(elLink) {
  const dataUrl = gElCanvas.toDataURL()
  elLink.href = dataUrl
  elLink.download = 'my-img'
}

function onIncreaseFontSize() {
  const meme = getMeme()
  meme.lines[meme.selectedLineIdx].size += 5
  renderMeme()
}

function onDecreaseFontSize() {
  const meme = getMeme()
  meme.lines[meme.selectedLineIdx].size -= 5
  renderMeme()
}

