import type {TodoItem} from './item';

export const items : TodoItem[] = [];

export function storeItems () {
  localStorage.setItem('items',JSON.stringify(items));
}

export function loadItems () {
    if (localStorage.getItem('items')) {
        let loadedItems = [];
        try {
            loadedItems = JSON.parse(localStorage.getItem('items'));
        } catch (err) {
            console.log(
                'Error parsing stored items: ',
                err,
                localStorage.getItem('items')
            )      
        }
        for (let item of loadedItems) {
            // Note: dates don't get converted back...
            item.due = new Date(item.due);
            // Add our item back to the list...
            items.push(item);      
        }
    }
}