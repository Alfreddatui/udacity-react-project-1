import React from 'react';
import { Link } from 'react-router-dom';
import BookComponent from './BookComponent';

class Main extends React.Component {
  render() {
    const { books, changeShelf } = this.props;
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
                  {
                    books.filter(book => {
                      return book.shelf === 'currentlyReading'
                    }).map(book => {
                      return <BookComponent key={book.id} book={book} onChangeShelf={(event) => changeShelf(book, event)}/>
                    })
                  }
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {
                    books.filter(book => {
                      return book.shelf === 'wantToRead'
                    }).map(book => {
                      return <BookComponent key={book.id} book={book} onChangeShelf={(event) => changeShelf(book, event)}/>
                    })
                  }
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {
                    books.filter(book => {
                      return book.shelf === 'read'
                    }).map(book => {
                      return <BookComponent key={book.id} book={book} onChangeShelf={(event) => changeShelf(book, event)}/>
                    })
                  }
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Main;