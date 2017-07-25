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
        </div>
      </div>
		)
	}
}

export default SearchBook