'use strict'

var gImgs = [
  { id: 1, url: 'img/1.jpg', keywords: ['trump', 'men'] },
  { id: 2, url: 'img/2.jpg', keywords: ['puppys', 'love'] },
  { id: 3, url: 'img/3.jpg', keywords: ['puppys', 'baby'] },
  { id: 4, url: 'img/4.jpg', keywords: ['cat', 'sleep'] },
  { id: 5, url: 'img/5.jpg', keywords: ['baby', 'strong'] },
  { id: 6, url: 'img/6.jpg', keywords: ['tie', 'think'] },
  { id: 7, url: 'img/7.jpg', keywords: ['baby', 'surprise'] },
  { id: 8, url: 'img/8.jpg', keywords: ['think', 'hat'] },
  { id: 9, url: 'img/9.jpg', keywords: ['baby', 'devious'] },
  { id: 10, url: 'img/10.jpg', keywords: ['obama', 'laugh'] },
  { id: 11, url: 'img/11.jpg', keywords: ['fight', 'kiss'] },
  { id: 12, url: 'img/12.jpg', keywords: ['haim', 'you'] },
  { id: 13, url: 'img/13.jpg', keywords: ['cheers', 'leonardo'] },
  { id: 14, url: 'img/14.jpg', keywords: ['sunglasses', 'space'] },
  { id: 15, url: 'img/15.jpg', keywords: ['exactly', 'men'] },
  { id: 16, url: 'img/16.jpg', keywords: ['funny', 'starwars'] },
  { id: 17, url: 'img/17.jpg', keywords: ['putin', 'two'] },
  { id: 18, url: 'img/18.jpg', keywords: ['toystory', 'woodi'] },
]

function handleFileSelect(event) {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = function (readerEvent) {
    const img = new Image()
    img.onload = function () {
      const newImgId = addNewImg(img)
      setImg(newImgId)
      gMeme = createNewMeme(newImgId)
      coverCanvasWithImg(img)
      renderMeme()
    }
    img.src = readerEvent.target.result
  }
  reader.readAsDataURL(file)
}

function renderImg(img) {
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
  drawTxtOnMeme()
}

function createNewImg(img) {
  const newImgObj = {
    id: gImgs.length + 1,
    url: img.src,
    keywords: [],
  }

  gImgs.push(newImgObj)
  return newImgObj.id
}
