// prototype methods (old es5)

// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

UI.prototype.addBookToList = function(book) {
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
};

// Show alert
UI.prototype.showAlert = function(msg, classname) {
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
};

// Delete Book
UI.prototype.deleteBook = function deleteBook(target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove;
  }
};

//  Clear Fields
UI.prototype.clearFields = function() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

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

  ui.deleteBook(e.target);

  // ShowMessage
  ui.showAlert("Book Removed!", "success");

  e.preventDefault();
});
