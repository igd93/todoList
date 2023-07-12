import { useState } from "react"
import "./styles.css"
import { NewToDoForm } from "./NewToDoForm"

export default function App() {
  
  const [toDos, setToDos] = useState([])

  function addToDo(title) {
    setToDos((currentToDos) => {
      return [...currentToDos, 
        { id : crypto.randomUUID(), title, completed: false}, 
        ]
    })
  }

  

  function toggleToDo(id, completed) {
    setToDos(currentToDos => {
      return currentToDos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed } 
        }
        return todo
      })
    })
  }

  function deleteToDo(id) {
    setToDos(currentToDos => {
      return currentToDos.filter(todo => todo.id !== id)
    })

  }

  return (<>
    <NewToDoForm onSubmit = {addToDo}/>
    <h1 className="header">ToDo List</h1>
    <ul className="list">
      {toDos.length === 0 && "No ToDos"} 
      {toDos.map(todo => {
        return (
        <li key={todo.id}>
          <label>
            <input type="checkbox" checked = {todo.completed}
            onChange={e => toggleToDo(todo.id, e.target.checked)}/>
            {todo.title}
          </label>
          <button onClick = {() => deleteToDo(todo.id)}className="btn btn-danger">Delete</button>
        </li>
        )
      })}      
    </ul>
    </>)
}
