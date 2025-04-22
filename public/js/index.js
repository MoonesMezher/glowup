class System {
    constructor() {
        this.addForm = document.getElementById('addForm');
        this.updateForm = document.getElementById('updateForm');
        this.loginForm = document.getElementById('loginForm');
        this.deleteBtns = Array.isArray(document.querySelectorAll(".delete")) ? document.querySelectorAll(".delete"): [...document.querySelectorAll(".delete")];
        this.editBtns = Array.isArray(document.querySelectorAll(".edit")) ? document.querySelectorAll(".edit"): [...document.querySelectorAll(".edit")];
        this.token = localStorage.getItem("token");

        this.events();
    }

    events() {
        this.addForm && this.addForm.addEventListener('submit', this.addItem.bind(this));
        this.deleteBtns && this.deleteBtns.forEach(e => e.addEventListener('click', this.deleteItem.bind(this)));
        this.updateForm && this.updateForm.addEventListener("submit", this.editItem.bind(this))
        this.loginForm && this.loginForm.addEventListener("submit", this.login.bind(this))
        this.protectRoutes();
    }

    protectRoutes() {
        if(
            location.pathname === "/items" 
            || location.pathname === "/add" 
            || location.pathname.includes("/edit") 
            || location.pathname === '/'
        ) {
            if(!localStorage.getItem("token")) {
                location.pathname = '/home';
            }
        } else if(location.pathname === '/login' || location.pathname === '/home') {
            if(localStorage.getItem("token")) {
                location.pathname = '/';
            }
        }
    }

    addItem(event) {
        event.preventDefault(); // Prevent the default form submission
    
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const problem = document.getElementById('problem').value;
        const order = document.getElementById('order').value;
        const place = document.getElementById('place').value;
        const notes = document.getElementById('notes').value || "لا يوجد";
    
        // Send the data to the server using fetch
        fetch('/api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "authorization": this.token
            },
            body: JSON.stringify({ name, age, problem, order, place, notes })
        })
        .then(response => {
            if(response.ok) {
                window.location.pathname = "/items";
            } else {
                window.location.pathname = "/home";            
            }
        })
        .catch(error => {
            window.location.pathname = "/home";            
        });    
    }

    deleteItem(event) {
        const id = event.target.getAttribute('data-id');
    
        fetch(`/api/items/delete/${id}`, {
            method: 'DELETE',
            headers: {
                "authorization": this?.token
            }
        })
        .then(response => {
            if (response.ok) {
                window.location.reload();
            } else {
                window.location.pathname = "/home";            
            }
        })
        .catch(error => {
            window.location.pathname = "/home";            
        });  
    }

    editItem(event) {
        event.preventDefault(); // Prevent the default form submission
    
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const problem = document.getElementById('problem').value;
        const order = document.getElementById('order').value;
        const place = document.getElementById('place').value;
        const notes = document.getElementById('notes').value || "لا يوجد";
        const id = document.getElementById("id").value;

        fetch(`/api/items/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "authorization": this.token
            },
            body: JSON.stringify({ name, age, problem, order, place, notes }) // Send updated data
        })
        .then(response => {
            if (response.ok) {
                window.location.pathname = '/';
            } else {
                window.location.pathname = "/home";            
            }
        })
        .catch(error => {
            window.location.pathname = "/home";            
        });   
    }

    login(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        fetch(`/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }) 
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                window.location.pathname = "/home";            
            }
        })
        .then(data => {
            localStorage.setItem("token", `Bearer ${data.token}`)
            window.location.pathname = '/';
        })
        .catch(error => {
            window.location.pathname = "/home";            
        });   
    }
}

new System();