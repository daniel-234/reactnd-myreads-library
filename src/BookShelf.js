import React, { Component } from 'react'
import Book from './Book.js'
import Shelf from './Shelf'
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
            to="/search"
            className="add-book"
            onClick={this.emptyScreen}
          >Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BookShelf