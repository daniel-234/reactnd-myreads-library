import React, { Component } from 'react'

// Define a Controlled Component for the drop-down list that shows the shelf
// the current book should be in.
class SelectList extends Component {
  // Pass `props` to the base constructor. As reported in the React Docs,
  // Class Components should always call the base constructor with `props`.
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback (see
    // React Docs).
    this.handleChange = this.handleChange.bind(this);
  }

  // Change the Class Component state if the user chooses a new one.
  // Call the `onChangeShelf` function in props, passing the value of
  // the event target and the current book as arguments.
  handleChange(event) {
    // Only perform the action if the value of the event target is
    // different from 'moveTo'.
    if (event.target.value !== 'moveTo') {
      this.props.onChangeShelf(event.target.value, this.props.book);
    }
  }

  render() {
    return (
      // React, instead of using the HTML `selected` attribute, uses
      // a `value` attribute on the root `select` tag.
      // Reference 'https://facebook.github.io/react/docs/forms.html'.
      <select value={this.props.book.shelf} onChange={this.handleChange} >
        <option value="moveTo">Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    )
  };
}

export default SelectList