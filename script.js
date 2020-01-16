
let myLibrary = [];

function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

// on click
let submitButton = document.getElementById('add-book');
submitButton.addEventListener('click', addBookToLibrary );


function isDupe( title, author ){
    let dupe = false
    myLibrary.forEach( function( book )  {
        if ( book.title == title && book.author == author ){
            dupe = true
        }
    } )
    return dupe
}


function addBookToLibrary( e ){
    // display error on duplicate book/author
    
    params = buildParams(e)
    
    book = new Book( params['title'], params['author'], params['pages'],
    params['read'])
    
    // search for duplicates
    if( ! isDupe( params['title'], params['author'] ) ){
        // add to library
        myLibrary.push(book)
        clearInputs();
    }
    

}

function buildParams( e ) {
    // e = #add-book
    // returns formdata in key:value pairs
    let form =  e.target.parentElement
    let inputs = document.getElementsByTagName('input');

    let params = [];

    for (let input of inputs) {
        if( input.name !== "" && input.value !== "" ){
            params[input.name] = input.value
        }

    }

    return params
}





// set form button to role button, dont submit. On button click
// grab values of inputs, then validate, then check for duplicates.
// Finally, add to library.



