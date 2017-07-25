import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// The BookShelf Component renders our bookshelf on the page. There are
// 3 shelves to be rendered, each one as a 'Shelf' Component.
class BookShelf extends Component {
  // Call the `onMoveBook` in its props.
  handleShelf = (s, book) => {
    this.props.onMoveABook(s, book);
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
        <div className="book-authors">{this.state.value.book.authors[0]}</div>
      </div>
    )
  }
}

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
    this.props.onChangeShelf(event.target.value, this.props.book);
  }

  render() {
    return (
      // React, instead of using the HTML `selected` attribute, uses
      // a `value` attribute on the root `select` tag.
      // Reference 'https://facebook.github.io/react/docs/forms.html'.
      <select value={this.props.book.shelf} onChange={this.handleChange} >
        <option value="none">Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    )
  };
}

export default BookShelf