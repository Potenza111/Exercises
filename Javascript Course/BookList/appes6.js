// classes (es6)

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");

    // Create Tr Element
    const row = document.createElement("tr");

    // insert Cols
    row.innerHTML = ` 
                    <td>${book.title}</td>
                     <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td><a href="#" class= "delete"> X<a></td>
                  `;

    list.appendChild(row);
  }

  showAlert(msg, classname) {
    // Create DIV
    const div = document.createElement("div");

    // Add Classes
    div.className = `alert ${classname}`;

    // Add Text
    div.appendChild(document.createTextNode(msg));

    // Get Parent
    const container = document.querySelector(".container");

    const form = document.querySelector("#book-form");

    // Insert Alert
    container.insertBefore(div, form);

    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

// Local Storage class
class Store {
  static getBooks() {
    let books;

    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function(book) {
      const ui = new UI();

      // Add book to UI
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function(book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

// DOM Load event Listner
document.addEventListener("DOMContentLoaded", Store.displayBooks);

// Event Listners
document.getElementById("book-form").addEventListener("submit", function(e) {
  // Get Form Values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  const book = new Book(title, author, isbn);

  const ui = new UI();

  // validate
  if (title === "" || author === "" || isbn === "") {
    // Error Alert
    ui.showAlert("Please fill in all the fields", "error");
  } else {
    // Add book To list
    ui.addBookToList(book);

    // Add to LS
    Store.addBook(book);

    // Show success
    ui.showAlert("Book added", "success");

    // Clear Fields
    ui.clearFields();
  }

  e.preventDefault();
});

// EventListner For Delete
document.getElementById("book-list").addEventListener("click", function(e) {
  const ui = new UI();

  // Remove from Local Storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Delete a book
  ui.deleteBook(e.target);

  // ShowMessage
  ui.showAlert("Book Removed!", "success");

  e.preventDefault();
});
