# Tab Task Tracker Chrome Extension

## Description
Tab Task Tracker is a Chrome extension that helps you manage your browser tabs by automatically saving them as you close them or manually saving them for later reference. This tool is perfect for researchers, students, or anyone who wants to keep track of their browsing history in an organized way.

## Current Features
- **Auto-save closed tabs**: Automatically save tabs when they're closed (can be toggled on/off)
- **Manual saving options**:
  - Save current tab via extension popup
  - Save any tab via right-click context menu
- **Task management**:
  - View saved tabs with timestamps
  - Delete individual saved tabs
- **Duplicate prevention**: Automatically prevents saving the same URL multiple times
- **Chrome/Extension page filtering**: Automatically skips saving chrome:// and extension pages

## Installation
1. Clone this repository or download the source code
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked" and select the extension directory

## File Structure
```
tab-task-tracker/
│
├── manifest.json       # Extension configuration
├── popup.html         # Extension popup interface
├── popup.js          # Popup functionality
├── popup.css         # Popup styles
├── background.js     # Background service worker
│
├── images/           # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
│
└── README.md         # This file
```

## Usage
1. **Auto-save tabs**:
   - Click the extension icon
   - Toggle "Auto-save on tab close"
   - Close any tab to save it automatically

2. **Manual saving**:
   - Click the extension icon and use "Save Current Tab" button
   - Or right-click on any page and select "Save Tab to Task List"

3. **View saved tabs**:
   - Click the extension icon to see your saved tabs
   - Click any saved link to open it in a new tab
   - Use the delete button to remove items

## Future Enhancements Planned
1. **Organization Features**:
   - Add categories/tags for saved tabs
   - Add priority levels
   - Add notes to saved tabs
   - Add due dates
   - Folder organization

2. **Search and Filter**:
   - Search through saved tabs
   - Filter by date
   - Filter by domain
   - Sort options

3. **Data Management**:
   - Export saved tabs to CSV/JSON
   - Import tabs from file
   - Sync across devices
   - Backup/restore functionality

4. **UI Improvements**:
   - Dark/light theme toggle
   - Customizable popup size
   - List/grid view toggle
   - Custom icons for different types of pages

5. **Advanced Features**:
   - Batch operations (delete, move, export)
   - Scheduled saving/cleaning
   - Tab groups integration
   - Bookmark integration
   - Screenshot capture of saved pages

## Development

### Key Files:
1. **manifest.json**: Contains extension configuration and permissions
2. **background.js**: Handles tab tracking and saving logic
3. **popup.html/js/css**: Manages the user interface

### Adding New Features:
1. Update manifest.json with any new required permissions
2. Modify background.js for new background functionality
3. Update popup files for new UI elements
4. Test thoroughly before deployment

### Debug Tips:
- Use `chrome://extensions` developer mode
- Check background page console for logs
- Test with various websites and scenarios

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Troubleshooting Common Issues
1. **Tabs not auto-saving**:
   - Check if auto-save is enabled
   - Verify the tab isn't a chrome:// or extension page
   - Check console for errors

2. **Popup not showing**:
   - Verify all files are in correct locations
   - Check manifest.json configuration
   - Look for console errors

3. **Right-click menu missing**:
   - Reload the extension
   - Check permissions in manifest.json
   - Verify background.js is running

## License
MIT License - Feel free to modify and distribute as needed.