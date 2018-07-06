import {
  FETCH_POSTS
} from '../actions'
import _ from 'lodash'

export default function(state={}, action) {

  switch(action.type) {

    case FETCH_POSTS:
      // convert array of objects into object of objects with 'id' as the key of each of them
      // mapKeys maps the string you give as second argument to a key within the payload object
      // and creates a new object with that as the key and the object as its value
      return _.mapKeys(action.payload.data, 'id')

    default:
      return state
  }
}
