import { useState } from "react";
import axios from "axios";

import "./appModal.css";
const AppModal = ({isOpen, closeModal, seletedIdOpen}) => {

    const [isOpenModal, setIsOpenModal] = useState(isOpen);
    const [inputValue, setInputValue] = useState("");
    const closeModalWindow = (isOpen) =>{
        setIsOpenModal(!isOpen);
        closeModal(isOpenModal);
    }

    const setValue = (e) => {
        setInputValue(e.target.value);
    }
    const editItem = (e) =>{

        
        axios.put("http://localhost:3000/todoList/" + seletedIdOpen[0], {
            label: inputValue, 
            done: seletedIdOpen[1]
        });
        
    }

    return (
        <>
            {isOpen && (
                <div className="overlay">
                    <div className="modal">
                        <div onClick={closeModalWindow} className="modal__close">
                            &times;
                        </div>
                        <div className="modal_title">
                            <h2>Edit todo</h2>

                        </div>
                        <form onSubmit={editItem}>
                            <input type="text" value={inputValue} name="edit" onChange={setValue} />

                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default AppModal;