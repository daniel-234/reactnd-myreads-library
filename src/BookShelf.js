import React, { Component } from 'react'
import Shelf from './Shelf'
import { Link } from 'react-router-dom'

// The BookShelf Component renders our bookshelf on the page. There are
// 3 shelves to be rendered, each one as a 'Shelf' Component.
class BookShelf extends Component {
  // Call the `onMoveBook` in its props.
  handleShelf = (s, book) => {
    this.props.onMoveABook(s, book);
  }

  // // Call the `deleteScreen` props to empty the array that stores the results
  // // from the API call after the user made a query.
  // emptyScreen() {
  //   this.props.deleteScreen();
  // }

  // Call function `onClearScreen()` in parent Component to
  // clear the search results page.
  clearSearchPage = () => {
    this.props.onClearScreen();
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
          {/*
            Add an onCLick event to clear the search page screen as a user is
            taken back to the main page.
            A new action to add a book by the user is supposed to take him/her
            to a clear search page.
          */}
          <Link
            to="/search"
            className="add-book"
            onClick={this.clearSearchPage}
          >Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BookShelf