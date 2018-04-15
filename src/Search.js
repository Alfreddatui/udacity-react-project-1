import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookComponent from './BookComponent';

class Search extends React.Component {
  state = {
    books: [],
    registeredBooks: [],
    timeout: null,
    error: false,
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ registeredBooks: books }));
  }

  addBook = (input) => {
    const { registeredBooks } = this.state;
    BooksAPI.search(input).then(response => {
      if (response.error) {
        this.setState({
          error: true,
        })
        return;
      }

      const data = response.map(book => {
        registeredBooks.forEach(registeredBook => {
          if (book.id === registeredBook.id) {
            book.shelf = registeredBook.shelf;
          }
        })
        return book;
      })

      this.setState({
        books: data,
        error: false,
      })
    })
  }

  updateQuery = (input) => {
    const { timeout } = this.state;
    clearTimeout(timeout);
    if (input === '') {
      this.setState({
        books: [],
        error: false,
      });
      return;
    };
    this.setState({
      timeout: setTimeout(() => {
        this.addBook(input);
      }, 350),
    });
  };

  changeShelf = (addBook, event) => {
    const { value } = event.target;
    BooksAPI.update(addBook, event.target.value).then(response => {
      this.setState(prevState => ({
        books: prevState.books.map(book => {
          if (book.id === addBook.id) {
            book.shelf = value;
          }
          return book;
        })
      }));
    })
  }

  render() {
    const { error } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={(event) => this.updateQuery(event.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              !error && this.state.books.map(book => {
                return <BookComponent key={book.id} book={book} onChangeShelf={(event) => this.changeShelf(book, event)}/>
              })
            }
            {
              error && 
              <li>
                No result found
              </li>
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default Search;