const addBookBtn = document.querySelector("button");
const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read.match(/^y/) ? true : false;

  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? "read" : "not read yet"
    }.`;
  };
}

function addBookToLibrary(newBook) {
  if (newBook.constructor.name === "Book"){
    if (!myLibrary.some((libraryBook) => libraryBook.title === newBook.title)){
      myLibrary.push(newBook);
    } else {
      alert("This book is already in your library!")
    }
  }
}

addBookBtn.addEventListener("click", () => {
  const prompts = [
    "Enter the book title",
    "Enter the book author",
    "Enter the number of pages",
    "Have you read this book ? (yes/no)",
  ];
  let replies = [];
  let valid;
  let reply;

  outerLoop: {
    for (i = 0; i < prompts.length; i++) {
      valid = false;
      while (!valid) {
        reply = prompt(prompts[i]);
        if (reply) {
          replies[i] = reply;
          valid = true;
        } else {
          break outerLoop;
        }
      }
    }
  }

  const newBook = new Book(...replies);
  addBookToLibrary(newBook);
});

// const theHobbit = new Book(
// "The Hobbit",
// "J. R. R. Tolkien",
// 295,
// 'no',
// );
//
// addBookToLibrary(theHobbit);
// addBookToLibrary(theHobbit);
// console.log(myLibrary);
