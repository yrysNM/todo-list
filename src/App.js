import { useEffect, useState } from "react";

import {v4 as uuidv4} from "uuid";
import { TodoistApi } from "@doist/todoist-api-typescript";

import "./App.css";

// button-group
const buttons = [
  {
    type: "all",
    label: "All",
  },
  {
    type: "active",
    label: "Active",
  },
  {
    type: "done",
    label: "Done",
  },
];

const  _apiKey = "0b7a39d1d230551375e150c26964761f15f93288";

const api = new TodoistApi(_apiKey);



function App() {

  // const api = new TodoistApi(_apiKey);

  
  let [itemToDo, setItemToDo] = useState("");
  
  
  
  const[items, setItems] = useState([]);
  useEffect(()=> {
    
    api.getTasks().then((response) =>  setItems(response))
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);



  const[filterType, setFilterType] = useState("all");

  const[searchResults, setSearchResults] = useState([]);

  const heandleToDoChange = (e) => {
    setItemToDo(e.target.value);
  };



  const handleAddItem = (e) => {

    
    if(itemToDo !== "") {
      
      const newItem = {key: uuidv4(), label: itemToDo};
      api.addTask({
        content: itemToDo,
        projectId: 2203306141,
      })
      
      setItems((prevElement) => [newItem, ...prevElement]);
      setSearchResults((prevElement) => [newItem, ...prevElement]);
    }



    setItemToDo("");
  };

  const handleItemDone = ({id}) => {
    setItems((prevItems) =>  
    
    prevItems.map((item) => {
      if(item.id === id) {
          if(!item.done) {
            api.closeTask(id).then((isSuccess) => console.log(isSuccess))
          }
           
          
          api.reopenTask(id).then((isSuccess) => console.log(isSuccess));

            return {...item, done: !item.done};
          


          }else return  item;
        })
      );
      setSearchResults((prevItems) =>  
      
        prevItems.map((item) => {
          if(item.id === id) {
            return {...item, completed: !item.completed};
          }else return  item;
        })
      );
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
  }
  
  const changeColorWarning = ({id}) => {
    // console.log(key);
    setItems((prevItems) => 
    prevItems.map((item)=> {
      if(item.id === id) {
        return {...item, chColor: !item.chColor}; 
      }else return item;
    }));
    setSearchResults((prevItems) => 
    prevItems.map((item)=> {
      if(item.id === id) {
        return {...item, chColor: !item.chColor}; 
      }else return item;
    }));
  }

  const handleDelete = ({id}) => {
  
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      setSearchResults((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  const handleSearch = (e) => {
    const value = e.target.value; 

    
    const todos = items.filter(todo => {
      return todo.content.indexOf(value) > -1; 
    })
    
    setSearchResults(todos);
    setFilterType("search");
  };

  const moreToDo= items.filter((item) => !item.done).length; 

  const doneToDo = items.length - moreToDo; 

  const filteredArray =
  filterType === "search" ? searchResults : 
  filterType === "all"    ? items         : 
  filterType === "done"   ? items.filter((item) => item.done) : items.filter((item) => !item.done);


  return (
    <div className="todo-app">
      {/* App-header */}
      <div className="app-header d-flex">
        <h1>Todo List</h1>
        <h2>{moreToDo} more to do, {doneToDo} done</h2>
      </div>

      <div className="top-panel d-flex">
        {/* Search-panel */}
      
        <input    
          type="text"
          className="form-control search-input"
          placeholder="type to search"
          onChange={(e) => handleSearch(e)}
        />
       
        {/* Item-status-filter */}
        {buttons.map((btn, index) => {
          return (
              <div key={btn.type} className="btn-group">
                <button type="button" className={`btn btn-info ${filterType === btn.type ? "" : " btn-outline-info"}`}
                onClick={() => handleFilterChange(btn.type)}>
                  {btn.label}
                </button>
     
              </div>
            );
          })}
          {/* Button group */}
      </div>

      {/* List-group */}
      <ul className="list-group todo-list">
        {/* simple item */}
        {filteredArray.length > 0 && 
        filteredArray.map((item) => {
          return (

              <li className="list-group-item" key={item.id}>
                <span  className={`todo-list-item ${(item.done === true) ? " done" : " "}`}>
                  <span className={`todo-list-item-label  ${(item.chColor === true) ? " text-warning" : ""}`}
                    onClick={() => handleItemDone(item)}>{item.content}</span>
  
                  <button
                    type="button"
                    className={`btn btn-outline-success btn-sm float-right`}
                    onClick={() => changeColorWarning(item)}
                  >
                    <i className="fa fa-exclamation" />
                  </button>
  
                  <button
                    type="button"
                    className= {`btn btn-outline-danger btn-sm float-right`}
                    onClick={() => handleDelete(item)}
                  >
                    <i className="fa fa-trash-o" />
                  </button>
                </span>
              </li>

          );
        })}

       
      </ul>

      <div className="item-add-form d-flex">
        
        <input
          value={itemToDo}
          type="text"
          className="form-control"
          placeholder="What needs to be done"
          onChange = {heandleToDoChange}
        />
        <button type="submit" onClick={handleAddItem} className="btn btn-outline-secondary">Add item</button>
      </div>
    </div>
  );
}

export default App;