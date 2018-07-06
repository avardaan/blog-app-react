import {
  FETCH_POSTS,
  FETCH_POST,
  DELETE_POST
} from '../actions'
import _ from 'lodash'

export default function(state={}, action) {

  switch(action.type) {

    case FETCH_POST:
      // constant for post
      const post = action.payload.data
      /* ES5 way
      const newState = { ...state }
      newState[post.id] = post
      return newState
      */ // ES6 way
      // what is this [key]:value syntax?
      return { ...state, [post.id]: post }


    case FETCH_POSTS:
      // convert array of objects into object of objects with 'id' as the key of each of them
      // mapKeys maps the string you give as second argument to a key within the payload object
      // and creates a new object with that as the key and the object as its value
      return _.mapKeys(action.payload.data, 'id')

    //
    case DELETE_POST:
      // look at state object, if the state object has a key action.paylad (which is the post id), then remove the key-value pair
      return _.omit(state, action.payload)

    default:
      return state
  }
}
