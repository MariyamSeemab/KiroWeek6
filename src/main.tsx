import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// import AppDebug from './App-debug.tsx' // Uncomment this line and comment App import above for debugging
import './index.css'

// Add some debugging
console.log('Main.tsx loaded');
console.log('Environment:', import.meta.env.MODE);
console.log('Base URL:', import.meta.env.BASE_URL);

const rootElement = document.getElementById('root');
console.log('Root element:', rootElement);

if (!rootElement) {
  console.error('Root element not found!');
  // Create a fallback
  document.body.innerHTML = '<div style="padding: 20px; color: red; font-family: Arial;">Error: Root element not found!</div>';
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    console.log('React root created');
    
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
    console.log('App rendered');
  } catch (error) {
    console.error('Error rendering app:', error);
    rootElement.innerHTML = `
      <div style="padding: 20px; color: red; font-family: Arial;">
        <h1>Rendering Error</h1>
        <p>Error: ${error instanceof Error ? error.message : 'Unknown error'}</p>
        <p>Check the browser console for more details.</p>
      </div>
    `;
  }
}