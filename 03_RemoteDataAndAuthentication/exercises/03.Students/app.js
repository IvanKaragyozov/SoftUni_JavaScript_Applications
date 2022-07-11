async function solve(){

    const url = 'http://localhost:3030/jsonstore/collections/students';

    const table = document.querySelector('#results tbody');

    const response = await fetch(url);
    const data = await response.json();

    Object.values(data).forEach(student => {
        const firstName = student.firstName;
        const lastName = student.lastName;
        const facultyNumber = student.facultyNumber;
        const grade = Number(student.grade);

        const tr = document.createElement('tr');
        tr.setAttribute('id', student._id);

        const firstNameCell = tr.insertCell(0);
        firstNameCell.innerText = firstName;

        const lastNameCell = tr.insertCell(1);
        lastNameCell.innerText = lastName;

        const facultyNumberCell = tr.insertCell(2);
        facultyNumberCell.innerText = facultyNumber;

        const gradeCell = tr.insertCell(3);
        gradeCell.innerText = grade;

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'delete';
        deleteBtn.style.width = '100%';
        deleteBtn.addEventListener('click', deleteStudent);

        const deleteBtnCell = tr.insertCell(4);
        deleteBtnCell.appendChild(deleteBtn);

        table.appendChild(tr);
    });

    async function deleteStudent(ev){
        const id = ev.target.parentNode.parentNode.id;
        ev.target.parentNode.parentNode.replaceChildren();

        const deleteResponse = await fetch(`${url}/${id}`, {
            method: 'DELETE',
        });
    }

    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', onClickSubmit);

    async function onClickSubmit(ev){
        ev.preventDefault();

        const firstNameInput = document.getElementsByName('firstName')[0];
        const lastNameInput = document.getElementsByName('lastName')[0];
        const facultyNumberInput = document.getElementsByName('facultyNumber')[0];
        const gradeInput = document.getElementsByName('grade')[0];

        /*const inputsArray = document.querySelectorAll('.inputs input');

        Array.from(inputsArray.map(input => {
            input.setAttribute('required', '');
        }));*/

        if(isNaN(gradeInput.value)){
            return alert('Wrong grade format!');
        }

        if(firstNameInput.value !== '' || lastNameInput.value !== '' || facultyNumberInput.value !== '' || gradeInput.value !== '') {

            const response = await fetch(url, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    firstName: firstNameInput.value,
                    lastName: lastNameInput.value,
                    facultyNumber: Number(facultyNumberInput.value),
                    grade: Number(gradeInput.value)
                })
            });

            const tr = document.createElement('tr');

            const firstNameCell = tr.insertCell(0);
            firstNameCell.innerText = firstNameInput.value;

            const lastNameCell = tr.insertCell(1);
            lastNameCell.innerText = lastNameInput.value;

            const facultyNumberCell = tr.insertCell(2);
            facultyNumberCell.innerText = facultyNumberInput.value;

            const gradeCell = tr.insertCell(3);
            gradeCell.innerText = gradeInput.value;

            table.appendChild(tr);
        }

        firstNameInput.value = '';
        lastNameInput.value = '';
        facultyNumberInput.value = '';
        gradeInput.value = '';
    }
}

solve();