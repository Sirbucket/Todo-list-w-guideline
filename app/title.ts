let titleDiv = document.querySelector('h1');

// Get the value stored in local storage
let initialTitle = localStorage.getItem('title');
if (initialTitle) {
    // If a value is stored, use it!
    titleDiv.innerHTML = initialTitle;
} 

// Listen for any input events. Each time the
// user updates the element, update localStorage
titleDiv.addEventListener('input', () => {
    console.log('Change to ',titleDiv.innerHTML);
    localStorage.setItem('title',titleDiv.innerHTML)
});