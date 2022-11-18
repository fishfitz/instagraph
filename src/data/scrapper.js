export const isPostForm = () => {
  return /\/post?/.test(window.location.href)
}

export const getActiveUser = () => {
  return document.querySelector('#logout')?.textContent
    ?.match(/\[(.+)\]/)?.[1]
    ?.trim() ||
    null
}

const getPostsData = async (id, page) => {
  const url = window.location.href.replace(/(\/t\d+)((p\d+)|-)/, page === 1
    ? `/${id}-`
    : `/${id}p${25 * (page - 1)}-`)
  const body = document.createElement('body')
  body.innerHTML = await (await fetch(url)).text()

  return [...body.querySelectorAll('div.post[id^="p"]')]
    .flatMap(post => ({
      author: post.querySelector('.postprofile-username')?.textContent,
      isAuthor: getActiveUser() === post.querySelector('.postprofile-username')?.textContent,
      avatar: post.querySelector('.postprofile-avatar img')?.src,
      text: post.querySelector('.postbody')?.textContent,
      id: post.querySelector('.mm-profile-icons li:first-child a')?.href?.match(/p=(\d+)/)?.[1]
    }))
    .filter(post => post.author)
}

export const getTopicData = async () => {
  const data = {}

  data.title = document.querySelector('.page-title').textContent
  data.author = document.querySelector('.postprofile-username').textContent
  data.isAuthor = getActiveUser() === data.author
  data.id = window.location.href.match(/(\/t\d+)((p\d+)|-)/)?.[1]?.slice(1)

  if (!data.id || data.title?.indexOf('@instagraph') !== 0) return

  data.pageCount = Number(document.querySelector('.pagination a')?.textContent
    ?.split('sur')?.[1]
    ?.trim()) || 1

  data.posts = []
  for (let page = 1; page <= data.pageCount; page++) {
    data.posts.push(...(await getPostsData(data.id, page)))
  }

  return data
}
