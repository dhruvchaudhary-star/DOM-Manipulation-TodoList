function loadToDos() {
//This function will load Todo from the browser
const todos = JSON.parse(localStorage.getItem("todoes")) || {"toDoList" : []};
console.log(todos);
return todos

}

function addToDoToLocalStorage(todo) {
  const todoes = loadToDos();
  todoes.toDoList.push(todo);
  


  localStorage.setItem("todoes" , JSON.stringify(todoes));
  
}

function executeFilterAction(event) {
  const element = event.target;
  const filter = element.getAttribute("data-filter");
  toDoList.innerHTML = '';
  const todos =  loadToDos();
  if(filter === "all") {
    console.log(toDoList);
    todos.toDoList.forEach(todo => {
      AppendToDoInHtml(todo);
    
    })
  } else if(filter == "pending  ") {
    todos.toDoList.forEach(todo => {
      if(todo.isCompleted !== true) {
        AppendToDoInHtml(todo);
      }    
    })

  } else {
    todos.toDoList.forEach(todo => {
      if(todo.isCompleted === true) {
        AppendToDoInHtml(todo);
      }
      
    })
  }

  console.log(filter);
  
}
function AppendToDoInHtml(todo) {
  const toDoList = document.getElementById("toDoList");
  
  const toDoItem = document.createElement("li");

  const textDiv =document.createElement("div");

  

  textDiv.textContent = todo.text;
  

  toDoItem.classList.add("toDoItem");

  const wrapper = document.createElement("div");
  wrapper.classList.add("todoButtons");


  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("editButton"); 

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("deleteButton"); 

  const completedButton = document.createElement("button");
  completedButton.textContent = "Completed";
  completedButton.classList.add("completedButton"); 


  wrapper.appendChild(editButton);
  wrapper.appendChild(deleteButton);
  wrapper.appendChild(completedButton);
  toDoItem.appendChild(textDiv);
  toDoItem.appendChild(wrapper);
  toDoList.appendChild(toDoItem);
  
}

document.addEventListener("DOMContentLoaded" , () => {
  const todoInput = document.getElementById("todoInput");
  

  const submitButton = document.getElementById("addTodo");
  const toDoList = document.getElementById("toDoList");

  const filterbtn = document.getElementsByClassName("filterBtn");
  for(let btn of filterbtn) {
    btn.addEventListener("click" , executeFilterAction )
    }



  submitButton.addEventListener("click" , (event) => {
    const todoText = todoInput.value
    if(todoText == ''){
      alert('please write something');
    } else {
      addToDoToLocalStorage({text: todoText , isCompleted: false});
      AppendToDoInHtml({text: todoText , isCompleted: false});
      todoInput.value = '';
    }


    })



  todoInput.addEventListener("change" , (event) => {
    const todoText = event.target.value;

    event.target.value =todoText.trim();

    console.log(event.target.value );
  })

    const todos =  loadToDos();


    





})
