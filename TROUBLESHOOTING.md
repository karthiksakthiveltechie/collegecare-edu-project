# Troubleshooting Blank Page Issue

If you're seeing a blank page at localhost:3000, follow these steps:

## 1. Check Browser Console
Open your browser's Developer Tools (F12) and check the Console tab for any JavaScript errors.

## 2. Check Network Tab
In the Developer Tools, check the Network tab to see if:
- CSS files are loading (globals.css)
- JavaScript files are loading
- Fonts are loading

## 3. Verify Dependencies
Make sure all dependencies are installed:
```bash
npm install
```

## 4. Clear Cache and Restart
```bash
# Stop the dev server (Ctrl+C)
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## 5. Check Port
Verify that port 3000 is available. If it's in use, Vite will automatically use the next available port. Check the terminal output for the actual URL.

## 6. Common Issues

### API Connection Errors
If you see API connection errors in the console, this is normal if you don't have a backend running. The app should still render. The API calls will fail gracefully.

### CSS Not Loading
If Tailwind CSS isn't working:
- Check that `postcss.config.js` exists
- Check that `tailwind.config.js` exists
- Verify `src/styles/globals.css` is imported in `src/index.jsx`

### JavaScript Errors
Check the browser console for:
- Import errors
- Syntax errors
- Missing dependencies

## 7. Test Minimal Render
If the page is still blank, try temporarily replacing the App content with a simple test:

```jsx
function App() {
  return <div style={{padding: '20px', color: 'white', background: '#0A0A0F'}}>Test</div>
}
```

If this renders, the issue is with one of the components. If it doesn't, the issue is with the build setup.

## 8. Check Vite Output
Look at the terminal where `npm run dev` is running. It should show:
- The local URL (usually http://localhost:3000)
- Any build errors
- Any warnings

## Still Having Issues?
1. Check that you're using Node.js 16+ and npm 7+
2. Try deleting `.vite` cache folder
3. Check that all files in `src/` directory exist
4. Verify `index.html` exists in the root directory
