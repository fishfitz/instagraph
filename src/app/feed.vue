<template>
  <div>
    <h1 class="page-title"> 🖼️ {{ data.name }} </h1>
    <div class="sm-viewcng" style="background: var(--ac-box-2);">
      <div v-html="navigation" class="sm-navilist"/>
    </div>

    <div class="profile">
      <span :style="{ backgroundImage: `url('${data.avatar}')` }" class="small-round-image"/>
      <div>
        <h1>
          {{ data.name }}
          <a v-if="data.author === getActiveUser()" :href="editLink(data.feedId)"> ✏️ </a>
        </h1>
        <p v-html="data.bio"/>
      </div>
    </div>

    <a v-if="data.author === getActiveUser()" class="new-post" :href="newPost">
      ➕ Ajouter une nouvelle image
    </a>

    <div class="publications">
      <div
        v-for="post in data.posts"
        :style="{ backgroundImage: `url('${post.image}')` }"
        @click="activePost = post">
        <span> 🗨️ {{ post.comments.length }} </span>
      </div>
    </div>

    <div v-if="activePost" class="active-post" @click="activePost = null">
      <div @click.stop>
        <div :style="{ backgroundImage: `url('${activePost.image}')` }" class="active-post-image"/>
        <div class="active-post-text">
          <h1>
            <span :style="{ backgroundImage: `url('${activePost.avatar}')` }" class="small-round-image"/>
            {{ activePost.name }}
          </h1>
          <p v-if="activePost.text">
            <span :style="{ backgroundImage: `url('${activePost.avatar}')` }" class="small-round-image"/>
            <b> {{ activePost.name }} </b> <a v-if="activePost.author === getActiveUser()" :href="editLink(activePost.id)"> ✏️ </a>
            <br/>
            <span v-html="activePost.text"/>
          </p>
          <p v-for="comment in activePost.comments">
            <span :style="{ backgroundImage: `url('${comment.avatar}')` }" class="small-round-image"/>
            <b> {{ comment.name }} <a v-if="comment.author === getActiveUser()" :href="editLink(comment.id)"> ✏️ </a> </b>
            <br/>
            <span v-html="comment.text"/>
          </p>
          <a v-if="getActiveUser()" class="answer" :href="activePostAnswer">
            Ajouter un commentaire
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getActiveUser } from '../data/scrapper'

const props = defineProps(['data', 'navigation'])

const activePost = $ref(null)
const activePostAnswer = $computed(() => `/post?t=${props.data.id.replace('t', '')}&mode=reply&payload=${
    `@answer(${activePost.id})@name(${getActiveUser()})@avatar()`
  }`)
const newPost = $computed(() => `/post?t=${props.data.id.replace('t', '')}&mode=reply&payload=${
    '@post()@image()'
  }`)

const editLink = (id) => `/post?p=${id.replace('p', '')}&mode=editpost`
</script>

<style lang="scss" scoped>
.profile {
  margin-bottom: 30px;
  border-bottom: var(--ac-border);
  text-align: center;

  div {
    display: inline-block;
  }

  .small-round-image {
    width: 150px;
    margin: 20px;
  }

  h1 {
    font-weight: normal;
  }

  p {
    display: inline-block;
  }
}

.new-post {
  display: block;
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 30px;
  border-bottom: var(--ac-border);
}

.publications {
  margin-left: 10%;
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  div {
    aspect-ratio: 1 / 1;
    width: 30%;
    max-width: 250px;
    display: table;
    background-size: cover;
    background-position: center center;
    cursor: pointer;

    span {
      opacity: 0;
      background-color: rgba(0, 0, 0, .7);
      display: table-cell;
      width: 100%;
      height: 100%;
      color: white;
      font-size: 16pt;
      vertical-align: middle;
      text-align: center;
    }

    &:hover span {
      opacity: 1;
      transition: opacity .3s;
    }
  }
}

.active-post {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);

  > div {
    margin: 10%;
    background-color: white;
    position: relative;

    .active-post-image {
      display: inline-block;
      width: 70%;
      aspect-ratio: 1 / 1;
      background-color: black;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
    }

    .active-post-text {
      display: inline-block;
      width: 30%;
      max-height: 100%;
      vertical-align: top;
      overflow: auto;

      h1 {
        border-bottom: 1px solid var(--ac-box-1);
        font-size: 11pt;
        color: black;
      }

      p {
        color: black;
        font-size: 11pt;

        span:not(.small-round-image) {
          margin-left: 70px;
          margin-top: -25px;
          display: inline-block;
        }
      }

      .answer {
        display: block;
        border-top: 1px solid var(--ac-box-1);
        color: var(--color-1);
        text-align: center;
        padding-top: 10px;
      }
    }
  }
}

.small-round-image {
  display: inline-block;
  aspect-ratio: 1 / 1;
  border-radius: 9999%;
  width: 40px;
  margin: 15px;
  vertical-align: middle;
  background-size: cover;
  background-position: center center;
}

::v-deep .hashtag {
  color: var(--color-1);
}
</style>
