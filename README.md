
# Expense Tracker

A simple command-line application for tracking expenses. This application allows users to add, delete, list, and summarize expenses, as well as export them to CSV format.

## Features

- **Add Expense**: Record a new expense with a description and amount.
- **Delete Expense**: Remove an expense by its ID.
- **List Expenses**: View all recorded expenses.
- **Summary**: Get a summary of expenses for a specific month of the current year.
- **Export to CSV**: Export expenses data to a CSV file.

## Installation

1. Clone this repository or download the code.
2. Navigate to the project directory.
3. Run `npm install` to install any necessary dependencies.


git clone <repository-url>
cd expense-tracker
npm install


## Usage

To use the application, you can run it in the command line with different actions:

### Add Expense

node index.js add --description "Lunch" --amount 20


### Delete Expense


node index.js delete --id 1

### List Expenses

node index.js list


### Summary of Expenses for a Specific Month


node index.js summary --month 10

### Export to CSV


node index.js export --format csv


## Commands

| Command       | Description                                              |
|---------------|----------------------------------------------------------|
| `add`        | Adds a new expense with a description and amount.       |
| `delete`     | Deletes an expense by ID.                               |
| `list`       | Lists all recorded expenses.                             |
| `summary`     | Provides a total amount for expenses in a specific month.|
| `export`      | Exports expenses data to CSV format.                     |

## Example

1. Adding an expense:
 
    node index.js add --description "Groceries" --amount 100
 

2. Deleting an expense:
 
    node index.js delete --id 1
    
3. Listing all expenses:
   
    node index.js list
   

4. Getting a summary for October:
   
    node index.js summary --month 10
   

## License

This project is licensed under the MIT License.

## Contributing

Feel free to submit issues or pull requests for enhancements.

## Note

This application reads from and writes to a `expense.json` file, so make sure you have the necessary permissions to create and modify files in your project directory.
