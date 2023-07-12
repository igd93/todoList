import { useState } from "react"
import "./styles.css"

export default function App() {
  const [newItem, setNewItem] = useState("")
  const [toDos, setToDos] = useState([])

  function handleSubmit(e) {
    e.preventDefault()
  
    setToDos((currentToDos) => {
      return [...currentToDos, 
        { id : crypto.randomUUID(), title: newItem, completed: false}, 
        ]
    })
  
    setNewItem("")
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

  return <>
   <form onSubmit = {handleSubmit} className="new-item-form">
    <div className="form-row">
      <label htmlFor="item">New Item</label>
      <input       
        value = {newItem} 
        onChange= {e => setNewItem(e.target.value)}
        type="text" 
        id="item"/>
      <button className="btn">Add</button>
    </div>
    </form>
    <h1 className="header">ToDo List</h1>
    <ul className="list">
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
    </>
}
