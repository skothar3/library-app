// VARIABLES //{{{
const addBookBtn = document.querySelector( "button" );
const addBookP = document.querySelector( "p.hidden" );
const containerDiv = document.querySelector( "div.card-container" );
const myLibrary = [];

const theHobbit = new Book(
"The Hobbit",
"J. R. R. Tolkien",
295,
'yes'
);

const harryPotter1 = new Book(
"Harry Potter and the Philosopher's Stone",
"J. K. Rowling",
320,
'yes',
);

const liarsPoker = new Book(
"Liar's Poker",
"Michael Lewis",
278,
'no',
);

const audacityOfHope = new Book(
"Audacity of Hope",
"Barack Obama",
406,
'no',
);

const daVinciCode = new Book(
"The DaVinci Code",
"Dan Brown",
450,
'yes',
);
//}}}

// FUNCTIONS {{{
function Book( title, author, pages, read ) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read.match( /^y/ ) ? true : false;

  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? "read" : "not read yet"
    }.`;
  };
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
}

function addBook( newBook ) {
  if ( newBook.constructor.name === "Book" ){
    if ( !myLibrary.some( ( libraryBook ) => libraryBook.title === newBook.title ) ){
      myLibrary.push( newBook );
      updateGrid();
    } else {
      alert( "This book is already in your library!" )
    }
  }
}

function removeBook( index ) {
  myLibrary.splice( index, 1 );
  updateGrid();
};

function updateGrid() {
  const myLibraryCards = [];

  myLibrary.sort( ( a, b ) => {
    const authorA = a.author.toUpperCase();
    const authorB = b.author.toUpperCase();
    
    if ( authorA < authorB ) {
      return -1;
    } else if ( authorA > authorB ) {
      return 1;
    }
    
    return 0;
  } );

  myLibrary.forEach( ( book, index ) => {
    const card = document.createElement( "div" );
    const title = document.createElement( "p" );
    const author = document.createElement( "p" );
    const pages =  document.createElement( "p" );
    const actionContainer = document.createElement( "div" );
    const readStatusSign =  document.createElement( "div" );
    const readStatus =  document.createElement( "p" );
    const trash = document.createElement( "div" );
    
    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = `${book.pages}`;
    
    actionContainer.appendChild( readStatusSign );
    actionContainer.appendChild( readStatus );
    actionContainer.appendChild( trash );
    card.appendChild( title );
    card.appendChild( author );
    card.appendChild( pages );
    card.appendChild( actionContainer );
    
    card.setAttribute( "data-index", `${ index }` );

    card.classList.add( "card" );
    title.classList.add( "title" );
    author.classList.add( "author" );
    pages.classList.add( "pages" );
    actionContainer.classList.add( "action" );
    readStatusSign.classList.add( "status" );
    trash.classList.add( "trash" );
    if ( book.read ) {
      readStatusSign.classList.add( "read" )
      readStatus.textContent = "Read ";
    } else {
      readStatus.textContent = "Not read ";
    }
    
    myLibraryCards.push(card);
    
    readStatusSign.addEventListener("mouseenter", function () {
      this.classList.add( "hovered" );
    });

    readStatusSign.addEventListener("mouseleave", function () {
      this.classList.remove( "hovered" );
    });

    readStatusSign.addEventListener( "click", function () {
      if ( this.classList.contains( "read" ) ) {
	this.classList.remove( "read" );
	this.parentElement.childNodes[1].textContent = "Not read " ;
      } else {
	this.classList.add( "read" );
	this.parentElement.childNodes[1].textContent = "Read " ;
      }
      this.classList.remove( "hovered" );
      book.toggleRead();
    } );
    
    
    trash.addEventListener( "click", function () {
      removeBook( index )
    } );
    
    myLibraryCards.push(card);
  } )

  containerDiv.replaceChildren(...myLibraryCards);
};
//}}}

// LISTENERS {{{
addBookBtn.addEventListener( "click", () => {
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
    for ( i = 0; i < prompts.length; i++ ) {
      valid = false;
      while ( !valid ) {
        reply = prompt( prompts[i] );
        if ( reply ) {
          replies[i] = reply;
          valid = true;
        } else {
          break outerLoop;
        }
      }
    }
  }

  if (valid) {
    const newBook = new Book( ...replies );
    addBook( newBook );
  }
});

addBookBtn.addEventListener( "mouseenter", () => addBookP.classList.remove( "hidden" ) );

addBookBtn.addEventListener( "mouseleave", () => addBookP.classList.add( "hidden" ) );

//}}}

addBook( theHobbit );
addBook( harryPotter1 );
addBook( liarsPoker );
addBook( daVinciCode );
addBook( audacityOfHope );

updateGrid();
