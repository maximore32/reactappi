import React, { useState,useEffect } from 'react';
import { Switch,Route,Link,useParams } from 'react-router-dom'

const Libro = () => {
  const [user, setUser] = useState([])
  const usuarios = []
  let params = useParams();
  const getUser = () => {
    fetch('../api/ISBN/'+params.ISBN)
      .then(response => response.json())
      .then(user => {usuarios.push(user);setUser(usuarios);})
      .catch(err => console.log(err.message))
  }

  useEffect(() => { getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps 
}, [])
      return (  
      <section>
          {user.map(max =>
          <div key={max.ISBN}>
          <h1>Libro</h1>
          <p>Titulo: {max.Titulo}</p> 
          <p>Autor: {max.Autor}</p>
          <p>Pais: {max.Pais}</p>
          <p>Editorial: {max.Editorial}</p>
          <p><Link to="/">Regresar a la home</Link></p>
          </div>
        )} 
      </section>
    
  )
}


const Libros = () => {
    const [users, setUsers] = useState( [])
  
    function getUsers() {
      fetch('../api/')
        .then(response => response.json())
        .then(users => setUsers(users))
        .catch(err => console.log(err.message))
    }
  
    useEffect(() => {
      getUsers()
    }, [])
  
    

    return (  
        <ul>
          {users.map(user => <li key={user.ISBN}><Link to={"/books/"+user.ISBN}>{user.Titulo} ({user.Autor})</Link></li>)}        
        </ul>
      
    )
  }

  const App = () => (
        <div className="App">
          <header className="App-header">          
            <h1 className="App-title">Libros</h1>
          </header>
          <Switch>
            <Route exact path="/"><Libros/></Route>
            <Route exact path="/books/:ISBN"><Libro/></Route>
          </Switch>        
        </div>
      );
export default App;