import React, { Component } from 'react'
import Book from './Book.js'

// The 'Shelf' Component renders a shelf on the page. Its properties are a title,
// a shelf to be inserted on to be chosen among 'currentlyReading', 'wantToRead'
// and 'read' and an array of books objects.
// Each book in the shelf will be displayed as an item of an ordered list.
class Shelf extends Component {
  // Call the `onMoveBooks` function in its props.
  handleBooks = (s, book) => {
    this.props.onMoveBooks(s, book);
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.filter((book) => (
              book.shelf === this.props.shelf
              )).map((book) => (
                <li key={book.id}>
                  <Book book={book} onMove={this.handleBooks} />
                </li>
              )
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf