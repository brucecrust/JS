class Column {

    constructor(elementId, countId) {
        this.items = new Map();
        this.count = this.items.size;
        this.elementId = elementId;
        this.countId = countId;
        this.node = document.getElementById(this.elementId);
        this.countNode = document.getElementById(this.countId);
    }

    updateCount() {
        this.count = this.items.size;
        this.countNode.innerHTML = "|(" + this.count.toString() + ")";
    }
}

class Todo extends Column {

    constructor() {
        super("todo", "todoCount");
    }

    add(item) {
        item.toolbar.appendChild(item.close);

        if (item.complete) {
            item.checkbox.addEventListener("click", () => {
                closeItem(item);
            });

            item.complete = false;
        }

        this.items.set(item, item.node);
        this.node.appendChild(item.node);
        this.updateCount()
    }

    remove(item) {
        this.items.delete(item);
        item.node.remove();
        item.complete = true;
        this.updateCount();
    }
}

class Done extends Column {

    constructor() {
        super("done", "doneCount");
    }

    add(item) {
        item.checkbox.addEventListener("click", () => {
            openItem(item);
        });

        this.items.set(item, item.node);
        this.node.appendChild(item.node);
        this.updateCount();
    }

    remove(item) {
        this.items.delete(item);
        item.node.remove();
        this.updateCount();
    }
}

class TodoItem {

    constructor() {
        this.node = null;
        this.toolbar = null;
        this.checkbox = null;
        this.close = null;
        this.complete = false;
    }

    generateName() {
        return Math.floor(Math.random() * 1000).toString();
    }

    create() {
        // Create the parent of the todo item
        let item = document.createElement("article");
        item.id = this.generateName();

        // Create a checkbox, and its parent
        let todoToolbar = document.createElement("span");
        todoToolbar.className = "todoToolbar";

        let checkbox = document.createElement("input");
        checkbox.className = "checkbox";
        checkbox.type = "checkbox";

        let close = document.createElement("span");
        close.className = "close"
        close.textContent = "✖";

        // Create the Todo input area
        let input = document.createElement("textarea");
        input.className = "todoInput";

        checkbox.addEventListener("click", () => {
            closeItem(this);
        });

        close.addEventListener("click", () => {
            deleteItem(this);
        });

        // Assign children and set the node
        todoToolbar.appendChild(checkbox);
        todoToolbar.appendChild(close);
        item.appendChild(todoToolbar);
        item.appendChild(input);

        this.node = item;
        this.toolbar = todoToolbar;
        this.checkbox = checkbox;
        this.close = close;
    }
}

let todo = new Todo();
let done = new Done();

function closeItem(item) {
    todo.remove(item);
    done.add(item);
}

function openItem(item) {
    done.remove(item);
    todo.add(item);
}

function deleteItem(item) {
    if (done.items.has(item)) {
        done.items.delete(item);
        done.updateCount();
    }

    if (todo.items.has(item)) {
        todo.items.delete(item);
        todo.updateCount();
    }

    item.node.remove();
}

function createItem() {
    let item = new TodoItem();
    item.create();

    todo.add(item);
}

function main() {
    document.getElementById("addTodo").onclick = createItem;
    todo.updateCount();
    done.updateCount();
}

main();