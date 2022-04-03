class ExpenseService {
    constructor() {
        this.expenses = (JSON.parse(localStorage.getItem("expenses")) || []).map(
            (expense) => new Expense(expense.text, expense.amount)
        );
    }

    bindExpensesListChanged(callback) {
        this.onExpenseListChanged = callback;
    }

    _commit(expenses){
        this.onExpenseListChanged(expenses);
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    addExpense(text, amount) {
        this.expenses.push(new Expense(text, amount));
    
        this._commit(this.expenses);
    }

    deleteExpense (_id){
        console.log(this.expenses);
        console.log(_id);
        this.expenses = this.expenses.filter(({ id }) => id !== _id);
        console.log(this.expenses);
        this._commit(this.expenses);
    }
    

}