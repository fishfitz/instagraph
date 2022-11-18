import { getTopicData } from './scrapper'

const formatText = (text) => text
  .replace(/@name\(.*\)/, '')
  .replace(/@avatar\(.*\)/, '')
  .replace(/@image\(.*\)/, '')
  .replace(/@answer\(.*\)/, '')
  .replace(/@post\(.*\)/, '')
  .replace(/(#[^#\s]+)/g, '<a class="hashtag">$1</a>')
  .trim()

export const instaData = async () => {
  const topicData = await getTopicData()
  if (!topicData) return

  const instaData = {
    ...topicData,
    name: topicData.title.replace('@instagraph', '').trim(),
    avatar: topicData.posts[0].text.match(/@avatar\((.+?)\)/)?.[1] || topicData.posts[0].avatar,
    bio: formatText(topicData.posts[0].text),
    feedId: topicData.posts[0].id,
    posts: {}
  }

  // Create posts from messages that are posted by the topic author and have @post() in their body
  topicData.posts
    .filter((post) => post.author === topicData.author && /@post()/.test(post.text))
    .forEach(post => {
      instaData.posts[post.id] = {
        ...post,
        name: instaData.name,
        avatar: instaData.avatar,
        image: post.text.match(/@image\((.+?)\)/)?.[1],
        text: formatText(post.text),

        // Comment are messages having @answer(post.id) in their body
        comments: topicData.posts
          .filter(comment => comment.text.match(/@answer\((.+?)\)/)?.[1] === post.id)
          .map(comment => ({
            ...comment,
            name: comment.text.match(/@name\((.+?)\)/)?.[1] || comment.author,
            avatar: comment.text.match(/@avatar\((.+?)\)/)?.[1] || comment.avatar,
            text: formatText(comment.text)
          }))
      }
    })

  return instaData
}
