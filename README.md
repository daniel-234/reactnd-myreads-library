# MyReads: A Book Lending App

In this application, the main page displays a list of "shelves" (i.e. categories), each of which contains a number of books.
The three shelves are:
* Currently Reading
* Want to Read
* Read

Each book has a control that lets a user select the shelf for that book. A book will move to a different shelf if a user selects it from its control.
The main page also has a link to search new books. Books are retrieved from a backend server based on the user text input query and displayed on the page. A book can be added to the library by selecting the shelf it should move to from its control.
The backend server only accept a particular set of search terms, that can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md).

## Getting started

To launch the application (clone this repo and) download it locally, then install it with the command ```npm install``` and launch it with ```npm launch```.
The Front-End server on your local machine should be accessible on `localhost: 3000`.

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

### `getAll()`
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update(book, shelf)`
* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search(query, maxResults)`
* query: `<String>`
* maxResults: `<Integer>` Due to the nature of the backend server, search results are capped at 20, even if this is set higher.
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## create-react-app

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).

## Acknowledgements

* [Stackoverflow - Filtering JavaScript array of objects by property of an objects and removing duplicates](https://stackoverflow.com/questions/18656085/filtering-javascript-array-of-objects-by-property-of-an-object-and-removing-dupl)
