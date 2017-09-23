//Функция для создания элементов, рефакторинг функции createTodoItem()
function createElement(tag, properties, ...children) {
	const element = document.createElement(tag);

	Object.keys(properties).forEach(key => element[key] = properties[key]);
}

//Метод для отображения очередной задачи
function createTodoItem(title) {
	const checkbox = createElement('input', { type: 'checkbox', className: 'checkbox' });
	const label = createElement('label', { className: 'title'}, title);
	const editInput = createElement('input', { type: 'text', className: 'textfield' });
	const editButton = createElement('button', { className: 'edit' }, 'Изменить');
	const deleteButton = createElement('button', { className: 'delete' }, 'Удалить');
	const listItem = document.createElement('li', { className: 'todo-item' });

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