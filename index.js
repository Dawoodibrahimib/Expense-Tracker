const fs = require('fs');

// Get the current date formatted as YYYY-MM-DD
const getCurrentDate = () => {
    const date = new Date();
    return date.toISOString().split('T')[0];
};

// Check if the correct command is provided
if (process.argv.length < 3) {
    console.error('Usage: node index.js <action> [id] [description] [amount]');
    process.exit(1);
}

const action = process.argv[2];
const description = process.argv[4];
const amount = parseFloat(process.argv[6]); // Ensure amount is a number
const id = parseInt(process.argv[4]); // For delete action

fs.readFile('expense.json', 'utf-8', (err, data) => {
    let expenses = [];

    if (err) {
        if (err.code === "ENOENT") {
            console.log("expense.json does not exist. Creating a new file.");
        } else {
            console.error("Error reading file:", err);
            return;
        }
    } else if (data.trim().length > 0) {
        try {
            expenses = JSON.parse(data);
        } catch (parseError) {
            console.error("Error parsing JSON data:", parseError);
            return;
        }
    }

    if (action === 'add') {
        if (!description || isNaN(amount)) {
            console.error('For "add" action, you need to provide a description and a valid amount');
            process.exit(1);
        }

        const maxId = expenses.length > 0 ? Math.max(...expenses.map(expense => expense.id)) : 0;
        const newExpense = {
            id: maxId + 1,
            description: description,
            amount: amount,
            createdAt: getCurrentDate(),
            updatedAt: getCurrentDate(),
        };

        expenses.push(newExpense);
        console.log("Expense added:", newExpense);

    } else if (action === 'delete') {
        if (isNaN(id)) {
            console.error('For "delete" action, you need to provide a valid id.');
            process.exit(1);
        }

        const expenseIndex = expenses.findIndex(expense => expense.id === id);
        if (expenseIndex !== -1) {
            const deletedExpense = expenses.splice(expenseIndex, 1);
            console.log("Expense deleted:", deletedExpense[0]);
        } else {
            console.error(`Expense with id ${id} not found.`);
            return;
        }

    } else if (action === 'list') {
        if (expenses.length > 0) {
            console.log("Listing all expenses:");
            expenses.forEach(expense => console.log(expense));
        } else {
            console.log("No expenses recorded.");
        }

    } else if (action === 'summary') {
        const month = parseInt(process.argv[4]); // Get month input
        if (isNaN(month) || month < 1 || month > 12) {
            console.error('Please provide a valid month (1-12) for the summary.');
            process.exit(1);
        }

        const currentYear = new Date().getFullYear();
        const filteredExpenses = expenses.filter(expense => {
            const expenseDate = new Date(expense.createdAt);
            return (
                expenseDate.getFullYear() === currentYear &&
                expenseDate.getMonth() + 1 === month
            );
        });

        const totalAmount = filteredExpenses.reduce((total, expense) => total + expense.amount, 0);

        console.log(`Summary for month ${month}:`);
        console.log("Total amount:", totalAmount);
        filteredExpenses.forEach(expense => console.log(expense));

    } else if (action === 'export') {
        exportToCSV(expenses);
    } else {
        console.error('Invalid action. Use "add", "delete", "list", "summary", or "export".');
        return;
    }

    if (['add', 'delete'].includes(action)) {
        fs.writeFile('expense.json', JSON.stringify(expenses, null, 2), (err) => {
            if (err) {
                console.error('Error writing to file:', err);
            } else {
                console.log('Expenses saved to expense.json successfully!');
            }
        });
    }
});

// Function to convert JSON data to CSV
const exportToCSV = (expenses) => {
    if (expenses.length === 0) {
        console.log('No expenses to export.');
        return;
    }

    const csvHeaders = 'id,description,amount,createdAt,updatedAt\n';
    const csvRows = expenses.map(expense =>
        `${expense.id},"${expense.description}",${expense.amount},${expense.createdAt},${expense.updatedAt}`
    );

    const csvContent = csvHeaders + csvRows.join('\n');

    fs.writeFile('expenses.csv', csvContent, (err) => {
        if (err) {
            console.error('Error writing CSV file:', err);
        } else {
            console.log('Expenses exported to expenses.csv successfully!');
        }
    });
};
