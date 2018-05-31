import {
  FETCH_POSTS
} from '../actions'
import _ from 'lodash'

export default function(state={}, action) {
  
  switch(action.type) {

    case FETCH_POSTS:
      // convert array of objects into object of objects with 'id' as the key of each of them
      return _.mapKeys(action.payload.data, 'id')

    default:
      return state
  }
}
