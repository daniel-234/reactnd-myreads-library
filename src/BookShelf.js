import React, { Component } from 'react'

// The BookShelf Component render our bookshelf on the page. There are
// 3 shelves to be rendered, each one as a 'Shelf' Component.
function BookShelf(props) {
	return (
		<div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <Shelf title="Currently Reading" shelf="currentlyReading" books={props.books} />
        <Shelf title="Want To Read" shelf="wantToRead" books={props.books} />
        <Shelf title="Read" shelf="read" books={props.books} />
      </div>
    </div>
	)
}

// The 'Shelf' Component renders a shelf on the page. Its properties are a title,
// a shelf to be inserted on to be chosen among 'currentlyReading',
// 'wantToRead' and 'read' and an array of books objects.
// Each book in the shelf will be displayed as an item of an ordered list.
function Shelf(props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.filter((book) => (
            book.shelf === props.shelf
            )).map((book) => (
              console.log(book.title),

              <li key={book.id}>
                <Book book={book} />
              </li>
            )
          )}
        </ol>
      </div>
    </div>
  )
}

// The 'Book' Component has a 'book' property which is one of the object
// items returned by the API.
function Book(props) {
  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{
          width: 128, height: 193, backgroundImage: `url(${props.book.imageLinks.smallThumbnail})`
        }}/>
        <div className="book-shelf-changer">
          <SelectList shelf={props.book.shelf} />
        </div>
      </div>
      <div className="book-title">{props.book.title}</div>
      <div className="book-authors">{props.book.authors[0]}</div>
    </div>
  )
}

// Define a Class Component for the drop-down list that shows the shelf
// the current book should be in. The Component has a state that can be
// changed by the user to move the book it refers to to another shelf.
class SelectList extends Component {
  // Pass `props` to the base constructor. As reported in the React Docs,
  // Class Components should always call the base constructor with `props`.
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.shelf
    };
  }

  // Change the Class Component state if the user chooses a new one.
  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  render() {
    return (
      // React, instead of using the HTML `selected` attribute, uses
      // a `value` attribute on the root `select` tag.
      // Reference 'https://facebook.github.io/react/docs/forms.html'.
      <select value={this.state.value} onChange={this.handleChange}>
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