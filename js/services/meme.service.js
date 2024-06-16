'use strict'

let gFillColor = 'white'
let gStrokeColor = 'black'
let gFontFamily = 'myImpact'

let gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'I sometimes eat Falafel',
      size: 40,
      color: 'white',
      x: null,
      y: 50,
      align: 'center',
    },
  ],
}

function getMeme() {
  return gMeme
}

function setLineTxt(txt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setImg(imgId) {
  gMeme.selectedImgId = imgId
}

function getSelectedLineIdx() {
  return gMeme.selectedLineIdx
}

function drawTxtOnMeme() {
  const textInput = document.querySelector('.meme-input')
  textInput.addEventListener('input', onTextInputChange)
}

function setTextColor(event) {
  const color = event.target.value
  gMeme.lines[gMeme.selectedLineIdx].color = color
  renderMeme()
}

function setStrokeTextColor(event) {
  const color = event.target.value;
  gStrokeColor = color;
  renderMeme();
}

function addNewLine() {
  var newLine = {
    txt: 'And it tastes great!',
    size: 40,
    color: 'white',
    x: null,
    y: 500,
  }
  gMeme.lines.push(newLine)
}

function createNewMeme(imgId) {
  return {
    selectedImgId: imgId,
    selectedLineIdx: 0,
    lines: [
      {
        txt: 'I sometimes eat Falafel',
        size: 40,
        color: 'white',
        x: null,
        y: 50,
        align: 'center',
      },
    ],
  }
}

function setSwitchLine() {
  const selectedLine = getSelectedLineIdx()
  if (selectedLine === gMeme.lines.length - 1) {
    gMeme.selectedLineIdx = 0
  } else if (selectedLine < gMeme.lines.length - 1) {
    gMeme.selectedLineIdx++
  }
  console.log('gMeme.selectedLineIdx:', gMeme.selectedLineIdx)
}

function deleteLine() {
  if (gMeme.selectedLineIdx < 0) return
  const selectedLine = getSelectedLineIdx()
  gMeme.lines.splice(selectedLine, 1)
  gMeme.selectedLineIdx--
  if (!gMeme.lines.length) gMeme.selectedLineIdx = -1
}

function doUploadImg(imgDataUrl, onSuccess) {
  const formData = new FormData()
  formData.append('img', imgDataUrl)

  const XHR = new XMLHttpRequest()
  XHR.onreadystatechange = () => {
    if (XHR.readyState !== XMLHttpRequest.DONE) return
    if (XHR.status !== 200) return console.error('Error uploading image')
    const { responseText: url } = XHR

    console.log('Got back live url:', url)
    onSuccess(url)
  }
  XHR.onerror = (req, ev) => {
    console.error(
      'Error connecting to server with request:',
      req,
      '\nGot response data:',
      ev
    )
  }
  XHR.open('POST', '//ca-upload.com/here/upload.php')
  XHR.send(formData)
}

function canvasClick(ev) {
  const { offsetX, offsetY } = ev
  const meme = getMeme()
  let lineSelected = false

  meme.lines.forEach((line, idx) => {
    if (
      offsetX >= line.x - line.width / 2 &&
      offsetX <= line.x + line.width / 2 &&
      offsetY >= line.y - line.height &&
      offsetY <= line.y
    ) {
      meme.selectedLineIdx = idx
      lineSelected = true
    }
  })

  if (lineSelected) renderMeme()
}

function updateTextInput() {
  const meme = getMeme()
  const selectedLine = meme.lines[meme.selectedLineIdx]
  const elTextInput = document.querySelector('.meme-input')
  elTextInput.value = selectedLine.txt
}

function changeFontFamily(font) {
  const meme = getMeme()

  if (!meme) return

  const selectedLine = meme.lines[meme.selectedLineIdx]

  selectedLine.font = font === 'Impact' ? 'myImpact' : font
  gFontFamily = font
}

function getTextXPosition(align) {
  switch (align) {
    case 'left':
      return 0
    case 'center':
      return gElCanvas.width / 2
    case 'right':
      return gElCanvas.width
    default:
      return gElCanvas.width / 2
  }
}

function addKeyboardListeners() {
  document.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'ArrowUp':
        onArrowUp()
        break
      case 'ArrowDown':
        onArrowDown()
        break
      case 'ArrowRight':
        onArrowRight()
        break
      case 'ArrowLeft':
        onArrowLeft()
        break
    }
  })
}

function onArrowUp() {
  gMeme.lines[gMeme.selectedLineIdx].y -= 10
  renderMeme()
}

function onArrowDown() {
  gMeme.lines[gMeme.selectedLineIdx].y += 10
  renderMeme()
}

function onArrowRight() {
  gMeme.lines[gMeme.selectedLineIdx].x += 10
  renderMeme()
}

function onArrowLeft() {
  gMeme.lines[gMeme.selectedLineIdx].x -= 10
  renderMeme()
}
