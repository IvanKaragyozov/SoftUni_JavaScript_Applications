/**
 * Use getInfo() function in order to connect with the HTML
 */


/**
 * Using fetch
 */
function getInfoDif() {

    //1. get all element by ID
    //2. fetch data from server
    //3. forEach bus create li element with text
    //4. append li tags to ul

    const baseUrl = 'http://localhost:3030/jsonstore/bus/businfo';
    const inputElement = document.getElementById('stopId');
    const ulElements   = document.getElementById('buses');
    const divElement   = document.getElementById('stopName');

    fetch(`${baseUrl}/${inputElement.value}`)
        .then(response => response.json())
        .then(data => {
            let buses = data.buses;
            let name = data.name;
            console.log(data.buses.id)

            divElement.textContent = name;
            ulElements.innerHTML = '';
            Object.keys(buses).forEach(bus => {
                let liElement = document.createElement('li');
                liElement.textContent = `Bus ${bus} arrives in ${buses[bus]} minutes`;
                ulElements.appendChild(liElement);
            })
        })
        .catch(error => {
            divElement.textContent = 'Error';
            ulElements.innerHTML = '';
        })
}

/**
 * Using Async/Await
 */

async function getInfo(){

    const stopNameElement  = document.getElementById('stopName');
    const timeTableElement = document.getElementById('buses');

    const stopId = document.getElementById('stopId').value;
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;



    try {
        stopNameElement.textContent = 'Loading...';
        timeTableElement.replaceChildren(); // same as .innerHTML = '';
        const response = await fetch(url);

        if (response.status !== 200){
            alert('Stop ID not found!');
        }
        const data = await response.json();
        stopNameElement.textContent = data.name;

        Object.entries(data.buses).forEach(b => {
            const liElement = document.createElement('li');
            liElement.textContent = `Bus ${b[0]} arrives in ${b[1]} minutes`;
            timeTableElement.appendChild(liElement);

        })
    } catch (error){
        stopNameElement.textContent = 'Error';
    }
}