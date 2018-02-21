var todoList = {
	todos: [],

	// displayTodos : function() {
	// 	if (this.todos.length === 0) {
	// 		console.log("Your to do list is empty!");
	// 	}
	// 	else {
	// 		console.log("My todos: ");
	// 		for (var i=0; i<this.todos.length; i++) {
	// 			if (this.todos[i].completed === true) {
	// 				console.log("(V)" + this.todos[i].todoText);
	// 			}
	// 			else {
	// 				console.log("( )" + this.todos[i].todoText);
	// 			}
	// 		}
	// 	}
	// },

	addTodo : function(todoText) {
	this.todos.push({
		todoText : todoText,
		completed : false
	});

	},

	changeTodo : function(index, todoText) {
		this.todos[index].todoText = todoText;
	},

	deleteTodo : function(index) {
		this.todos.splice(index, 1);
	},

	toggleCompleted: function(index) {
		var todo = this.todos[index];
		todo.completed = !todo.completed;
	},

	toggleAll : function() {
		var totalTodos = this.todos.length;
		var completedTodos = 0;

		this.todos.forEach(function(todo){
			if (todo.completed === true) {
				completedTodos++;
			}
		});

		this.todos.forEach(function(todo){
			if (completedTodos === totalTodos) {
				this.todos.completed = false;
			}
			else {
				this.todos.completed = true;
			}
		});
	}
};


var handlers = {

	addTodo : function() {
		var todoText = document.getElementById("addTodoText");
		todoList.addTodo(todoText.value);
		todoText.value = "";
		view.displayTodos();
	},

	changeTodo : function() {
		var changedTodoIndex = document.getElementById("changedTodoIndex");
		var changedTodoText = document.getElementById("changedTodoText");
		todoList.changeTodo(changedTodoIndex.valueAsNumber, changedTodoText.value);
		changedTodoIndex.value = "";
		changedTodoText.value = "";
		view.displayTodos();
	},

	deleteTodo : function(index) {
		todoList.deleteTodo(index);
		view.displayTodos();
	},

	toggleCompleted : function() {
		var toggleCompletedIndex = document.getElementById("toggleCompletedIndex");
		todoList.toggleCompleted(toggleCompletedIndex.valueAsNumber);
		toggleCompletedIndex.value = "";
		view.displayTodos();
	},

	toggleAll : function() {
		todoList.toggleAll();
		view.displayTodos();
	}

}

var view = {
	displayTodos : function() {

		var todosUl = document.querySelector("ul");
		todosUl.innerHTML = "";

		todoList.todos.forEach(function(todo, index){
			var todoLi = document.createElement("li");
			var todoTextWithCompletion = "";

				// if (todoList.todos.length === 0) {
				// 	todoTextWithCompletion = "Your to do list is empty!";
				if (todo === true) {
					todoTextWithCompletion = "V" + todo.todoText;
				} else {
					todoTextWithCompletion = "O" + todo.todoText;
				};

			todoLi.id = index;
			todoLi.textContent = todoTextWithCompletion;
			todoLi.appendChild(this.createDeleteButton());
			todosUl.appendChild(todoLi);

		}, this);

	},

	createDeleteButton : function() {
		var deleteButton = document.createElement("button");
		deleteButton.textContent = "Delete";
		deleteButton.className = "deleteButton";
		return deleteButton;
	},

	setUpEventListeners : function() {
	var todosUl = document.querySelector("ul");
	todosUl.addEventListener("click", function(event) {
		var elementClicked = event.target;
		if (elementClicked.className === "deleteButton") {
			handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
		}
	});
	}
};

view.setUpEventListeners();