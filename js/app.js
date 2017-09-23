//Метод для отображения очередной задачи
function createTodoItem(title) {
	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	checkbox.className = 'checkbox';

	const label = document.createElement('lsbel');
	label.innerText = title;
	label.className = 'title';

	const editInput = document.createElement('input');
	editInput.type = 'text';
	editInput.className = 'textfield';

	const editButton = document.createElement('button');
	editButton.innerText = 'Изменить';
	editButton.className = 'edit';

	const deleteButton = document.createElement('button');
	deleteButton.innerText = 'Удалить';
	deleteButton.className = 'delete';

	const listItem = document.createElement('li');
	listItem.className = 'todo-item';

	listItem.appendChild(checkbox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);

	//Привязываем обработчики событий
	bindEvents(listItem);

	return listItem;
}

//Функция привязки к событию
function bindEvents(todoItem) {
	const checkbox = todoItem.querySelector('.checkbox');
	const editButton = todoItem.querySelector('button.edit');
	const deleteButton = todoItem.querySelector('button.delete');

	checkbox.addEventListener('change', toggleTodoItem);
	editButton.addEventListener('click', editTodoItem);
	deleteButton.addEventListener('click', deleteTodoItem);
}

function addTodoItem(event) {
	event.preventDefault();

	if (addInput.value === '') {
		return alert('Необходимо ввести название задачи.');
	}

	const todoItem = createTodoItem(addInput.value);
	todoList.appendChild(todoItem);
	addInput.value = '';
}

function toggleTodoItem() {
	const listItem = this.parentNode;
	listItem.classList.toggle('completed');
}

function editTodoItem() {
	const listItem = this.parentNode;
	const title = listItem.querySelector('.title');
	const editInput = listItem.querySelector('.textfield'); //Доступ к полю для редактирования задачи
	const isEditing = listItem.classList.contains('editing'); //Проверяем, есть ли listItem класс editing

	if (isEditing) {
		title.innerText = editInput.value; //Присваиваем названию новой задачи значение из текстового поля
		this.innerText = 'Изменить'; // Доступ к кнопке editButton
	} else {
		editInput.value = title.innerText;
		this.innerText = 'Сохранить';
	}

	listItem.classList.toggle('editing');
}

function deleteTodoItem() {
	const listItem = this.parentNode; //доступ к listItem
	todoList.removeChild(listItem);
}


const todoForm = document.getElementById('todo-form');
const addInput = document.getElementById('add-input');
const todoList = document.getElementById('todo-list');
const todoItems = document.querySelectorAll('.todo-item');

//Манипуляции с задачами, уже имеющимися в списке задач
function main() {
	todoForm.addEventListener('submit', addTodoItem);
	todoItems.forEach(item => bindEvents(item));
}

main();