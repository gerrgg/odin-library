function Book(title, author, pages, read){
    this.title = title    
    this.author = author
    this.pages = pages
    this.read = read
}

const book1 = new Book( 'The Hunger Games', 'Suzanne Collins', 333, 'off' )
const book2 = new Book( 'Harry Potter and the Sorcerer\'s Stone', ' J.K. Rowling', 150, 'on' )

var library = {
    //declarations
    collection: [book1, book2],
    errors: [],

    // dom elements
    shelf: document.getElementById('my-library'),
    errorDiv: document.getElementById('errors'),
    submitButton: document.getElementById('add-book'),
    inputs: document.getElementsByTagName('input'),
    
    //construct
    init: function() {
        this.render()
        this.submitButton.addEventListener('click', this.addBook );
    },

    render: function(){
        
        //clear shelf
        let html = ''
        this.shelf.innerHTML = html;
        
        // display each book in collection
        this.collection.forEach( function( book ) {
            let read = ( book.read === 'on' ) ? 'Yes' : 'No' 

            html += `<div class='book'>
                        <p class="title">Title: ${book.title}</p>
                        <p class="author">Author: ${book.author}</p>
                        <p class="pages">Total Pages: ${book.pages}</p>
                        <p class="read">Did you read it?: ${read}</p>
                    </div>`
        } );

        this.shelf.innerHTML = html;
    },

    // binded to click => #add-book
    addBook: function(e){
        // display error on duplicate book/author
    
        params = library.buildParams(e)
        
        book = new Book( params['title'], params['author'], 
                        params['pages'], params['read'])


        // search for duplicates
        if( ! library.isDupe( params['title'], params['author'] ) && library.isValid( book ) ){
            // add to library
            library.collection.push(book)
            library.clearFields()
            library.render()
        } 
        
        library.showErrors()

    },

    isValid: function( book ){
        let valid = true

        Object.keys(book).forEach(function(key) {
            if( book[key] == null ){
                valid = false
            }
        });

        console.log( valid )
        if( ! valid ){
            this.errors.push( 'Inputs cannot be blank!' )
        }

        return valid
    },

    showErrors: function(){
         //clear error
         let html = ''
         this.errorDiv.innerHTML = html
         
         // display each book in collection
         this.errors.forEach( function( error ) {
             html += "<li>"+ error +"</li>";
         } );
 
         this.errorDiv.innerHTML = html
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
        // simply clears the value of form inputs on successful 'submission'
        for (let input of this.inputs) {
            input.value = ''
        }

        library.errorDiv.innerHTML = '';
    },
    

    isDupe: function( title, author ){
        let dupe = false

        this.collection.forEach( function( book ) {
            if ( book.title == title && book.author == author ){
                dupe = true
            }
        } );
        
        if( dupe ){
            library.errors.push( params['title'] + ' by ' + params['author'] + 'is already on your shelf.' )
        }

        return dupe
    },

}

library.init();





// set form button to role button, dont submit. On button click
// grab values of inputs, then validate, then check for duplicates.
// Finally, add to library.



