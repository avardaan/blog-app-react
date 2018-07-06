import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'


class PostsNew extends Component {

  // passed in with argument field, which has event handlers to handle redux side
  // i.e. wire up
  renderField(field) {
    // giving the input {...field.input} is the same as doing
    // onChange={field.input.onChange}
    // onFocus={field.input.onFocus} etc etc saves a lot of time!
    // Also, any props given to the Field JSX component are passed onto the field object
    // i.e. field.label in our case
    // also the error object from validate is present here inside the meta object
    // so field.meta.error
    const { meta: { touched, error } } = field // nested destructuring. touched and error pulled out from meta object, which is pulled out of field object
    const className = `form-group ${touched && error ? 'has-danger' : ''}`
    return (
      <div className={className}>
        <label> {field.label} </label>
        <input className="form-control"
          type="text"
          {...field.input}
        />
        <div className={"text-help"}>
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  // form submission logic
  onSubmit(values) {
    console.log(values)
  }

  render() {
    // redux form passes this prop to this component
    const { handleSubmit } = this.props
    // form onSubmit, take the handleSubmit function and give it a function that runs the submission logic
    // if we just did onSubmit, we wouldn't have gone through redux-forms validation
    // process and we won't have any of the values from the field
    // handleSubmit is the connection between all the things we need from redux-form
    // and our own function that handles the submission logic
    // the handleSubmit function also gives our custom function the values object
    // so we can use the values submitted by the user
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
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
        <button type="submit" className="btn btn-primary"> Submit </button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
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
