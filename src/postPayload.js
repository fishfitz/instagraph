import { isPostForm } from './data/scrapper'

export default () => {
  if (!isPostForm()) return

  const payload = (new URLSearchParams(window.location.search))
    ?.get('payload')
    ?.replace(/@/g, '\n@')
    ?.trim()

  if (!payload) return
  console.log(payload)

  window.addEventListener('load', () => {
    const editor = document.querySelector('#textarea_content > div.sceditor-container.ltr.sourceMode > textarea')
    editor.value = payload + '\n'
  })
}
