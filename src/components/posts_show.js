import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPost, deletePost } from '../actions'
import { Link } from 'react-router-dom'

class PostsShow extends Component {

  componentDidMount() {
    // Basic Caching - if post already exists in props, then don't make network request!
    if (!this.props.post) {
      // get url of this route, provided directly by react router
      // react router gives us match, params contains all the wildcard values that exist in the url
      const id = this.props.match.params.id
      // call action creator to fetch post
      this.props.fetchPost(id)
    }
  }

  // user wants to delete post
  onDeleteClick() {
    const id = this.props.match.params.id
    // call action creator to delete post, also takes callback which we use to navigation
    this.props.deletePost(id, () => {
      // go home
      this.props.history.push('/')
    })
  }

  render() {
    // destructure out relevant post
    const { post } = this.props
    // initial render where post hasn't been fetched
    if (!post) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <Link to="/" className="btn btn-primary">Back</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

// MAPSTATETOPROPS HAS A SECOND ARGUMENT
// called ownProps
// so mapStateToProps is given all the props of the component as an argument before it runs
// ownProps === this.props!!!!!
const mapStateToProps = (state, ownProps) => {
  return {
    post: state.posts[ownProps.match.params.id]
  }
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow)
