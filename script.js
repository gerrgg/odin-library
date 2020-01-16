function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

var library = {
    //declarations
    collection: [],
    errors: [],

    // dom elements
    shelf: document.getElementById('my-library'),
    errors: document.getElementById('errors'),
    submitButton: document.getElementById('add-book'),
    inputs: document.getElementsByTagName('input'),
    
    //construct
    init: function() {
        this.shelf.render( this.collection )
        this.submitButton.addEventListener('click', this.addBook );
    },

    // binded to click => #add-book
    addBook: function(e){
        // display error on duplicate book/author
    
        params = library.buildParams(e)
        
        book = new Book( params['title'], params['author'], 
                        params['pages'], params['read'])
        
        // search for duplicates
        if( ! library.isDupe( params['title'], params['author'] ) ){
            // add to library
            library.collection.push(book)
            library.clearFields();
        } else {
            library.showErrors();
        }

    },

    buildParams: function( ) {
        // returns formdata in key:value pairs
        let params = [];
    
        for (let input of this.inputs) {
            if( input.name !== "" && input.value !== "" ){
                params[input.name] = input.value
            }
    
        }
    
        return params
    },

    clearFields: function( ){

        for (let input of this.inputs) {
            input.value = ''
        }
    },

    isDupe: function( title, author ){
        let dupe = false
        this.collection.forEach( function( book )  {
            if ( book.title == title && book.author == author ){
                dupe = true
            } else {
                this.errors.push( params['title'] + ' by ' + params['author'] + 'is already on your shelf.' )
            }
        } )
        return dupe
    },

}

library.init();





// set form button to role button, dont submit. On button click
// grab values of inputs, then validate, then check for duplicates.
// Finally, add to library.



