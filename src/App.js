import React from 'react';
import "./App.css"; 
import { useState } from 'react';

const App = () => {

  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]); 

  const [editid, seteditid] = useState(0); 


  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editid) {
      const edittodo = todos.find((i) => i.id === editid);
      const upedit = todos.map((t) =>
        t.id === edittodo.id ? (t = { id: t.id, todo }) : { id: t.id, todo: t.todo }
      );
      
      settodos(upedit); 
      seteditid(0); 
      settodo("");
      return;
    }

    if (todo !== '') {
      settodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
    }
    settodo("");
  };

  const handleDelete = (id) => {
    const deltodo = todos.filter((to) => to.id !== id);
    settodos([...deltodo]);

  };

  const handleEdit = (id) => {
    const edittodo = todos.find((i) => i.id === id); 
    settodo(edittodo.todo);
    seteditid(id);
  };
 
  return (
    <div className='App'>
      <div className='container' >
        <h1>Todo List App </h1>
        

         <form className='Inputform' onSubmit={handleSubmit} >  
          <input type='text' value = {todo} onChange={ (event)=>settodo(event.target.value) } />
          <button type="submit"> {editid?"Edit":"Go"}</button>
        </form>
        
        <ul className='Alltodos' >
          {
            todos.map((t) => (
              <li className='onetodo'>
              <span className='todotext'>{t.todo}</span>
              <button onClick={()=>handleEdit(t.id)} >Edit</button>
              <button onClick={()=>handleDelete(t.id)}>Delete</button>
            </li>))           
          }  
        </ul>

      </div>
    </div>
  )
}

export default App