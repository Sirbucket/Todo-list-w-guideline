import type { TodoItem } from "./item";
import {loadItems, storeItems, items} from './itemStore';

const itemTemplate = document.querySelector("#todo-item");
const listContainer = document.querySelector(".todo-list");

function updateItem(item: TodoItem, itemDiv: HTMLElement) {
    const description = itemDiv.querySelector(".description");
    const due = itemDiv.querySelector(".due");
    
    if (description.textContent != item.description) {
         item.description = description.textContent;  
    }
    // Items description to new description.
    
    if (due.textContent != item.due.toLocaleDateString()) {
        item.due = new Date(due.textContent);
    }
    //Items due date to new due date.
    
    items.splice(item.number, 1); //Remove the item and readd it.
    addItemToStorage(item);
}

function addItem(item: TodoItem) {
    const clone = itemTemplate.cloneNode(true);
    const itemDiv = clone.content.querySelector(".todo-item");
    const description = itemDiv.querySelector(".description");
    const due = itemDiv.querySelector(".due");
    
    description.textContent = item.description;
    due.textContent = `Due ${item.due.toLocaleDateString()}`;
    
    description.addEventListener("input", () => {
        if (description.textContent != item.description) {
            updateItem(item, itemDiv); //Don't call this function if we don't have to.
        }   
    });
    due.addEventListener("input", () => {
        if (due.textContent != item.due) {
            updateItem(item, itemDiv); // ^
        }   
    });    
    
    listContainer.appendChild(itemDiv);
    return itemDiv;
}

function addItemToStorage(item: TodoItem) {
    item.number = items.length //Set index for splice to index + 1.
    items.push(item);
    storeItems();
}

function clearStorage() {
    for (let i = items.length; i > 0; --i) { //Remove all items in the list.
        items.pop();
    }
    storeItems();
}

function load() {
    loadItems();  
    for (const item of items) { //Add each item in the list.
        addItem(item);
    }
}

function setupAddInterface() {
    const addButton = document.querySelector(".new-todo-item .submit");
    const clearButton = document.querySelector(".new-todo-item .clear")
    const descInput = document.querySelector(".new-todo-item .desc");
    const dueInput = document.querySelector(".new-todo-item .due");
    
    addButton.addEventListener("click", () => {
        if (items.length - 1 >= 15) { 
            return console.log("You have hit the limit."); //15 item limit.
        }
        
        const item: TodoItem = { //Create item.
            description: descInput.value,
            completed: false,
            due: new Date(dueInput.value),
            number: items.length
        }
        
        if ((descInput.value || dueInput.value) == '') {  //If input is empty in either box do not create an item.
            return console.log("This item is blank, give it a description and input!");
        }
        
        addItem(item); //Add item.
        addItemToStorage(item);
        
        descInput.value = ''; //Empty boxes.
        dueInput.value = '';
    });
    
    clearButton.addEventListener("click", () => {
        if (items[0] === undefined) { //If list is empty, don't clear list, we never insert an undefined into this list.
            return console.log("There are no items to clear, not clearing.");
        }
        
        clearStorage(); //Clear stuff.
        window.location.reload(); //Reload tab to clear list.
    });
}

load(); //Load the items from storage.
setupAddInterface(); //Load button functionality.