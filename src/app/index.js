import { instaData } from '../data'
import { createApp, h } from 'vue'
import feed from './feed.vue'

export default async () => {
  const data = await instaData()
  if (document.body.innerHTML.indexOf(/@instagraph/) !== -1) {
    document.body.innerHTML = document.body.innerHTML.replace(/@instagraph/g, '🖼️')
  }

  if (!data) return

  const navigation = document.querySelector('.sm-navilist').innerHTML
  document.getElementById('main-content').innerHTML = ''

  createApp({
    render: () => h(feed, { data, navigation })
  }).mount('#main-content')
}
