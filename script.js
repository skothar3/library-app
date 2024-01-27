// VARIABLES //{{{
const addBookBtn = document.querySelector( "button" );
const addBookP = document.querySelector( "p.hidden" );
const containerDiv = document.querySelector( "div.card-container" );
const sortSelect = document.getElementById( "sort-by" );
const myLibrary = [];
let sortStyle = sortSelect.value;

// VARIABLES - BOOKS {{{
const theHobbit = new Book(
"The Hobbit",
"J. R. R. Tolkien",
295,
'yes',
false
);

const harryPotter1 = new Book(
"Harry Potter and the Philosopher's Stone",
"J. K. Rowling",
320,
'yes',
false
);

const liarsPoker = new Book(
"Liar's Poker",
"Michael Lewis",
278,
'no',
false
);

const audacityOfHope = new Book(
"Audacity of Hope",
"Barack Obama",
406,
'no',
false
);

const daVinciCode = new Book(
"The DaVinci Code",
"Dan Brown",
450,
'yes',
false
);//}}}
//}}}

// FUNCTIONS {{{

function Book( title, author, pages, isRead, isNew ) {//{{{
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead.match( /^y/ ) ? true : false;
  this.isNew = isNew;

  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.isRead ? "read" : "not read yet"
    }.`;
  };
}//}}}

Book.prototype.toggleRead = function () {//{{{
  this.isRead = !this.isRead;
}//}}}

function addBook() {//{{{
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
    const newBook = new Book( ...replies, true );
    if ( !myLibrary.some( ( libraryBook ) => libraryBook.title === newBook.title ) ) {
      myLibrary.push( newBook );
      updateGrid();
    } else {
      alert( "This book is already in your library!" )
    }
  }
}//}}}

function removeBook( index ) {//{{{
  myLibrary.splice( index, 1 );
  updateGrid();
};//}}}

function sortLibrary(sortBy) {//{{{

  myLibrary.sort( ( a, b ) => {
    let A;
    let B;
    if (sortBy === "author" || sortBy === "title") {
      if (sortBy === "author") {
	A = a.author.toUpperCase();
	B = b.author.toUpperCase();
      } else {
	A = a.title.toUpperCase();
	B = b.title.toUpperCase();
      }

      if ( A < B ) return -1;
      if ( A > B ) return 1;
      return 0;
    } else if (sortBy === "read" || sortBy === "unread") {
      A = a.isRead;
      B = b.isRead;
      
      if (sortBy === "read") {
	if ( A > B ) return -1;
	if ( A < B ) return 1;
	return 0;
      } else {
	if ( A < B ) return -1;
	if ( A > B ) return 1;
	return 0;
      }
    } else if (sortBy === "new") {
      A = a.isNew;
      B = b.isNew;

      if ( A > B ) return -1;
      if ( A < B ) return 1;
      return 0;
    }
  } );
};//}}}

function updateGrid() {//{{{
  const myLibraryCards = [];
  sortLibrary(sortStyle);

  myLibrary.forEach( ( book, index ) => {
    const card = document.createElement( "div" );
    const newTag = document.createElement( "div" );
    const title = document.createElement( "p" );
    const author = document.createElement( "p" );
    const pages =  document.createElement( "p" );
    const actionContainer = document.createElement( "div" );
    const readStatusSign =  document.createElement( "div" );
    const readStatus =  document.createElement( "p" );
    const trash = document.createElement( "img" );
    
    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = `${book.pages}`;
    newTag.textContent = "New!";
    trash.src = "./trash.svg";
    
    actionContainer.appendChild( readStatusSign );
    actionContainer.appendChild( readStatus );
    actionContainer.appendChild( trash );
    card.appendChild( title );
    card.appendChild( newTag );
    card.appendChild( author );
    card.appendChild( pages );
    card.appendChild( actionContainer );
    
    card.setAttribute( "data-index", `${ index }` );

    card.classList.add( "card" );
    title.classList.add( "title" );
    newTag.classList.add( "new" );
    author.classList.add( "author" );
    pages.classList.add( "pages" );
    actionContainer.classList.add( "action" );
    readStatus.classList.add("read-status");
    readStatusSign.classList.add( "read-status-sign" );
    trash.classList.add( "trash" );
    if ( book.isRead ) {
      readStatusSign.classList.add( "read" );
      readStatus.textContent = "Read";
    } else {
      readStatus.textContent = "Not read yet";
    }
    if ( !book.isNew ) {
      newTag.classList.add( "hidden" );
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
	this.parentElement.getElementsByClassName("read-status").textContent = "Not read yet" ;
      } else {
	this.classList.add( "read" );
	this.parentElement.getElementsByClassName("read-status").textContent = "Read" ;
      }
      this.classList.remove( "hovered" );
      book.toggleRead();
      updateGrid();
    } );
    
    trash.addEventListener( "click", () => {
      removeBook( index );
    } );
    
    myLibraryCards.push(card);
  } )

  containerDiv.replaceChildren(...myLibraryCards);
};//}}}

//}}}

// LISTENERS {{{
addBookBtn.addEventListener( "click", addBook );

addBookBtn.addEventListener( "mouseenter", () => addBookP.classList.remove( "hidden" ) );

addBookBtn.addEventListener( "mouseleave", () => addBookP.classList.add( "hidden" ) );

sortSelect.addEventListener( "change", function () {
  sortStyle = this.value;
  updateGrid();
});
//}}}

myLibrary.push( theHobbit );
myLibrary.push( harryPotter1 );
myLibrary.push( liarsPoker );
myLibrary.push( daVinciCode );
myLibrary.push( audacityOfHope );

updateGrid();
