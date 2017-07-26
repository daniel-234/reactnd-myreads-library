import React from 'react'
import BookShelf from './BookShelf'
import SearchBook from './SearchBook'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    // Array to store the books in our library.
    books: [],
    // Array to store the books retrieved from the API query by a user.
    searchedBooks: []
  }

  // Move the given book to shelf s when invoked by a user action
  // on the `select` button in given book.
  moveToAnotherShelf = (s, book) => {
    // Change the books property of the App state to reflect the change of
    // a shelf where book is in. This will trigger a re-render of the Component.
    this.setState((state) => ({
      books: state.books.map(function(b) {
        // Check if the title of the given book is equal to the one passed
        // as argument to the function.
        if (b.title === book.title) {
          // Change the book shelf property and return the book.
          b.shelf = s;
          return b;
        } else {
          // Do nothing otherwise.
          return b;
        }
      })
    }))
  }

  // Display the search results returned from the query by the user.
  searchBook(searchedBooks) {
    BooksAPI.search(searchedBooks, 20).then((results) => {
      console.log(results);

      // Check if the query is not empty.
      if (results.length > 0) {
        // Array to get rid of duplicate items from the query.
        const uniqueArray = [];
        // Array to store the titles of the unique items.
        const titlesArray = [];
        // Loop through the array resulting from querying the API.
        for (let i = 0; i < results.length; i++) {
          // Store the current book title.
          let bookTitle = results[i].title;
          // Check if the same title is not yet stored in the titles array.
          if (titlesArray.indexOf(bookTitle) == -1) {
            // Insert the unique title.
            titlesArray.push(bookTitle);
            // Insert the unique book object.
            uniqueArray.push(results[i]);
          }
        }

        // Check that the book object has an image to display.
        const booksList = uniqueArray.filter((b) => (
          b.imageLinks !== undefined &&
          b.authors !== undefined
        ))

        // Update the search screen state.
        this.setState((state) => ({
          // Iterate through the final books list to display to the user.
          searchedBooks: booksList.map(function(res) {
            // Put the current book out of its current shelf, if it has any assigned.
            res.shelf = 'none';
            // Iterate through our library.
            state.books.map(function(b) {
              // Check if the current book title is already there.
              if (res.title === b.title) {
                // Assign the equivalent shelf.
                res.shelf = b.shelf;
              }
              // After the shelf has been checked for correspondence between the query
              // list and the library, return the current book item in the query list.
              return res;
            })

            // Return the book in the query list.
            return res;
          })
        }))
      // If there are no results from the query, assign an empty array to the state.
      } else {
        this.setState({ searchedBooks: [] })
      }
    })
  }

  // Empty the query results.
  emptyQueryArray() {
    this.setState({
      searchedBooks: []
    })
  }

  // Lifecycle Event that fetches the data from the API.
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books);
      this.setState({ books });
    })
  }

  // Render screen based on state.
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div>
            <BookShelf
              books={this.state.books}
              onMoveABook={this.moveToAnotherShelf}
            />
          </div>
        )} />
        <Route path="/add" render={() => (
          <SearchBook
            searchedBooks={this.state.searchedBooks}
            onSearchAPI={(book) => {
              this.searchBook(book)
            }}
            deleteScreen={this.emptyQueryArray}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
