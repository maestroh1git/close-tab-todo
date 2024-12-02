document.addEventListener('DOMContentLoaded', function() {
    // Load toggle state
    const autoSaveToggle = document.getElementById('autoSaveToggle');
    chrome.storage.local.get(['autoSave'], function(result) {
        autoSaveToggle.checked = result.autoSave !== false;
    });

    // Handle toggle changes
    autoSaveToggle.addEventListener('change', function() {
        chrome.storage.local.set({ autoSave: this.checked });
    });

    // Save Current Tab button listener
    document.getElementById('saveCurrentTab').addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs[0]) {
                console.log('Sending save request for tab:', tabs[0]);
                chrome.runtime.sendMessage({
                    action: "saveTab",
                    tab: {
                        title: tabs[0].title,
                        url: tabs[0].url
                    }
                });
                setTimeout(loadTasks, 500); // Reload tasks after a short delay
            }
        });
    });

    loadTasks();
});

function loadTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';  // Clear current list

    chrome.storage.local.get(['tasks'], function(result) {
        const tasks = result.tasks || [];
        
        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = 'task-item';
            taskElement.innerHTML = `
                <div class="task-title">
                    <a href="${task.url}" target="_blank">${task.title}</a>
                </div>
                <div class="task-date">
                    ${new Date(task.timestamp).toLocaleString()}
                </div>
                <button class="delete-task" data-id="${task.id}">Delete</button>
            `;
            taskList.appendChild(taskElement);
        });

        // Add delete functionality
        document.querySelectorAll('.delete-task').forEach(button => {
            button.addEventListener('click', function() {
                const taskId = parseInt(this.getAttribute('data-id'));
                deleteTask(taskId);
            });
        });
    });
}

function deleteTask(taskId) {
    chrome.storage.local.get(['tasks'], function(result) {
        const tasks = result.tasks || [];
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        chrome.storage.local.set({ tasks: updatedTasks }, function() {
            loadTasks();  // Refresh the list
        });
    });
}