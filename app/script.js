const form = document.querySelector('#todoForm');
const input = document.querySelector('#todoInput');
const output = document.querySelector('#output');

let todos = [];

const fetchTodos = async () => {
    const res = await fetch('http://localhost:9999/api/todos')
    const data = await res.json();

    todos = data;
    console.log(todos);
    listTodos();
}

fetchTodos();

const listTodos = () => {
    output.innerHTML = '';
    todos.forEach(todo => {
        newTodo(todo);
    })
}

const newTodo = todo => {

    let card = document.createElement('div');
    card.classList.add('card', 'p-3', 'mb-3')

    let innerCard = document.createElement('div');
    innerCard.classList.add('d-flex', 'justify-content-between', 'align-items-center');

    let title = document.createElement('h3');
    title.classList.add('title', 'my-0');

    if(todo.completed) 
        title.classList.add('complete');
    title.innerText = todo.title;

    title.addEventListener('click', () => updateTodo(todo));

    let button = document.createElement('button');
    button.classList.add('btn', 'btn-sm', 'btn-danger', 'px-3');
    button.innerText = 'X';

    button.addEventListener('click', () => deleteTodo(todo));

    innerCard.appendChild(title);
    innerCard.appendChild(button);
    card.appendChild(innerCard);
    output.appendChild(card);

}

const deleteTodo = async todo => {
    if(todo.completed) {
    await fetch(`http://localhost:9999/api/todos/${todo._id}`, {
        method: 'DELETE'
    }) 
    fetchTodos();
}else {
    alert('You must have marked it done first!')
}
    
}

const updateTodo = (todo) => {
    // console.log(todo);
    fetch(`http://localhost:9999/api/todos/${todo._id}`, {
        method: 'PATCH',
        headers: {
           'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            completed: !todo.completed
        })
    })
    .then(res => res.json())
    .then(data => {
        if(data.status == true)
        fetchTodos();
    })

}

const createTodo = title => {
    
    fetch('http://localhost:9999/api/todos/new', {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            title
        })
    })
    .then(res => res.json())
    .then(data => {
       
        if(data.status)
        fetchTodos();
    })
}

form.addEventListener('submit', e => {
    const remind = document.querySelector('#remind');
    const error = remind.nextElementSibling;
  //Gör så hemsidan laddar inte om
    if(input.value.trim() !== '') {
        createTodo(input.value);
        error.classList.remove('is-invalid');
        error.innerText = '';
        form.reset();
    }
    else {
        e.preventDefault();
        error.classList.add('is-invalid');
        error.innerText = 'You forgot to add todos';
    }

})

