const url = 'http://localhost:3030/jsonstore/collections/books';

let loadBookButton = document.querySelector('#loadBooks');
let tbodyElement = document.getElementsByTagName('tbody')[0];
let formElement = document.getElementsByTagName('form')[0];

loadBookButton.addEventListener('click', loadBooks);

formElement.addEventListener('submit', function (e) {
    e.preventDefault();
    //1. Get data from form
    //2. Request with POST method, to add new book
})

/**
 * - Not finished
 */

async function loadBooks(){

    try{
        let response = await fetch(url);

        if(response.status !== 200){
            throw new Error('Problem loading data.');
        }

        let data = await response.json();

        let entries = Object.entries(data);
        tbodyElement.innerHTML = '';

        for (let [key, {author, title}] of entries) {
            let trElement = document.createElement('tr');
            let titleTdElement = document.createElement('tr');
            titleTdElement.textContent = title;
            let authorTdElement = document.createElement('td');
            authorTdElement.textContent = author;

            trElement.appendChild(titleTdElement);
            trElement.appendChild(authorTdElement);

            let newTdElement = document.createElement('td');
            let editButton = document.createElement('button');
            let deleteButton = document.createElement('button');
            editButton.textContent = 'Edit';
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', remove);
            editButton.addEventListener('click', edit);

            newTdElement.appendChild(editButton);
            newTdElement.appendChild(deleteButton);

            trElement.appendChild(newTdElement);
            tbodyElement.appendChild(trElement);

            function edit(e){
                //TODO
                // PUT request
            }

            function remove(e){
                e.preventDefault();

                fetch(`${url}/${key}`, {
                    method: 'DELETE'
                });

                trElement.remove();
            }
        }
    } catch (error){

    }
}