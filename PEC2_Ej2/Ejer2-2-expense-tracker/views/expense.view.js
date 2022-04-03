class ExpenseView {
    constructor(){
        //APP
        this.app = this.getElement("#root");
        //H2 TITLE
        this.title = this.createElement("h2", "title");
        this.title.textContent = "ExpenseTracker";
        //INPUT TEXT EXPENSE
        this.inputText = this.createElement("input", "textExpense");
        this.inputText.type = "text";
        this.inputText.placeholder = "Add Text";
        this.inputText.name = "expense";
        //INPUT AMOUNT EXPENSE
        this.inputAmount = this.createElement("input", "amountExpense");
        this.inputAmount.type = "number";
        this.inputAmount.placeholder = "Add Amount";
        //INPUT BUTTON
        this.submitButton = this.createElement("button");
        this.submitButton.textContent = "Submit";
        //LIST TITTLE
        this.listTittle = this.createElement("h3", "list-tittle");
        this.listTittle.textContent = "List of Expenses";
        //LIST OF EXPENSES
        this.expenseList = this.createElement("ul", "expense-list");
        //FORM
        this.form = this.createElement("form");
        this.form.append(this.inputText, this.inputAmount, this.submitButton);

        //APPEND ON APP
        this.app.append(this.title, this.form, this.listTittle, this.expenseList);

        this._initLocalListeners();
    }

    //GETTERS
    get _expenseText(){
        return this.inputText.value;
    }

    get _expenseAmount(){
        return this.inputAmount.value;
    }

    _resetInput(){
        this.inputAmount.value = "";
        this.inputText.value = "";
    }

    createElement(tag, className) {
        const element = document.createElement(tag);
    
        if (className) element.classList.add(className);
    
        return element;
    }
    
    getElement(selector) {
        const element = document.querySelector(selector);
    
        return element;
    }

    displayExpenses(expenses) {
        // Delete all nodes
        while (this.expenseList.firstChild) {
          this.expenseList.removeChild(this.expenseList.firstChild);
        }
    
        // Show default message
        if (expenses.length === 0) {
          const p = this.createElement("p");
          p.textContent = "Nothing to do! Add a Expense?";
          this.expenseList.append(p);
        } else {
          // Create nodes
          expenses.forEach(expense => {
            const li = this.createElement("li");
            li.id = expense.id;
    
            const spanText = this.createElement("span");
            spanText.contentEditable = true;
            spanText.classList.add("editable");
            spanText.textContent = "Text: " + expense.text;

            const spanAmount = this.createElement("span");
            spanAmount.contentEditable = true;
            spanAmount.classList.add("editable");
            spanAmount.textContent = "Amount: " + expense.amount;

            const deleteButton = this.createElement("button", "delete-btn");
            deleteButton.innerText = "Delete";

            li.append(spanText, spanAmount, deleteButton);

            // Append nodes
            this.expenseList.append(li);
          });
        }
    
        // Debugging
        console.log(expenses);
    }

    _initLocalListeners() {

    }

    bindAddExpense(handler) {
        this.form.addEventListener("submit", event => {
            event.preventDefault();
            if (this._expenseAmount && this._expenseText){
                handler(this._expenseText, this._expenseAmount);
                this._resetInput();
            }
        });
    }

    bindDeleteExpense(handler){
        this.expenseList.addEventListener("click", event => {
            console.log("delete");

            const id = event.target.parentElement.id;

            handler(id);
        });
    }
}



