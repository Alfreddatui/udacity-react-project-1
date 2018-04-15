import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Search from './Search';
import './App.css';
import Main from './Main';

class BooksApp extends React.Component {
  state = {
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ books }));
  }

  componentWillReceiveProps(nextProps){
    BooksAPI.getAll().then(books => this.setState({ books }));
  }

  changeShelf = (moveBook, event) => {
    const { value } = event.target;
    BooksAPI.update(moveBook, event.target.value).then(response => {
      this.setState(prevState => ({
        books: prevState.books.map(book => {
          if (book.id === moveBook.id) {
            book.shelf = value;
          }
          return book;
        })
      }));
    })
  }

  render() {
    return (
      <div className="app">
      <Route
        exact
        path="/"
        render={() => (
          <Main books={this.state.books} changeShelf={this.changeShelf}/>
        )}
      />
      <Route
        path="/search"
        render={() => (
          <Search registeredBooks={this.state.books} />
        )}
      />
      </div>
    )
  }
}

export default BooksApp
