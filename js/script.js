const input_box = document.getElementById('input-box');
const button = document.getElementById('button');
const list_container = document.getElementById('list');
const clear_button = document.getElementById('clear-button');
const search_box = document.getElementById('search-box');
const due_date = document.getElementById('due-date');

button.onclick = function () {
    const inputValue = input_box.value.trim();
    const priorityValue = document.getElementById('priority-select').value;
    const dueDateValue = due_date.value;

    if (inputValue === '') {
        alert("Please enter a valid task.");
        return;
    }

    let li = document.createElement('li');
    li.classList.add(priorityValue);
    li.innerHTML = `
        <input type="checkbox" onchange="toggleCompletion(this)"> 
        ${inputValue} 
        <span style="margin-left: 10px;">${dueDateValue}</span> 
        <span class="timestamp"></span>
    `;

    let deleteIcon = document.createElement("i");
    deleteIcon.className = "fas fa-trash delete-icon";
    deleteIcon.onclick = function () {
        li.remove();
        saveToLocalStorage();
    };
    li.appendChild(deleteIcon);

    list_container.appendChild(li);
    input_box.value = '';
    due_date.value = '';
    saveToLocalStorage();
}

function toggleCompletion(checkbox) {
    const li = checkbox.parentElement;
    if (checkbox.checked) {
        li.classList.add('completed');
        const timestamp = new Date().toLocaleString(); 
        li.querySelector('.timestamp').textContent = `Completed at: ${timestamp}`;
    } else {
        li.classList.remove('completed');
        li.querySelector('.timestamp').textContent = ''; 
    }
    saveToLocalStorage();
}

clear_button.onclick = function () {
    list_container.innerHTML = '';
    saveToLocalStorage();
}

search_box.oninput = function () {
    const searchTerm = search_box.value.toLowerCase();
    const items = list_container.querySelectorAll('li');
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(searchTerm) ? 'flex' : 'none';
    });
}

function saveToLocalStorage() {
    localStorage.setItem("data", list_container.innerHTML);
}

function display() {
    list_container.innerHTML = localStorage.getItem("data") || '';
    // Restore checkbox states and completed class
    const items = list_container.querySelectorAll('li');
    items.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        checkbox && (checkbox.checked = item.classList.contains('completed'));
        const timestamp = item.querySelector('.timestamp');
        if (checkbox.checked) {
            timestamp.textContent = `Completed at: ${new Date().toLocaleString()}`; 
        }
    });
}

display();