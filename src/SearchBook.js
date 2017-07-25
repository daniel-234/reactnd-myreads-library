import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SearchBook extends Component {
	constructor(props) {
		super(props);
		this.state = {value: ''};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log(this.state.value);

		if (this.props.onSearchAPI) {
			this.props.onSearchAPI(this.state.value);
		}
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	render() {
		return (
			<div className="search-books">
        <div className="search-books-bar">
          <Link
          	to="/"
          	className="close-search"
          >Close</Link>
          <form onSubmit={this.handleSubmit} className="search-book-form">
          	<div className="search-books-input-wrapper">
	            {/*
	              NOTES: The search from BooksAPI is limited to a particular set of search terms.
	              You can find these search terms here:
	              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

	              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
	              you don't find a specific author or title. Every search is limited by search terms.
	            */}
	            <input type="text" value={this.state.value} placeholder="Search by title or author" onChange={this.handleChange} />
	           </div>
          </form>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>

          <ol className="books-grid">
            {this.props.searchedBooks.map((book) => (
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



export default SearchBook