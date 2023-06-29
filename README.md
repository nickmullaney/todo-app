# Todo App

This is a simple todo app built using React that allows users to manage their tasks and keep track of their todos.

# Author

[Nick Mullaney](https://github.com/nickmullaney) - Lead Developer

## Features

- Add new tasks
- Mark tasks as completed
- Edit existing tasks
- Delete tasks
- Filter tasks based on their completion status (completed or active)

## UML

![Lab 31](<src/assets/lab 31.png>)

## Code Sandbox

[Lab 31](https://codesandbox.io/p/github/nickmullaney/todo-app/context-settings?layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522panelType%2522%253A%2522TABS%2522%252C%2522id%2522%253A%2522cljf28ryh00bm356mal5eat18%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522panelType%2522%253A%2522TABS%2522%252C%2522id%2522%253A%2522cljf28ryh00bo356m4vdzs56s%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%252C%2522sizes%2522%253A%255B50%252C50%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522cljf28ryh00bm356mal5eat18%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522cljf28ryh00bl356m1cutg3xk%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252FREADME.md%2522%257D%255D%252C%2522id%2522%253A%2522cljf28ryh00bm356mal5eat18%2522%252C%2522activeTabId%2522%253A%2522cljf28ryh00bl356m1cutg3xk%2522%257D%252C%2522cljf28ryh00bo356m4vdzs56s%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522cljf28ryh00bn356mgyzygh14%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522PROJECT_SETUP%2522%257D%255D%252C%2522id%2522%253A%2522cljf28ryh00bo356m4vdzs56s%2522%252C%2522activeTabId%2522%253A%2522cljf28ryh00bn356mgyzygh14%2522%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D)

[Labn 32](https://codesandbox.io/p/github/nickmullaney/todo-app/phase2?layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522panelType%2522%253A%2522TABS%2522%252C%2522id%2522%253A%2522cljhicdb400i1356mu269qgcj%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522panelType%2522%253A%2522TABS%2522%252C%2522id%2522%253A%2522cljhicdb400i3356m2wkjilvl%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%252C%2522sizes%2522%253A%255B50%252C50%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522cljhicdb400i1356mu269qgcj%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522cljhicdb400i0356m4apoz5m6%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252FREADME.md%2522%257D%255D%252C%2522id%2522%253A%2522cljhicdb400i1356mu269qgcj%2522%252C%2522activeTabId%2522%253A%2522cljhicdb400i0356m4apoz5m6%2522%257D%252C%2522cljhicdb400i3356m2wkjilvl%2522%253A%257B%2522id%2522%253A%2522cljhicdb400i3356m2wkjilvl%2522%252C%2522tabs%2522%253A%255B%257B%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522start%2522%252C%2522id%2522%253A%2522cljhicpdq00od356mob7wecxr%2522%252C%2522mode%2522%253A%2522permanent%2522%257D%255D%252C%2522activeTabId%2522%253A%2522cljhicpdq00od356mob7wecxr%2522%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D)

## Technologies Used

- React
- HTML
- CSS
- JavaScript

## Getting Started

Follow these instructions to get the todo app up and running on your local machine.

1. Clone the repository:

   ```shell
   git clone https://github.com/nickmullaney/todo-app.git
   ```

2. Navigate to the project directory:

   ```shell
   cd todo-app
   ```

3. Install the dependencies:

   ```shell
   npm install
   ```

4. Start the development server:

   ```shell
   npm start
   ```

5. Open your browser and visit `http://localhost:3000` to view the app.

## Usage

- Add a new task by entering a task name and pressing the "Add" button.
- Mark a task as completed by clicking the checkbox next to it.
- Edit a task by clicking the pencil icon and modifying the task name.
- Delete a task by clicking the trash bin icon.
- Use the filter buttons at the top to show all tasks, active tasks, or completed tasks.

## License

This project is licensed under the [MIT License](LICENSE).

### Collaborators

Thanks to Reece, Ike, & Ryan for the collaboration