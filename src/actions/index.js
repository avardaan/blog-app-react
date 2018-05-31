import axios from 'axios'

import { postsKey } from '../utilities/config'

const ROOT_URL = `http://reduxblog.herokuapp.com/api`

export const FETCH_POSTS = 'fetch_posts'

// fetch posts from API
export function fetchPosts() {

  const request = axios.get(`${ROOT_URL}/posts?key=${postsKey}`)

  return {
    type: FETCH_POSTS,
    payload: request
  }
}
