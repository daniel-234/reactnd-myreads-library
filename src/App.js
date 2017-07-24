import React from 'react'
import BookShelf from './BookShelf'
import SearchBook from './SearchBook'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    // showSearchPage: true,

    books: []
  }

  // Move the given book to shelf s when invoked by a user action
  // on the `select` button in given book.
  moveToAnotherShelf = (s, book) => {
    // console.log(s);
    // console.log(book.title);

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

  // Change state to show shelf page.
  // showBookShelves = () => (
  //   this.setState({ showSearchPage: false })
  // )

  // Lifecycle Event that fetches the data from the API.
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books);
      this.setState({ books });
    })
  }

  // onNavigate = () => (
  //   this.setState({ showSearchPage: true })
  // )

  // Render screen based on state.
  render() {
    return (
      <div className="app">

        <Route exact path="/" render={() => (
          <div>
            <BookShelf books={this.state.books} onMoveABook={this.moveToAnotherShelf} />

          </div>
        )} />
        <Route path="/add" component={SearchBook} />
      </div>

        // {this.state.showSearchPage ? (
        //   <SearchBook backToBooks={this.showBookShelves} />
        // ) : (
          // <div>
          //   <BookShelf books={this.state.books} onMoveABook={this.moveToAnotherShelf} />
          //   <div className="open-search">
          //     <Link
          //       to="/add"
          //       // onClick={() => this.setState({ showSearchPage: true })}
          //       className="add-book"
          //     >Add a book</Link>
          //   </div>
          // </div>
        // )}
      // </div>
    )
  }
}

export default BooksApp
