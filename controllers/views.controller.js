const { readData, getOneItem } = require('../helpers/data');
const truncate = require("../helpers/truncate")

class Views {
    constructor(links) {
        this.links = links;
    }

    indexPage = (req, res) => {
        const items = readData();
    
        const length = items.length;
    
        const ageAverage = items.length !== 0? 
            items.map(e => e.age).reduce((a, b) => +a + +b,0) / length:
            0;
    
        const statistics = { length, ageAverage }
    
        res.render('index', { message: 'Hello, Komay!', links: this.links, statistics });
    };

    homePage = (req, res) => {
        res.render('home', { message: "Home page",links: this.links });
    }

    loginPage = (req, res) => {
        res.render('login', { message: 'Login'});
    }
    
    itemsPage = (req, res) => {
        const items = readData();
    
        res.render('items', { truncate, links: this.links, items, message: "Items table" });
    };
    
    addPage = (req, res) => {
        res.render('add', { links: this.links, message: "Add new item" });
    };
    
    editPage = (req, res) => {
        const id = parseInt(req.params.id);
    
        const item = getOneItem(id)
    
        res.render('edit', { links: this.links, message: "Update item", item });
    };
}

const links = [
    { title: "Home", route: '/' },
    { title: "All items", route: '/items' },
    { title: "Add new item", route: '/add' },
];

const views = new Views(links);

module.exports = views