import React, { Component } from 'react'

function BookShelf(props) {
	return (
		<div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
              	{props.books.filter((book) => (
              		book.shelf === 'currentlyReading'
              		)).map((book) => (
              			console.log(book.title),

              			<li key={book.id}>
  	                  <div className="book">
  	                    <div className="book-top">
  	                      <div className="book-cover" style={{
                            width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                          }}/>

  	                      <div className="book-shelf-changer">
  	                        <select>
  	                          <option value="none" disabled>Move to...</option>
  	                          <option value="currentlyReading">Currently Reading</option>
  	                          <option value="wantToRead">Want to Read</option>
  	                          <option value="read">Read</option>
  	                          <option value="none">None</option>
  	                        </select>
  	                      </div>
  	                    </div>
  	                    <div className="book-title">{book.title}</div>
  	                    <div className="book-authors">{book.authors[0]}</div>
  	                  </div>
  	                </li>
                  )
                )}
              </ol>
            </div>
          </div>
        </div>

          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {props.books.filter((book) => (
                  book.shelf === 'wantToRead'
                  )).map((book) => (
                    console.log(book.title),

                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{
                            width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                          }}/>

                          <div className="book-shelf-changer">
                            <select>
                              <option value="none" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors[0]}</div>
                      </div>
                    </li>
                  )
                )}
              </ol>
            </div>
          </div>

          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {props.books.filter((book) => (
                  book.shelf === 'read'
                  )).map((book) => (
                    console.log(book.title),

                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{
                            width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                          }}/>

                          <div className="book-shelf-changer">
                            <select>
                              <option value="none" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors[0]}</div>
                      </div>
                    </li>
                  )
                )}
              </ol>
            </div>
          </div>

        </div>
      </div>
	)
}

export default BookShelf