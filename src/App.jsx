export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Vite + React + Tailwind CSS
        </h1>
        <p className="text-gray-600 mb-8">
          Edit <code className="bg-gray-200 px-2 py-1 rounded text-sm">src/App.jsx</code> to get started
        </p>
        <div className="flex gap-4 justify-center">
          <a 
            href="https://vitejs.dev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Vite Docs
          </a>
          <a 
            href="https://react.dev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            React Docs
          </a>
          <a 
            href="https://tailwindcss.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Tailwind Docs
          </a>
        </div>
      </div>
    </div>
  );
}