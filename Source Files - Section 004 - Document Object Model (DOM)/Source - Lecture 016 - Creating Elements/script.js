// Lecture: Creating Elements

var newEl = document.createElement('button')

var text = document.createTextNode('Click')

newEl.appendChild(text)
newEl.setAttribute('style', 'display: block; margin: 10px auto; padding: 5px 10px; background: coral;color: #fff')
console.log(newEl);

var form = document.getElementById('add')

// form.appendChild(newEl)

form.insertBefore(newEl, form.children[0])
newEl.parentElement.removeChild(newEl)
console.log(form.children);












