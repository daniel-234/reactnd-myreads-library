import React from 'react'
import BookShelf from './BookShelf'
import SearchBook from './SearchBook'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
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

  searchBook(searchedBooks) {
    BooksAPI.search(searchedBooks).then((results) => {
      console.log(results);
      //  const result;
      if (results.length > 0) {
        const r = results.filter((b) => (
          b.imageLinks !== undefined
        ))
        console.log(r);
        // this.setState({ searchedBooks: r })

        this.setState((state) => ({
          searchedBooks: r.map(function(res) {

            res.shelf = 'none';

            state.books.map(function(b) {
              if (res.title === b.title) {
                console.log(res.title);
                res.shelf = b.shelf;
              }
            })

            return res;

          })
        }))
      } else {
        this.setState({ searchedBooks: [] })
      }
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
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
