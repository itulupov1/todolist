'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

const arr = JSON.parse(localStorage.getItem('arr'));
const todoData = arr;

const render = function() {
	todoList.textContent = '';
	todoCompleted.textContent = '';

	todoData.forEach(function(item){
		const li = document.createElement('li');
		li.classList.add('todo-item');

		li.innerHTML = '<span class="text-todo">' + item.value +'</span>' + 
			'<div class="todo-buttons">' +
				'<button class="todo-remove"></button>' +
				'<button class="todo-complete"></button>' +
			'</div>';
		if (item.completed) {
			todoCompleted.append(li);
		} else {
			todoList.append(li);
		}

		const btnTodoComplete = li.querySelector('.todo-complete');

		btnTodoComplete.addEventListener('click', function(){
			item.completed = !item.completed;
			render();
		});
		
		const btnTodoRemove = li.querySelector('.todo-remove');

		btnTodoRemove.addEventListener('click', function (){

			for (let i = 0; i < todoData.length; i++){
				if (todoData[i].value === item.value) {
					todoData.splice(i, 1);
					localStorage.clear();
					localStorage.setItem('arr', JSON.stringify(todoData));
				}
			}
			render();
		});
	});
};

todoControl.addEventListener('submit', function(event){
	event.preventDefault();
	if (headerInput.value !== ''){
		const newTodo = {
			value: headerInput.value,
			completed: false
		};
		todoData.push(newTodo);
		headerInput.value = '';
	} 
	render();
	localStorage.clear();
	localStorage.setItem('arr', JSON.stringify(todoData));
});

render();
