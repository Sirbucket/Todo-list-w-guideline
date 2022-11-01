# Instructions  

I am going to walk you through creating a simple "TO DO List" Application in vanilla JavaScript, HTML and CSS.

I recommend making subtle changes to my code to make your own "TO DO" list app personalized as you go.

By the time we're done, you'll have learned some basic concepts, including:

- Some basic HTML/CSS layout.
- How to save data to the browser's storage.
- How to use templates in HTML.
- How to create basic animations using CSS and JavaScript together.

## Step 1: Mocking Up a To-Do List in TypeScript

For our first step, we'll think through what a TODO list
item should look like in TypeScript.

Let's keep a new file called `item.ts` to contain our to-do list item.

We'll first define a type for it, like this:

```typescript
export type TodoItem = {  
  description : string;
  completed : boolean;
  due : Date;
}
```

Note, I began very simple. It's easy to see how this kind of thing could grow more complicated -- you could add categories, for example, or sub-items, or partially completed work, or color-coding, or any other number of features.

For now, let's keep it simple. If you want to add one extra field, feel free, but otherwise, let's just make this basic.

## Step 2: Mocking Up a To-Do List in HTML & CSS

We're going to begin by creating a full TODO item in HTML that we can see. After we have it looking pretty good, we will wrap it in a template tag and connect it to JavaScript, but it's much easier to work if we create it in plain HTML.

Let's begin like this:

*index.html*
```html
<ol class="todo-list">
  <li class="todo-item">
    <label>
      <input type="checkbox">
      <span class="description">Make Breakfast</span>
      <div class="due">Due: September 8th</div>
    </label>                
  </li>
</ol>
```

At this point if you hit "run" you will see a very ugly looking list with a single item on it.

Let's add a little style to fix this up. 

*style.css*

Remove the numbers from the list and get rid of the big padding on the left that is the browser default for lists, replacing it with a modest 32px of padding and a little space on top of each item.

```css
.todo-list li {
  /* Don't show our numbers */
  list-style: none;
}

.todo-list {
  padding-left: 32px;
  margin-top: 16px;
}
```

We're going to use
the CSS grid to lay out our items. Grid's make it easy to build a layout grid and then place items into cells easily.

```css
.todo-item label {
  /* Lay each item label in our todo-item as a grid */
  display : grid;
  /* grid-template-areas let us name areas
  in the grid by using simple words. So here,
  the checkbox takes up two rows of the grid. */
  grid-template-areas : 
    "checkbox description"
    "checkbox due";
  /* This lets us specify the size of our columns,
  so the checkbox will be 48px and the right-hand size
  will be as big as it needs to be to fit the content */
  grid-template-columns: 48px auto;
}

.todo-item input {
  /* Put the checkbox in the checkbox area - this matches
  the words we used in grid-template-areas above */
  grid-area: checkbox;  
  place-self: center;
  /* Make our checkbox nice and big */
  width: 32px;
  height: 32px;  
}

.description {
  /* Make the description bigger */
  font-size: 24px;
  color: #222;
  grid-area : description
}

.due {
  grid-area : due;
  font-size: 16px;
  color: #666;
}
```

At this point, we should have a pretty good looking list item. Feel free to play with colors, fonts, etc if you like.

### Moving your item into a template tag
Once you're done, we're going to move our todo-item into a template tag which will make the browser not display it at all. The contents of `<body>` in your HTML will then look like this:

```html
  <template id="todo-item">
    <li class="todo-item">
      <label>
        <input type="checkbox">
        <span class="description">Make Breakfast</span>
        <div class="due">Due: September 8th</div>
      </label>                
    </li>  
  </template>
  <div id="app">
    <ol class="todo-list">
    </ol>
  </div>
```

And now you will have nothing displaying on the screen.

## Wiring up your JavaScript to your HTML

Let's go ahead and create a JavaScript file to contain our actual "app" logic -- I'm going to call it `app.ts`.

We'll create a new file called `app.ts` and then import it in `main.js`

*main.js*
```javascript
import './app';
```

*app.ts*: setting up the "skeleton" of our code

```typescript
import type {TodoItem} from './item';

function addItem (item: TodoItem) {
  /* Fix me */
  console.log('Add item',item,'(fix me)')
}

function testAddItem () {
  let testItem : TodoItem = {
    description : 'This is a test item',
    due : new Date(2022,9,12,4,30),
    completed : false,
  };
  addItem(testItem);
}

testAddItem();
```

The code above runs `testAddItem` when it loads. The test code, in turn, simply creates a sample item and "adds" is to our list. The `addItem` code doesn't do anything yet except put a message on the console. We should go ahead and make sure we're seeing a log message in our console at this point before we start the next step.

### Adding an Item to the Page

To add the item to the page, we basically have three steps.
1. Reach into the page and grab our list we'll add the item to.
2. Reach into the page and grab the template we'll use.
3. Clone the template, insert the data, and add it!

First, we'll need to grab the items we need, as follows:

*app.ts*
```typescript
const itemTemplate = document.querySelector('#todo-item');
const listContainer = document.querySelector('.todo-list');
```

Next, we'll need to write the `addItem` function:
*app.ts*
```typescript

function addItem (item: TodoItem) {
  // Copy our template
  let clone = itemTemplate.cloneNode(true);  
  // Grab the todo-item div from the template
  let itemDiv = clone.content.querySelector('.todo-item');  
  // Now set the text content of the items in the template
  itemDiv
    .querySelector('.description')  
    .textContent = item.description;
  itemDiv
    .querySelector('input')
    .checked = item.completed;
  itemDiv
    .querySelector('.due')
    .textContent = `Due ${item.due.toLocaleDateString()}`;
  // Add new item to list container!
  listContainer.appendChild(itemDiv);
  return itemDiv;
}  
```

At this point, you have JavaScript adding to your HTML. You should be able to mess around with your test function and see the results show up changed in your app. Try changing the text, making some items incomplete, adding multiple items, etc. 

One you're convinced your addItem function is working, it's time for the next step!

```html
  <li class="new-todo-item">
    <label>Description: <input type="text"></label>
    <label>Due: <input type="datetime"></label>
  </li>
</ol>
```

The tags in our HTML represent the basic structure of our list. We use the `<ol>` element to represent that our todo list is an ordered list. Each todo item is in a `<li>` element to represent it is a "list item."

## Adding an Interface for Adding Items

Let's add an interface in our HTML like this:
```html
  <div class="new-todo-item">
    <h2>New item:</h2>
    <div>
      <label>Description: <input class="desc" type="text"></label>
    </div>
    <div>
      <label>Due: <input class="due" type="datetime"></label>
    </div>
  </div>
```

Feel free to style that up if you like. Here's a basic template to start you off:

*style.css*
```css
.new-todo-item {
  border: 1px solid #aaa;
  padding: 1em;
  margin-left: 32px;
  width: 320px;
}
.new-todo-item h2 {
  font-size: 16px;
  margin: 0;
  border-bottom: 1px solid #aaa;
}
.new-todo-item label {
  display: inline-block;
  width: 18em;
  text-align: right;  
}
.new-todo-item div{
  margin-top: 12px;
}
.new-todo-item button {
  margin-left: 10em;
}
```

# Wiring up our button

Here's a sample function for wiring up our add button.
```typescript

function setupAddInterface () {
  let addButton = document.querySelector('.new-todo-item button');
  let descInput = document.querySelector('.new-todo-item .desc');
  let dueInput = document.querySelector('.new-todo-item .due');
  addButton.addEventListener(
    'click',
    function () {
      let item : TodoItem = {
        completed: false,
        description: descInput.value,
        due : new Date(dueInput.value),
      }
      addItem(item);
      // Reset inputs...
      descInput.value = '';
      dueInput.value = ''      
    }
  )
}
```

We then just need to call that function and we should be able to add new items to our list.

# Setting Up Local Storage...

In order to make a useful to-do list, we'll want it
to last longer than the life of a webpage. We'll start with the simplest storage method: local storage. 

## About Local Storage

Local storage allows us to store a series of key/value pairs. Both keys and values must be text, so we'll need to convert objects into text.

JavaScript provides a simple method for turning objects into text and viceversa.

```
let stringValue = JSON.stringify(anyObject);
```

And to reverse that:
```
let objectValue = JSON.parse(stringValue);
```

### A Simple Example to Start

Before we store a complex example like our whole to-do list in local storage, let's add something simple to our to-do list.

We'll add a "title" for the whole list, like this (I'll use contenteditable instead of an input for a change of pace -- contenteditable allows users to edit formatted items and allows users to do things like italicize with control-i or by pasting formatted text)

*html*
```html
<h1 contenteditable="true">
  My To Do List (change me!)
</h1>
```

Here is the JavaScript you'd need for an editable title to be stored -- I recommend putting it in its own typescript file (I named mine title.ts):

```typescript
let titleDiv = document.querySelector('h1');

// Get the value stored in local storage
let initialTitle = localStorage.getItem('title');
if (initialTitle) {
  // If a value is stored, use it!
  titleDiv.innerHTML = initialTitle;
} 

// Listen for any input events. Each time the
// user updates the element, update localStorage
titleDiv.addEventListener(
  'input',
  function () {
    console.log('Change to ',titleDiv.innerHTML);
    localStorage.setItem('title',titleDiv.innerHTML)
  }
);
```

## Setting Up Our To-Do List in Local Storage

The basic idea of setting up a list of objects in local storage is that we'd use code like the above, but add calls to `JSON.stringify` and `JSON.parse` as needed. Here's what it might look like:

Let's go ahead and create a separate file for our items -- I'll call mine `itemStore.ts`

```typescript
import type {TodoItem} from './item';

export let items : TodoItem[] = [];

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
```

Now back in our main "glue" code in `app.ts`, we just have to load the items when the application starts up and store the items each time they change (for now, just when an item is added):

```typescript
import {loadItems, storeItems, items} from './itemStore';
```

Then as a final step, we need to add new items to the list when they get created:

```typescript

  addButton.addEventListener(
      'click',
      function () {
        let item : TodoItem = {
          completed: false,
          description: descInput.value,
          due : new Date(dueInput.value),
        }
        // Add item to our list 
        // and store the revised list
        items.push(item)
        storeItems()
        // Now add item to webpage
        addItem(item);
        // Reset inputs...
        descInput.value = '';
        dueInput.value = ''      
      }
    )
```


And then we need to add some loading code for when we fire the thing up:

```typescript
function load() {
  loadItems();  
  for (let itm of items) {
    addItem(itm);
  }
}

load();
```

## State and Updates

That's just about all we need to do for our TO-DO app. Our only
other concern is making sure that any time we update the 
display, we also update our internal representation of what's
on the screen in the `items` list and that we save that to localStorage. The current status of our to-do items is what
developers call "state" and it's a source of complexity and
bugs in complex programs.

Next tasks would include:

- Add a changed handler to the checkbox indicating an item is done.
- Change the descriptions on existing items to be contenteditable=true and then update those items when the user changes them.

