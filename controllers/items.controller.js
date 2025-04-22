const fs = require('fs');
const { readData, writeData, deleteData, getOneItem, updateData } = require('../helpers/data');
const product = require('../schema/products');
const XLSX = require("xlsx");
const path = require('path');

class Items {
    constructor() {}
    addItem = (req, res) => {
        const { name, age, order, problem, place, notes } = req.body;
    
        // Check if all required fields are provided
        if (!name || !place || !age || !order || !problem || !notes) {
            return res.status(400).json({ state: "failed", message: "All fields are required" });
        }
    
        try {
            const data = readData();
            const id = data.length + 1;
            const newProduct = product(id, name, order, age, problem, place, notes);
            
            writeData(newProduct);
        
            return res.status(201).json({ state: "success", message: "Product Added Successfully", product: newProduct });
        } catch (error) {
            throw new Error(error.message);        
        }
    
    };
    
    updateItem = (req, res) => {
        try {
            const id = parseInt(req.params.id);
    
            let { name, age, order, problem, place, notes } = req.body;
    
            const item = getOneItem(id);
    
            if(!item) {
                return res.status(404).json({ state: "failed", message: "This item does not exist" })
            }
    
            name = name || item.name;
            age = age || item.age;
            order = order || item.order;
            problem = problem || item.problem;
            place = place || item.place;
            notes = notes || item.notes;
    
            const obj = { name, age, order, problem, place, notes }
    
            updateData(id, obj);
    
            return res.status(200).json({ state: "success", message: "Updated successfully" })
        } catch (err) {
            return res.status(500).json({ state: "failed", message: err.message})
        }
    }
    
    deleteItem = (req, res) => {
        try {
            const id = parseInt(req.params.id);
    
            const item = getOneItem(id);
    
            if(!item) {
                return res.status(404).json({ state: "failed", message: "This item does not exist" })
            }
    
            deleteData(id);
    
            return res.status(200).json({ state: "success", message: "Deleted successfully" })
        } catch (err) {
            throw new Error(error.message);        
        }
    }
    
    downloadItemsAsExcel = (req, res) => {
        // Read data from JSON file
        fs.readFile('./data/data.json', 'utf-8', (err, data) => {
            if (err) {
                throw new Error('Error reading data.');
            }
    
            // Convert JSON data to a JS object
            const jsonData = JSON.parse(data);
            
            // Create a new workbook and name the first sheet
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.json_to_sheet(jsonData);
            
            // Append the worksheet to the workbook
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    
            // Write the workbook to a .xlsx file
            const filePath = path.join(__dirname, 'data.xlsx');
            XLSX.writeFile(workbook, filePath);
    
            // Send the file as a response
            res.download(filePath, 'data.xlsx', (err) => {
                if (err) {
                    throw new Error('Error downloading the file.');
                }
                // Optionally, delete the file after sending it
                fs.unlinkSync(filePath);
            });
        });
    };
}

const items = new Items();

module.exports = items