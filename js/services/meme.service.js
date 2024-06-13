'use strict'


let gFillColor = 'white'
let gStrokeColor = 'black'
let gFontSize = 40
let gFontFamily = 'myImpact'

let gImgs = [
  { id: 1, url: 'img/1.jpg', keywords: ['all', 'square', 'trump', 'man'] },
  { id: 2, url: 'img/2.jpg', keywords: ['all', 'square', 'dogs', 'cute'] },
  { id: 3, url: 'img/3.jpg', keywords: ['all', 'square', 'dogs', 'baby', 'cute', 'mood'] },
]

let gMeme = {
 selectedImgId: 1,
 selectedLineIdx: 0,
 lines: [
 {
 txt: 'I sometimes eat Falafel',
 size: gFontSize,
 color: 'white'
 }
 ]
}


function getMeme() {
  return gMeme
}

function setLineTxt(txt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function drawTxtOnMeme(){
  const textInput = document.querySelector('.meme-input')
  textInput.addEventListener('input', onTextInputChange)
}


function setTextColor(event) {
  const color = event.target.value
  gMeme.lines[gMeme.selectedLineIdx].color = color
  renderMeme()
}