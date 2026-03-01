import { React, useState } from "react";
import { Home, Trash, SquarePen } from "lucide-react";
import "../App.css";
const Form = () => {
  const [state, setState] = useState({
    todos: [],
    task: "",
    editId: null,
    editText: ""
  });
  const handlechange = (e) => {
    console.log(e.target.value);
    setState({
      ...state,
      task: e.target.value,
    });
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    if (state.task.trim() == " ") return
    setState({
      ...state,
      todos: [
        ...state.todos,
        {
          id: `${new Date().toLocaleTimeString()}`,
          todo: state.task,
          status: "incomplete",

        },
      ],
      task: "",
    });
  };

  const handledelete = (id) => {
    const filtertodos = state.todos?.filter((item) =>
      item.id !== id)
    setState({
      ...state,
      todos: filtertodos,
    })
  }
  const handleedit = (todo) => {
    setState({
      ...state,
      editId: todo.id,
      editText: todo.todo
    })
  }


  const handlesave = () => {
    const updatedtodos = state.todos.map((item) => {
      if (item.id === state.editId) {
        return {
          ...item,
          todo: state.editText,
        }
      };
        return item
      
    });
      setState({
        ...state,
        todos: updatedtodos,
        editText: "",
        editId: null
      })
  }


return (
  <>
    <div className="Form">
      <form>
        <input
          type="text"
          placeholder="Enter you Task "
          onChange={handlechange}
          value={state.task}
        ></input>
        <button type="submit" onClick={handlesubmit}>
          Add
        </button>
      </form>
    </div>
    <ul>
      {state.todos?.map((items) => {
        return (
          <>
            <li key={items.id}>
              {state.editId === items.id ? (
                <>
                  <input
                    type="text"
                    onChange={(e) => {
                      setState({
                        ...state,
                        editText: e.target.value
                      })
                    }}
                  ></input>
                  <button type="submit" onClick={handlesave}>
                    Save
                  </button>
                </>
              ) : (
                <>
                  <div className="li-items">{items.todo}</div>
                  <div className="li-items">{items.id}</div>

                  <div className="li-items">{items.status}</div>
                  <i className="li-items" onClick={() => { handledelete(items.id) }}><Trash /></i>
                  <i className="li-items" onClick={() => { handleedit(items) }}><SquarePen /></i>

                </>
              )}
            </li>
          </>
        );
      })}
    </ul>
  </>
);
}
export default Form;
