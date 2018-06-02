import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'


class PostsNew extends Component {

  // passed in with argument field, which has event handlers to handle redux side
  // i.e. wire up
  renderField(field) {
    // giving the input {...field.input} is the same as doing
    // onChange={field.input.onChange}
    // onFocus={field.input.onFocus} etc etc saves a lot of time!
    // Also, any props given to the Field JSX component are passed onto the field object
    // i.e. field.label in our case
    return (
      <div className="form-group">
        <label> {field.label} </label>
        <input className="form-control"
          type="text"
          {...field.input}
        />
      </div>
    )
  }

  render() {
    return (
      <form>
        <Field
          name="title"
          component={this.renderField}
          label="Title"
        />
        <Field
          name="categories"
          component={this.renderField}
          label="Categories"
        />
        <Field
          name="content"
          component={this.renderField}
          label="Content"
        />
      </form>
    );
  }
}

// redux form function that is given the values object from redux-form
// so this object contains the properties title, categories and content
function validate(values) {
  // initalize errors object
  const errors = {}
  // validate inputs
  if (!values.title) {
    errors.title = "Enter a Title!"
  }
  if (!values.categories) {
    errors.categories = "Enter some Categories!"
  }
  if (!values.content) {
    errors.content = "Enter some Content!"
  }
  // return errors object
  return errors
}

export default reduxForm({
  validate: validate,
  form: 'PostsNewForm'
})(PostsNew)
