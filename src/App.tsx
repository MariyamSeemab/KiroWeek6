import MainLayout from './components/layout/MainLayout';
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  console.log('App component loaded');
  
  try {
    return (
      <ErrorBoundary>
        <div className="App">
          <MainLayout />
        </div>
      </ErrorBoundary>
    );
  } catch (error) {
    console.error('Error in App component:', error);
    return (
      <div className="min-h-screen bg-red-100 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-red-800 mb-4">Application Error</h1>
          <p className="text-red-600">Something went wrong. Check the console for details.</p>
        </div>
      </div>
    );
  }
}

export default App;