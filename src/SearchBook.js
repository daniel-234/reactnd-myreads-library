import React, { Component } from 'react'
import Book from './Book.js'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'

class SearchBook extends Component {
	constructor(props) {
		super(props);
		this.state = {
			query: ''
		};

		// Bindings to make `this` work in the callback.
		this.handleChange = this.handleChange.bind(this);
		this.handleBooks = this.handleBooks.bind(this);
	}

	// Update the Component state passing in the query string
	// and call a method in props to search the database for results.
	handleChange = (query) => {
		// Update the state.
		this.setState({
			query: query
		});

		// Trim off any extra spaces around the query string
		// and pass the value to the `searchBook` method in
		// the App Component.
		// The `trim` method makes strings like 'King  ' or
		// '  King  ' be the same as 'King', so the API gets
		// passed a value that can match one that is accepted.
		// To get the list of the available search terms, look
		// at [Search Terms](https://github.com/daniel-234/
		// reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md) .
		this.props.onSearchAPI(query.trim());

		// Clear the search screen if query is the empty screen.
		if (query === '') {
			this.clearSearchPage();
		}
	}

	// Call function `onClearScreen()` in parent Component to
	// clear the search results page.
	clearSearchPage = () => {
		this.props.onClearScreen();
	}

	// Insert book in the library at shelf s.
  handleBooks(s, book) {
    this.props.onMoveToShelf(s, book);
  }

	render() {
		let showingSearchBooks
		// Assign the searched books stored in the BooksApp Component state to
		// a new array variable which we'll then sort.
		showingSearchBooks = this.props.searchedBooks

		// Sort the books returned by the database in order by book title.
		showingSearchBooks.sort(sortBy('title'))

		return (
			<div className="search-books">
        <div className="search-books-bar">
        	{/*
            Add an onCLick event to clear the search page screen as a user is
            taken back to the main page.
            A new action to add a book by the user is supposed to take him/her
            to a clear search page.
          */}
          <Link
          	to="/"
          	className="close-search"
          	onClick={this.clearSearchPage}
          >Close</Link>
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
            	type="text"
            	placeholder="Search by title or author"
            	value={this.state.query}
            	onChange={(event) => this.handleChange(event.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          	{/*
							If the API returns a list of books, place them in the page.
          	*/}
          	{showingSearchBooks.length > 0 && showingSearchBooks.map((book) => (
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