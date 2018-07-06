import axios from 'axios'

import { postsKey } from '../utilities/config'

const ROOT_URL = `http://reduxblog.herokuapp.com/api`

export const FETCH_POSTS = 'fetch_posts'
export const CREATE_POST = 'create_post'

// fetch posts from API
export function fetchPosts() {

  const request = axios.get(`${ROOT_URL}/posts?key=${postsKey}`)

  return {
    type: FETCH_POSTS,
    payload: request
  }
}

// async action to create post on database, also takes callback
export function createPost(values, callback) {
  // make http post request to db
  const request = axios.post(`${ROOT_URL}/posts?key=${postsKey}`, values)
  .then(() => {
    // AFTER http request has returned, run callback
    callback()
  })


  return {
    type: CREATE_POST,
    payload: request
  }
}
