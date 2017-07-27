import React, { Component } from 'react'
import Book from './Book.js'
import SearchBook from './SearchBook.js'
import { Link } from 'react-router-dom'

// The BookShelf Component renders our bookshelf on the page. There are
// 3 shelves to be rendered, each one as a 'Shelf' Component.
class BookShelf extends Component {
  // Call the `onMoveBook` in its props.
  handleShelf = (s, book) => {
    this.props.onMoveABook(s, book);
    console.log(this.props);
  }

  // Call the `deleteScreen` props to empty the array that stores the results
  // from the API call after the user made a query.
  emptyScreen() {
    this.props.deleteScreen();
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <Shelf title="Currently Reading" shelf="currentlyReading" books={this.props.books} onMoveBooks={this.handleShelf} />
          <Shelf title="Want To Read" shelf="wantToRead" books={this.props.books} onMoveBooks={this.handleShelf} />
          <Shelf title="Read" shelf="read" books={this.props.books} onMoveBooks={this.handleShelf} />
        </div>
        <div className="open-search">
          <Link
            to="/add"
            className="add-book"
            onClick={this.emptyScreen}
          >Add a book</Link>
        </div>
      </div>
    )
  }
}

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

export default BookShelf