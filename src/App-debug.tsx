import React from 'react';

function AppDebug() {
  console.log('AppDebug component loaded');
  
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Smart-Silo Storage Referee - Debug Mode
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-slate-700 mb-4">
            If you can see this, the basic React app is working correctly.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800">✅ React</h3>
              <p className="text-green-700 text-sm">React is loading correctly</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800">✅ Tailwind CSS</h3>
              <p className="text-blue-700 text-sm">Styles are being applied</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800">✅ TypeScript</h3>
              <p className="text-yellow-700 text-sm">TypeScript compilation working</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-800">✅ Build Process</h3>
              <p className="text-purple-700 text-sm">Vite build successful</p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-slate-50 rounded-lg">
            <h4 className="font-semibold text-slate-800 mb-2">Debug Information:</h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Environment: {import.meta.env.MODE}</li>
              <li>• Base URL: {import.meta.env.BASE_URL}</li>
              <li>• Timestamp: {new Date().toISOString()}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppDebug;