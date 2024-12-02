// Keep track of tab information before they're closed
let tabsInfo = new Map();

// Store tab info when tabs are loaded/updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Only store tab info when the tab is fully loaded and has a URL
    if (changeInfo.status === 'complete' && tab.url) {
        console.log('Storing tab info for:', tabId, tab.title);
        // Store only if it's not a chrome:// or chrome-extension:// page
        if (!tab.url.startsWith('chrome://') && !tab.url.startsWith('chrome-extension://')) {
            tabsInfo.set(tabId, {
                title: tab.title,
                url: tab.url
            });
            console.log('Current stored tabs:', Array.from(tabsInfo.entries()));
        }
    }
});

// Debug on installation
chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
    
    // Create context menu
    chrome.contextMenus.create({
        id: "saveTab",
        title: "Save Tab to Task List",
        contexts: ["page", "link"]
    });
    
    // Set default settings
    chrome.storage.local.get(['autoSave'], function(result) {
        if (result.autoSave === undefined) {
            chrome.storage.local.set({ autoSave: true }, () => {
                console.log('AutoSave initialized to true');
            });
        }
    });
});

// Initialize tab tracking on extension load
chrome.tabs.query({}, (tabs) => {
    tabs.forEach(tab => {
        if (tab.url && !tab.url.startsWith('chrome://') && !tab.url.startsWith('chrome-extension://')) {
            tabsInfo.set(tab.id, {
                title: tab.title,
                url: tab.url
            });
        }
    });
    console.log('Initial tabs loaded:', Array.from(tabsInfo.entries()));
});

// Modified tab closing listener with more logging
chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    console.log('Tab closed:', tabId);
    const tabInfo = tabsInfo.get(tabId);
    console.log('Found tab info:', tabInfo);
    
    if (tabInfo) {
        chrome.storage.local.get(['autoSave'], function(result) {
            console.log('AutoSave setting:', result.autoSave);
            if (result.autoSave) {
                console.log('Saving closed tab:', tabInfo);
                saveTab(tabInfo);
            }
        });
        // Clean up stored tab info
        tabsInfo.delete(tabId);
    }
});

// Context menu click handler
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "saveTab") {
        console.log('Saving from context menu:', tab.title);
        saveTab(tab);
    }
});

function saveTab(tab) {
    // Check if tab is valid
    if (!tab || !tab.url) {
        console.log('Invalid tab data:', tab);
        return;
    }

    // Skip chrome:// and extension pages
    if (tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://')) {
        console.log('Skipping chrome or extension page');
        return;
    }

    const taskData = {
        title: tab.title || 'Untitled',
        url: tab.url,
        timestamp: new Date().toISOString(),
        id: Date.now()
    };

    chrome.storage.local.get(['tasks'], function(result) {
        const tasks = result.tasks || [];
        if (!tasks.some(task => task.url === taskData.url)) {
            tasks.unshift(taskData);
            chrome.storage.local.set({ tasks: tasks }, () => {
                console.log('Task saved:', taskData);
                chrome.notifications.create({
                    type: 'basic',
                    iconUrl: 'images/icon48.png',
                    title: 'Tab Saved',
                    message: `"${taskData.title}" has been saved to your list`
                });
            });
        } else {
            console.log('Tab already in list:', taskData.url);
        }
    });
}

// Listen for messages from popup with fix for save button
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Message received:', request);
    if (request.action === "saveTab" && request.tab) {
        saveTab(request.tab);
    }
});