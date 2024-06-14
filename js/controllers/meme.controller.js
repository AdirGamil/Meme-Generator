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

    meme.lines.forEach((line, idx) => {
      gCtx.font = `${line.size}px ${gFontFamily}`
      gCtx.fillStyle = line.color
      gCtx.strokeStyle = gStrokeColor
      gCtx.textAlign = 'center'

      const x = line.x || gElCanvas.width / 2
      const y = line.y

      gCtx.fillText(line.txt, x, y)
      gCtx.strokeText(line.txt, x, y)
      drawTxtOnMeme()

      if (idx === getSelectedLineIdx()) {
        const textWidth = gCtx.measureText(line.txt).width
        const padding = 10
        gCtx.lineWidth = 2
        gCtx.strokeStyle = 'white'
        gCtx.strokeRect(
          x - textWidth / 2 - padding,
          y - line.size + 5,
          textWidth + padding * 2,
          line.size + padding * 2
        )
      }
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

function onAddLine() {
  addNewLine()
  renderMeme()
}

function onSwitchLine() {
  setSwitchLine()
  renderMeme()
}
function onDeleteLine() {
  deleteLine()
  renderMeme()
}

function onUploadImg() {
  const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

  function onSuccess(uploadedImgUrl) {
    const url = encodeURIComponent(uploadedImgUrl)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
  }

  doUploadImg(imgDataUrl, onSuccess)
}
