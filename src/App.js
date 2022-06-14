import { useEffect, useState } from "react";

import {v4 as uuidv4} from "uuid";

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


function App() {

  let data = [
    {
      key: 1,
      label: "Have fun",
    },
    {
      key: 2,
      label: "Spread Empathy",
    },
    {
      key: 3,
      label: "Generate Value",
    }
  ];

  let [itemToDo, setItemToDo] = useState("");
  // const [items, setItems] = useState(data);

  
  const[items, setItems] = useState(JSON.parse(localStorage.getItem('is-open')));
  
  useEffect(() => {
    localStorage.setItem('is-open', JSON.stringify(items));
  }, [items]);



  const[filterType, setFilterType] = useState("all");

  const[searchTerm, setSearchTerm] = useState("");
  const[searchResults, setSearchResults] = useState([]);

  const heandleToDoChange = (e) => {
    setItemToDo(e.target.value);
  };



  const handleAddItem = (e) => {

    if(itemToDo !== "") {
      
      const newItem = {key: uuidv4(), label: itemToDo};
      
      setItems((prevElement) => [newItem, ...prevElement]);
    }



    setItemToDo("");
  };

  const handleItemDone = ({key}) => {
      setItems((prevItems) =>  
      
        prevItems.map((item) => {
          if(item.key === key) {
            return {...item, done: !item.done};
          }else return  item;
        })
      );
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
  }
  
  const changeColorWarning = ({key}) => {
    console.log(key);
    setItems((prevItems) => 
    prevItems.map((item)=> {
      if(item.key === key) {
        return {...item, chColor: !item.chColor}; 
      }else return item;
    }));
  }

  const handleDelete = ({key}) => {
  
      setItems((prevItems) => prevItems.filter((item) => item.key !== key));
  }

  const handleSearch = (e) => {
    const value = e.target.value; 

    setFilterType("search");

    const todos = items.filter(todo => {
      return todo.label.indexOf(value) > -1; 
    })

    setSearchResults(todos);
  };

  const moreToDo= items.filter((item) => !item.done).length; 

  const doneToDo = items.length - moreToDo; 

  const filteredArray =
  filterType === "search" ? searchResults : 
  filterType === "all"    ? items         : filterType === "done"
      ? items.filter((item) => item.done) : items.filter((item) => !item.done);


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

              <li className="list-group-item" key={item.key}>
                <span  className={`todo-list-item ${(item.done === true) ? " done" : " "}`}>
                  <span className={`todo-list-item-label  ${(item.chColor === true) ? " text-warning" : ""}`}
                    onClick={() => handleItemDone(item)}>{item.label}</span>
  
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
        <button onClick={handleAddItem} className="btn btn-outline-secondary">Add item</button>
      </div>
    </div>
  );
}

export default App;