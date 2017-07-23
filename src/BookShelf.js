import React, { Component } from 'react'

// The BookShelf Component render our bookshelf on the page. There are
// 3 shelves to be rendered, each one as a 'Shelf' Component.
class BookShelf extends Component {
  constructor(props) {
    super(props);
  }

  handleShelf = (v, book) => {

    this.props.onMoveABook(v, book);

    // These two work
    // console.log(book.title);
    // console.log(event.target.value);
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
      </div>
    )
  }
}

// The 'Shelf' Component renders a shelf on the page. Its properties are a title,
// a shelf to be inserted on to be chosen among 'currentlyReading',
// 'wantToRead' and 'read' and an array of books objects.
// Each book in the shelf will be displayed as an item of an ordered list.
class Shelf extends Component {
  constructor(props) {
    super(props);
  }

  handleBooks = (v, book) => {
    // These two work
    // console.log(event.target.value);
    // console.log(book.title);


    this.props.onMoveBooks(v, book);
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
                console.log(book.title),

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

  // changeShelf = (() => {
  //   this.setState(() => ({
  //     console.log('Ciao')
  //   }))
  // })

  // handleChange(event) {
  //   this.setState({
  //     value: event.target.value
  //   });
  // }


  changeShelf = (v, book) => {
    // These two work
    // console.log(book.title);
    // console.log(event.target.value);
    this.props.onMove(v, book);
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
// the current book should be in. The Component has a state that can be
// changed by the user to move the book it refers to to another shelf.
class SelectList extends Component {
  // Pass `props` to the base constructor. As reported in the React Docs,
  // Class Components should always call the base constructor with `props`.
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     value: this.props.shelf
  //   };
  // }

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  // Change the Class Component state if the user chooses a new one.
  handleChange(event) {
    this.props.onChangeShelf(event.target.value, this.props.book);

    // These two work
    // console.log(this.props.book.title);
    // console.log(event.target.value);
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


// <select value={this.state.value} onChange={() => this.props.onChangeShelf(event.target.value)} >


// <select value={this.props.shelf} onChange={() =>this.props.onChangeShelf(event.target.value)} >