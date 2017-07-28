import React, { Component } from 'react'
import Book from './Book.js'
import { Link } from 'react-router-dom'

class SearchBook extends Component {
	constructor(props) {
		super(props);
		this.state = {
			query: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleBooks = this.handleBooks.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log(this.state.query);
		console.log(this.props);

		if (this.props.onSearchAPI) {
			// Trim off any extra spaces around the query string.
			// This method makes strings like 'King  ' or '  King  '
			// be the same as 'King', that is the exact value the
			// API wants to return a result for the query 'King'.
			this.props.onSearchAPI(this.state.query.trim());
		}
	}

	handleChange(event) {
		this.setState({
			query: event.target.value
		});
	}

	// Call the `deleteScreen` props to empty the array that stores the results
	// from the API call after the user made a query.
	emptyScreen() {
		this.props.deleteScreen();
	}

	// Call the `onMoveBooks` function in its props.
  handleBooks(s, book) {
    this.props.onMoveToShelf(s, book);
    // console.log(s);
    // console.log(book);
    // console.log(this.searchedBooks);
    // this.props.params.searchedBooks.push(book);
    // console.log(this.props.params);
  }

	render() {
		return (
			<div className="search-books">
        <div className="search-books-bar">
          <Link
          	to="/"
          	className="close-search"
          	onClick={this.emptyScreen}
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
	            <input
	            	className="search-books-input"
	            	type="text" value={this.state.query}
	            	placeholder="Search by title or author"
	            	value={this.state.query}
	            	onChange={this.handleChange} />
	           </div>
          </form>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          	{this.props.searchedBooks.length > 0 && this.props.searchedBooks.map((book) => (
              <li key={book.id}>
                <Book book={book} onMove={this.handleBooks} />
              </li>
            ))}
          </ol>

        </div>
      </div>
		)
	}
}

export default SearchBook