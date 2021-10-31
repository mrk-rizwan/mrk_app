import React, { useState, useEffect } from 'react'
import './style.css'

const getLocalData =()=>{
    const list = localStorage.getItem('mrkTodo');
    if(list){
        return JSON.parse(list);
    }else
        return [];
}
const Todo = () => {
    const [inputdata, setInputdata] = useState("");
    const [items, setItems] = useState(getLocalData);
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);
    const additem = () =>{
        if(!inputdata){
            alert('Please fill')
        }else if(inputdata && toggleButton){
            setItems(
                items.map((currentElem)=>{
                    if(currentElem.id === isEditItem){
                        return {...currentElem, name: inputdata}
                    }
                    return currentElem;
                })
            )
            setToggleButton(false);
            setInputdata("");
            setIsEditItem(null);
        }
        
        else{
            const myNewInputData = {
                id : new Date().getTime().toString(),
                name : inputdata
            };
            setItems([...items, myNewInputData]);
            setInputdata('');
        }
    };
    const deleteItem =(index)=>{
        const updatedItems = items.filter((currentElem) =>{
            return currentElem.id !== index;
        });
        setItems(updatedItems);
    }
    const removeAll =()=>{
        setItems([]);
    }
    const editItem =(index)=>{
        const updated_item = items.find((currentElem)=>{
            return currentElem.id === index;
        })
        setToggleButton(true);
        setInputdata(updated_item.name);
        setIsEditItem(index);
    };
    useEffect(() => {
        localStorage.setItem('mrkTodo', JSON.stringify(items));
    }, [items])
    return (
        <>
            <div
            className="main-div"
            >
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg" alt="todo-logo"/>
                        <figcaption>Add your List Here👇</figcaption>
                         
                    </figure>
                    <div className="addItems">
                        <input type="text"
                        placeholder="✍ Add Item" className="form-control"
                        value={inputdata}
                        onChange={(e)=> setInputdata(e.target.value)}
                        />
                        {
                        toggleButton? 
                        <i className="fa-edit fa add-btn" onClick={additem}></i> 
                        : <i className="fa-plus fa add-btn" onClick={additem}></i>
                        }
                    </div>
                    <div className="showItems">
                        {items.map((currentElem)=>{
                            return(
                                <div className="eachItem" key={currentElem.id}>
                                    <h3>{currentElem.name}</h3>
                                    <div className="todo-btn">
                                    <i className="fa-edit far add-btn" onClick={()=>editItem(currentElem.id)}></i>
                                    <i className="fa-trash-alt far add-btn" onClick={()=>deleteItem(currentElem.id)}></i>
                                    </div>
                                </div>
                            );
                        })}
                        
                    </div>
                    <div className="showItems"><button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>CheckList</span></button></div>
                </div>
            </div>
        </>
    )
}

export default Todo
