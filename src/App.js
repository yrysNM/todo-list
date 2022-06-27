import { useEffect, useState } from "react";
import axios from "axios";
import AppModal from "./components/app-modal/AppModal";

import editIcon from "./icons/edit.png";
import sortIcon from "./icons/sort.png";
import "./App.css";
// button-group
const buttons = [
  {
    type: "all",
    label: "All"
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
  // const api = new TodoistApi(_apiKey);

  let [label, setLabel] = useState("");

  let [sort, setSort] = useState(false);
  
  let [isOpen, setIsOpen] = useState(false);

  let [seletedIdOpen, setSelectedIdOpen] = useState(null);

  const [items, setItems] = useState([]);



  useEffect(() => {
    axios.get("http://localhost:3000/todoList")
      .then(response => setItems(response.data));
  }, []);


  const [filterType, setFilterType] = useState("all");
  const [searchResults, setSearchResults] = useState([]);

  /**
   * @param {filter to change}  
   */
  const heandleToDoChange = (e) => {

    setLabel(e.target.value);
  };

  /**
   * @param {add item} post method 
   */

  const handleAddItem = (e) => {

    if (label !== " ") {
      axios.post("http://localhost:3000/todoList", {
        label,
        done: false
      }).then(res => {
        setItems([...items, res.data])
        setSearchResults((prevElement) => [res.data, ...prevElement]);
      });

    }

    setLabel("");
  }

  // handle done or undone
  const handleItemDone = ({ _id }) => {
    setItems((prevItems) => prevItems.map((item) => {
      if (item._id === _id) {

        axios.put("http://localhost:3000/todoList/" + _id, {
          label: item.label,
          done: !item.done
        });
        return { ...item, done: !item.done };
      } else {
        return item;
      }
    }))
  }


  // simple warning 
  const changeColorWarning = ({ _id }) => {
    // console.log(key);
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item._id === _id) {
          return { ...item, chColor: !item.chColor };
        } else return item;
      }));
    setSearchResults((prevItems) =>
      prevItems.map((item) => {
        if (item._id === _id) {
          return { ...item, chColor: !item.chColor };
        } else return item;
      }));
  }

  /**
   * 
   * @param {delete item} delete method
   *  
   */
  const handleDelete = ({ _id }) => {
    axios.delete("http://localhost:3000/todoList/" + _id)

    setItems((prevItems) => prevItems.filter((item) => item._id !== _id));
  }

  const handleFilterChange = (type) => {
    setFilterType(type)
  }


  const handleSearch = (e) => {
    const val = e.target.value;

    const todos = items.filter(todo => {
      return todo.label.indexOf(val) > -1;
    });
    setSearchResults(todos);
    setFilterType("search");
    if (val === " " || val === "") {
      setFilterType("all");
    }
  }

  const sortTodo = () => {

    setSort(!sort);

    if (sort) {
      const strLabel = [...items].sort((a, b) => a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1);
      setItems(strLabel);
    }
    if (!sort) {
      const strLabel = [...items].sort((a, b) => a.label.toLowerCase() < b.label.toLowerCase() ? 1 : -1);
      setItems(strLabel);
    }
  }

  const openModal = (_id, done) => {
    setSelectedIdOpen([_id, done]);
    setIsOpen(true);
  }

  const closeModal = (isOpenModal) => {
    
    setIsOpen(isOpenModal);
  }

  const moreToDo = items.filter((item) => !item.done).length;
  const doneToDo = items.length - moreToDo;

  const filteredArray =
    filterType === "search" ? searchResults :
      filterType === "all" ? items :
        filterType === "done" ? items.filter((item) => item.done) : items.filter((item) => !item.done);

  return (

    <>
      <AppModal isOpen={isOpen} closeModal={closeModal} seletedIdOpen={seletedIdOpen} />
      <div className="todo-app">
        {/* App-header */}
        <div className="app-header d-flex">
          <h1>Todo List</h1>
          <h2>{moreToDo} more to do, {doneToDo} done</h2>
        </div>
        <div className="top-panel d-flex">

          <button className="btn btn-info btn-outline-info" style={{ "marginRight": "10px" }} onClick={sortTodo}>

            <img src={sortIcon} alt="img" width="35px" height="28px" style={{ "cursor": "pointer", "objectFit": "cursor", "height": 23 }} />
          </button>
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
                  onClick={() => handleFilterChange(btn.type)}
                >
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
                <li className="list-group-item" key={item._id}>
                  <span className={`todo-list-item ${(item.done === true) ? " done" : " "}`}>
                    <span className={`todo-list-item-label  ${(item.chColor === true) ? " text-warning" : ""}`}
                      onClick={() => handleItemDone(item)}>
                      {item.label}
                    </span>

                    {/**
                   * 
                   * @param {modal window}
                   * 
                   */}
                    <button type="button" className="btn btn-outline-sucess btn-sm float-right" style={{ "display": "flex", "justifyContent": "center", "alignItems": "center", "width": "35px", "height": "31px" }} 
                    onClick={() => openModal(item._id, item.done)} >
                      <img src={editIcon} alt="edit img" width="35" height="31" />
                    </button>

                    <button
                      type="button"
                      className={`btn btn-outline-success btn-sm float-right`}
                      onClick={() => changeColorWarning(item)}
                    >
                      <i className="fa fa-exclamation" />
                    </button>

                    <button
                      type="button"
                      className={`btn btn-outline-danger btn-sm float-right`}
                      onClick={() => {
                        handleDelete(item)
                      }}
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
            value={label}
            type="text"
            className="form-control"
            placeholder="What needs to be done"
            onChange={heandleToDoChange}
          />
          <button type="submit" onClick={handleAddItem} className="btn btn-outline-secondary">Add item</button>

        </div>
      </div>
    </>

  );
}
export default App;