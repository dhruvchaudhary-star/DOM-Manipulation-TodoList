function loadToDos() {
//This function will load Todo from the browser
const todos = JSON.parse(localStorage.getItem("todoes")) || {"toDoList" : []};
console.log(todos);
return todos

}

function addToDoToLocalStorage(todoText) {
  const todoes = loadToDos();
  todoes.toDoList.push(todoText);
  localStorage.setItem("todoes" , JSON.stringify(todoes));


}

document.addEventListener("DOMContentLoaded" , () => {
  const todoInput = document.getElementById("todoInput");
  

  const submitButton = document.getElementById("addTodo");

  submitButton.addEventListener("click" , (event) => {
    const todoText = todoInput.value
    if(todoText == ''){
      alert('please write something');
    } else {
      addToDoToLocalStorage(todoText);
    }


    })



  todoInput.addEventListener("change" , (event) => {
    const todoText = event.target.value;

    event.target.value =todoText.trim();

    console.log(event.target.value );
  })

    loadToDo();
})

