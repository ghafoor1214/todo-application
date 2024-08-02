// Ensure the user is logged in or redirect to login page
window.addEventListener("load", () => {
  console.log(localStorage.getItem("user"));
  if (!localStorage.getItem("user")) {
    window.location.replace("../pages/login.html");
  }
  getTodos();  // Load todos when the page loads
});

// Import functions from firebase.js
import {
  addDoc,
  collection,
  db,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "./firebase.js";

// Initialize Firebase collection reference
const todoCollection = collection(db, "todos");
const todoParent = document.querySelector(".parent");
console.log("todoParent", todoParent);

// Add a new todo item
const addTodo = async () => {
  try {
    const todoInput = document.getElementById("input");
    console.log("todoInput", todoInput.value);
    if (todoInput.value.length < 3) {
      alert("Enter a value with at least 3 characters.");
      return;
    }
    const todoObj = {
      value: todoInput.value,
    };

    const res = await addDoc(todoCollection, todoObj);
    getTodos(); // Refresh the list of todos
    console.log("Todo added with ID:", res.id);
  } catch (error) {
    console.log("Error adding todo:", error.message);
  }
};

// Fetch and display todos
const getTodos = async () => {
  try {
    const querySnapshot = await getDocs(todoCollection);
    let todoArr = [];
    
    todoParent.innerHTML = ""; // Clear current todos
    querySnapshot.forEach((doc) => {
      const obj = {
        id: doc.id,
        ...doc.data(),
      };
      todoArr.push(obj);
      todoParent.innerHTML += `
        <div class="card my-3" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">${obj.value}</h5>
            <button class="btn btn-info" id="${obj.id}" onclick="editTodo(this)">EDIT</button>
            <button class="btn btn-danger" id="${obj.id}" onclick="deleteTodo(this)">DELETE</button>
          </div>
        </div>`;
    });
  } catch (error) {
    console.log("Error getting todos:", error.message);
  }
};

// Delete a specific todo item
const deleteTodo = async (ele) => {
  console.log("Deleting todo with ID:", ele.id);
  try {
    await deleteDoc(doc(db, "todos", ele.id));
    getTodos(); // Refresh the list of todos
  } catch (error) {
    console.log("Error deleting todo:", error.message);
  }
};

// Edit a specific todo item
const editTodo = async (ele) => {
  try {
    const editValue = prompt("Enter new value:");
    if (editValue) {
      await updateDoc(doc(db, "todos", ele.id), {
        value: editValue,
      });
      getTodos(); // Refresh the list of todos
      console.log("Todo edited to:", editValue);
    }
  } catch (error) {
    console.log("Error editing todo:", error.message);
  }
};

// Delete all todo items
const deleteAllTodos = async () => {
  try {
    const querySnapshot = await getDocs(todoCollection);
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    getTodos(); // Refresh the list of todos
    console.log("All todos deleted.");
  } catch (error) {
    console.log("Error deleting all todos:", error.message);
  }
};

// Handle user logout
const logoutBtn = () => {
  localStorage.removeItem("user");
  localStorage.clear();
  window.location.replace("../pages/login.html");
};

// Attach functions to the global window object for use in HTML
window.addTodo = addTodo;
window.deleteTodo = deleteTodo;
window.editTodo = editTodo;
window.deleteAllTodos = deleteAllTodos;
window.logoutBtn = logoutBtn;
