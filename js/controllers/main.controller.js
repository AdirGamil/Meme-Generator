'use strict'
function onChangeToSection(section) {
  let elSectionToHide1
  let elSectionToHide2

  const elEditor = document.querySelector('.main-meme-editor')
  const elGallery = document.querySelector('.main-gallery')
  const elAbout = document.querySelector('.main-about')

  switch (section) {
    case 'gallery':
      elSectionToHide1 = elEditor
      elSectionToHide2 = elAbout
      break
    case 'meme-editor':
      elSectionToHide1 = elGallery
      elSectionToHide2 = elAbout
      break
    case 'about':
      elSectionToHide1 = elEditor
      elSectionToHide2 = elGallery
      break
    default:
      console.error('Invalid section:', section)
      return
  }

  const elSectionToDisplay = document.querySelector(`.main-${section}`)

  if (elSectionToDisplay.style.display === 'grid') return

  elSectionToDisplay.style.display = 'grid'
  if (elSectionToHide1) elSectionToHide1.style.display = 'none'
  if (elSectionToHide2) elSectionToHide2.style.display = 'none'
}

function toggleMenu() {
  document.querySelector('.main-nav ul').classList.toggle('open')
}
