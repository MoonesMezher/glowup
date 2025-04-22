const fs = require('fs');
const path = require('path');

// Function to read data from JSON file
const readData = () => {
    const data = fs.readFileSync(path.join(__dirname, '../data/data.json'));
    return JSON.parse(data);
};

const getOneItem = (id) => {
    const items = readData();

    const item = items.find(e => e.id === id);

    return item || null;
}

// Function to write data to JSON file
const writeData = (data) => {
    const items = readData();
    items.push(data);

    items.sort((a, b) => a.id - b.id);

    fs.writeFileSync(path.join(__dirname, '../data/data.json'), JSON.stringify(items, null, 2));
};

const updateData = (id, data) => {
    const items = readData();
    
    // Find index of item to update
    const index = items.findIndex(e => e.id === id);
    
    if(index === -1) {
        throw new Error('Item not found');
    }

    // Merge existing data with new data while preserving ID
    const updatedItem = { 
        ...items[index],  // keep existing properties
        ...data,      // apply new properties
        id: id           // force keep original ID
    };

    // Update the array
    items[index] = updatedItem;

    // Write updated array back to file
    fs.writeFileSync(path.join(__dirname, '../data/data.json'), JSON.stringify(items, null, 2));
};

const deleteData = (id) => {
    const items = readData();

    const newItems = items.filter(e => e.id !== id);

    fs.writeFileSync(path.join(__dirname, '../data/data.json'), JSON.stringify(newItems, null, 2));
}

module.exports = {
    readData, 
    writeData,
    deleteData,
    getOneItem,
    updateData
}