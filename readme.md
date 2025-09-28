# Tasks Tracker 📝

This project is a command-line interface (CLI) application for managing tasks, inspired by a challenge from the **[roadmap.sh/projects/task-tracker](https://roadmap.sh/projects/task-tracker)** roadmap. It allows users to add, delete, update, and list tasks, as well as track their status (to-do, in-progress, or done).

## Features ✨

* **Add Tasks**: Create new tasks with a description.
* **Delete Tasks**: Remove tasks by their unique ID.
* **Update Tasks**: Modify the description of an existing task.
* **Change Status**: Mark tasks as "in-progress" or "completed".
* **List Tasks**: View all tasks or filter them by status (to-do, in-progress, or done).

---

## How to Run 🚀

### Prerequisites
Make sure you have Node.js installed on your machine. You can download it from the official **[Node.js website](https://nodejs.org/)**.

### Installation
1.  Clone this repository to your local machine.
2.  Navigate to the project directory.

### Usage
To use the application, run the `index.js` file from your terminal with the following commands:

* **Add a new task**:
    ```bash
    node index.js add "Your task description here"
    ```

* **Delete a task**:
    ```bash
    node index.js delete <task_id>
    ```

* **Update a task**:
    ```bash
    node index.js update <task_id> "New task description here"
    ```

* **Start a task**:
    ```bash
    node index.js start <task_id>
    ```

* **Complete a task**:
    ```bash
    node index.js complete <task_id>
    ```

* **List all tasks**:
    ```bash
    node index.js list
    ```

* **List completed tasks**:
    ```bash
    node index.js list done
    ```

* **List in-progress tasks**:
    ```bash
    node index.js list in-progress
    ```

* **List to-do tasks**:
    ```bash
    node index.js list todo
    ```

---

## Project Structure 📁

The project consists of a single `index.js` file that handles all the logic. It uses a `tasks.json` file to persist the tasks.

* **`index.js`**: The main file containing all the functions for task management and the command-line logic.
* **`tasks.json`**: (Automatically created) A JSON file that stores all the tasks.

---

## Contributing 🤝

Feel free to open an issue or submit a pull request if you want to improve this project.

## License 📜

This project is licensed under the MIT License.