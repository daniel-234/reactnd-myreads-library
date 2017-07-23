import React from 'react'
import BookShelf from './BookShelf'
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
    showSearchPage: true,
    books: [],
    items: []
  }

  moveToAnotherShelf = (v, book) => {
    console.log(v);
    console.log(book.title);

    this.setState((state) => ({
      books: state.books.map(function(b) {
        if (b.title === book.title) {
          b.shelf = v;
          return b;
        } else {
          return b;
        }
      })
    }))

    // books: this.state.books.map((b) => (
    //   b.title

      // console.log(b.title),
      // b.title === book.title ? {b.shelf = event.target.value; return b} : {return b}

      // return b.shelf
      // console.log(b.title),
      // console.log(this.state.items)
    // ))

    // this.setState({ books: books })
  }

  // console.log('Y, clicked:', b.title) : console.log('N')))

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books);
      this.setState({ books });
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div>
            <BookShelf books={this.state.books} onMoveABook={this.moveToAnotherShelf} />
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
