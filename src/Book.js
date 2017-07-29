import React, { Component } from 'react'
import SelectList from './SelectList.js'

// The 'Book' Component has a 'book' property which is one of the object
// items returned by the API.
class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props
    };
  }

  // Call the `onMove` function in its props.
  changeShelf = (s, book) => {
    this.props.onMove(s, book);
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{
            width: 128, height: 193, backgroundImage: `url(${this.state.value.book.imageLinks.smallThumbnail})`
          }}/>
          <div className="book-shelf-changer">
            <SelectList book={this.state.value.book} onChangeShelf={this.changeShelf} />
          </div>
        </div>
        <div className="book-title">{this.state.value.book.title}</div>
        <div className="book-authors">
          {/*
            Loop over the authors array and display each of its elements as a separate div.
          */}
          {this.state.value.book.authors.map((a) => (
            <div key={a}>
              {a}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Book