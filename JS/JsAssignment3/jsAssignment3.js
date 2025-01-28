document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task");
    const dateInput = document.getElementById("task-date");
    const timeInput = document.getElementById("task-time");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskListContainer = document.querySelector(".task-list-container");
    const searchInput = document.getElementById("search-bar"); 

    let isEditing = false;
    let editingIndex = null;

    
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        displayTasks(tasks);
    };

    
    const saveTask = (task) => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    
    const updateTask = (index, updatedTask) => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks[index] = updatedTask;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    
    const deleteTask = (index) => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    
    const clearFields = () => {
        taskInput.value = "";
        dateInput.value = "";
        timeInput.value = "";
        isEditing = false;
        editingIndex = null;
        addTaskBtn.textContent = "Add Task";
    };

    
    const displayTasks = (tasks) => {
        taskListContainer.innerHTML = "";

        const today = new Date().toISOString().split("T")[0];
        const todayDateFormatted = today.split("-").reverse().join("/");

        const dueTasks = tasks.filter((task) => task.date < today);
        const todayTasks = tasks.filter((task) => task.date === today);
        const upcomingTasks = tasks.filter((task) => task.date > today);

        
        if (dueTasks.length > 0) {
            const dueHeading = document.createElement("h1");
            dueHeading.textContent = "Due Tasks";
            taskListContainer.appendChild(dueHeading);
            displayTasksWithDates(dueTasks);
        }

        
        if (todayTasks.length > 0) {
            const todayHeading = document.createElement("h1");
            todayHeading.textContent = "Today";
            taskListContainer.appendChild(todayHeading);

            const todayDateHeading = document.createElement("h2");
            todayDateHeading.textContent = todayDateFormatted;
            taskListContainer.appendChild(todayDateHeading);

            displayTasksWithDates(todayTasks, false);
        }

        
        if (upcomingTasks.length > 0) {
            const upcomingHeading = document.createElement("h1");
            upcomingHeading.textContent = "Upcoming Tasks";
            taskListContainer.appendChild(upcomingHeading);
            displayTasksWithDates(upcomingTasks);
        }
    };

    
    const displayTasksWithDates = (tasks, showDateHeadings = true) => {
        const groupedTasks = tasks.reduce((acc, task) => {
            acc[task.date] = acc[task.date] || [];
            acc[task.date].push(task);
            return acc;
        }, {});

        for (const [date, tasksForDate] of Object.entries(groupedTasks)) {
            if (showDateHeadings) {
                const dateHeading = document.createElement("h2");
                dateHeading.textContent = date.split("-").reverse().join("/"); 
                taskListContainer.appendChild(dateHeading);
            }

            tasksForDate.forEach((task, index) => {
                const taskItem = document.createElement("div");
                taskItem.className = "task-item";

                
                const taskText = document.createElement("div");
                taskText.textContent = `${task.name} ${formatTime(task.time)}`;
                taskItem.appendChild(taskText);

                
                const buttonContainer = document.createElement("div");
                buttonContainer.className = "button-container";

                
                const editButton = document.createElement("button");
                editButton.textContent = "Edit";
                editButton.className = "edit-btn";
                editButton.addEventListener("click", () => {
                    taskInput.value = task.name;
                    dateInput.value = task.date;
                    timeInput.value = task.time;

                    isEditing = true;
                    editingIndex = index;

                    addTaskBtn.textContent = "Update Task";
                });
                buttonContainer.appendChild(editButton);

                
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.className = "delete-btn";
                deleteButton.addEventListener("click", () => {
                    if (confirm("Are you sure you want to delete this task?")) {
                        deleteTask(index);
                        loadTasks();
                    }
                });
                buttonContainer.appendChild(deleteButton);

                
                taskItem.appendChild(buttonContainer);
                taskListContainer.appendChild(taskItem);
            });
        }
    };


    const formatTime = (time) => {
        const [hour, minute] = time.split(":").map(Number);
        const ampm = hour >= 12 ? "PM" : "AM";
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
    };

    

    addTaskBtn.addEventListener("click", () => {
        const taskName = taskInput.value.trim();
        const taskDate = dateInput.value;
        const taskTime = timeInput.value;

        if (taskName && taskDate && taskTime) {
            const newTask = { name: taskName, date: taskDate, time: taskTime };

            if (isEditing) {
                updateTask(editingIndex, newTask);
            } else {
                saveTask(newTask);
            }

            loadTasks();
            clearFields();
        } else {
            alert("Please fill in all fields before proceeding.");
        }
    });



    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        const filteredTasks = tasks.filter((task) =>
            task.name.toLowerCase().includes(query)
        );

        displayTasks(filteredTasks);
    });

    loadTasks();
});
