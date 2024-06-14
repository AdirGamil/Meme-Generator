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
      color: 'red',
      x: null,
      y: 50,
    },
  ],
}

function getMeme() {
  return gMeme
}

function setLineTxt(txt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = txt
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

function addNewLine() {
  var newLine = {
    txt: 'And it tastes great!',
    size: 40,
    color: 'blue',
    x: null,
    y: 500,
  }
  gMeme.lines.push(newLine)
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

function deleteLine(){
  if(gMeme.selectedLineIdx < 0) return
  const selectedLine = getSelectedLineIdx()
  gMeme.lines.splice(selectedLine, 1)
  gMeme.selectedLineIdx--
  if (!gMeme.lines.length) gMeme.selectedLineIdx = - 1
}
