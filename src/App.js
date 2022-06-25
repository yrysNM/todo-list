import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
// button-group
const buttons = [
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

  const handleAddItem = (e) => {

    if (label !== " ") {
      axios.post("http://localhost:3000/todoList", {
        label,
        done: "false"
      }).then(res => {
        setItems([...items, res.data])
        setSearchResults((prevElement) => [res.data, ...prevElement]);
      });

    }

    setLabel(" ");
  }

  const handleItemDone = (id) => {

  }



  return (
    <div className="todo-app">
      {/* App-header */}
      <div className="app-header d-flex">
        <h1>Todo List</h1>
        <h2>{"moreToDo"} more to do, {"doneToDo"} done</h2>
      </div>
      <div className="top-panel d-flex">
        {/* Search-panel */}

        <input
          type="text"
          className="form-control search-input"
          placeholder="type to search"
        // onChange={(e) => handleSearch(e)}
        />

        {/* Item-status-filter */}
        {buttons.map((btn, index) => {
          return (
            <div key={btn.type} className="btn-group">
              <button type="button" className={`btn btn-info ${filterType === btn.type ? "" : " btn-outline-info"}`}
              // onClick={() => handleFilterChange(btn.type)}
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
        {items.length > 0 &&
          items.map((item) => {
            return (
              <li className="list-group-item" key={item._id}>
                <span className={`todo-list-item ${(item.done === true) ? " done" : " "}`}>
                  <span className={`todo-list-item-label  ${(item.chColor === true) ? " text-warning" : ""}`}
                    onClick={() => {
                      if (item.task_id) {

                        handleItemDone(item.task_id);
                      } else if (item.id) {
                        handleItemDone(item.id);
                      }
                    }}>{item.label}</span>

                  <button
                    type="button"
                    className={`btn btn-outline-success btn-sm float-right`}
                  // onClick={() => changeColorWarning(item)}
                  >
                    <i className="fa fa-exclamation" />
                  </button>

                  <button
                    type="button"
                    className={`btn btn-outline-danger btn-sm float-right`}
                    onClick={() => {
                      // handleDelete(item)
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
  );
}
export default App;