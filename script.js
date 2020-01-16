function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

var library = {
    //declarations
    collection: [],
    submitButton: document.getElementById('add-book'),
    inputs: document.getElementsByTagName('input'),
    
    //construct
    init: function() {
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
        }

        console.log( library.collection )
    },

    buildParams: function( e ) {
        // e = #add-book
        // returns formdata in key:value pairs
    
        let params = [];
    
        for (let input of this.inputs) {
            if( input.name !== "" && input.value !== "" ){
                params[input.name] = input.value
            }
    
        }
    
        return params
    },

    isDupe: function( title, author ){
        let dupe = false
        this.collection.forEach( function( book )  {
            if ( book.title == title && book.author == author ){
                dupe = true
            }
        } )
        return dupe
    }
}

library.init();





// set form button to role button, dont submit. On button click
// grab values of inputs, then validate, then check for duplicates.
// Finally, add to library.



