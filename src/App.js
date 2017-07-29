import React from 'react'
import BookShelf from './BookShelf'
import SearchBook from './SearchBook'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import sortBy from 'sort-by'
import './App.css'

class BooksApp extends React.Component {
  state = {
    // Array to store the books in our library.
    books: [],
    // Array to store the books retrieved from the API query by a user.
    searchedBooks: [],
    queryValue: ''
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
          // Update our library assigning the new shelf property to the
          // given book, so changes would persist between sessions.
          BooksAPI.update(book, s);
          return b;
        } else {
          // Do nothing otherwise.
          return b;
        }
      })
    }))
  }

  // Insert the given book `queryBook` in the library, assigning it the given shelf.
  insertInLibrary(shelf, queryBook) {
    // Control variable set to false if the book is not yet in the
    // library (default value); true otherwise.
    let inLibrary = false;
    // Loop over the books array.
    this.state.books.map((b) => (
      // Change the value of the sentinel variable if the library is
      // already stored in the library.
      (b.title === queryBook.title) ?
        inLibrary = true : inLibrary
    ))

    // Check if the book is not yet in the library.
    if (inLibrary === false) {
      // Update the API and insert `queryBook` in the library.
      BooksAPI.update(queryBook, shelf).then(
        // Pass the Promise a request to the API to get the updated books collection.
        BooksAPI.getAll().then((books) => {
          // Give the state books array the result returned by the API.
          this.setState({ books });
        })
      )
    }
  }

  // Display the search results returned from the query by the user.
  searchBook(searchTerm) {
    // Assign the query string to `queryValue`.
    this.setState({
      queryValue: searchTerm
    })

    // Check if the string query has a value different from the empty string.
    if (searchTerm !== '') {
      // If a search term is given, query the database passing that term in.
      BooksAPI.search(searchTerm, 20).then((results) => {
        // Check if the JSON object returned by the Promise is not empty.
        // Then perform all the operations needed to display the books list
        // returned from querying the database.
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
            if (titlesArray.indexOf(bookTitle) === -1) {
              // Insert the unique title.
              titlesArray.push(bookTitle);
              // Insert the unique book object.
              uniqueArray.push(results[i]);
            }
          }

          // Check that the book object has an image and authors to display.
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
                  // Assign it shelf it already has in the library.
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
        // If theJSON object returned by the promise is empty, assign an empty array to the state.
        } else {
          this.setState({ searchedBooks: [] })
        }
      })
    // If there is not a search term or if the user has deleted it, assign an empty array to the
    // searchedBooks state and display nothing in the search screen.
    } else {
      this.setState({ searchedBooks: [] })
    }
  }

  // Lifecycle Event that fetches the data from the API.
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    })
  }

  // Clear the search results page, assigning an empty value to both
  // the `searchedBooks` array and the `queryValue` string in state.
  clearSearchResults = () => {
    this.setState((state) => ({
      searchedBooks: []
    }))

    this.setState({
      queryValue: ''
    })
  }

  // Render screen based on state.
  render() {
    // Sort books by book title.
    this.state.books.sort(sortBy('title'))

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
        {/*
          Pass the `searchedBooks` array to the child Component SearchBook if there
          is a valid query. Pass the empty array if the query string value is emtpy.
          This is a hack needed to prevent the search screen from displaying results
          after a user had deleted a previously typed query string and only happened
          when the typing and deleting were too fast.
          This is probably due to the API being queried that isn't able to respond to
          a fast typing and to a subsequent fast stream of requests.
        */}
        <Route path="/search" render={({ history }) => (
          <SearchBook
            searchedBooks={this.state.queryValue !== '' ? this.state.searchedBooks : []}
            onSearchAPI={(searchString) => {
              this.searchBook(searchString)
            }}
            onMoveToShelf={(s, b) => {
              this.insertInLibrary(s, b)
              history.push('/')
            }}
            onClearScreen={this.clearSearchResults}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
