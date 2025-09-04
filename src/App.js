import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [entries, setEntries] = useState([]);
  const [text, setText] = useState("");

  // Add new entry
  const handleAdd = () => {
    if (text.trim() === "") return;

    const newEntry = {
      id: Date.now(),
      text,
      date: new Date().toLocaleString(),
    };

    setEntries([...entries, newEntry]);
    setText(""); // clear textarea
  };

  
  const handleDelete = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
    toast.success('Entry deleted successfully! 🗑') 
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">📔 My Journal App</h1>

      {/* Journal Form */}
      <textarea
        rows="4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your thoughts..."
        className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={handleAdd}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
      >
        Add Entry
      </button>

      {/* Journal List */}
      <div className="mt-6 space-y-4">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="border border-gray-300 rounded-lg p-4 shadow-sm"
          >
            <p className="text-gray-800">{entry.text}</p>
            <small className="block text-gray-500">{entry.date}</small>
            <button
              onClick={() => handleDelete(entry.id)
               
              }
              className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
             >
              ❌ Delete
            </button>
          </div>
        ))}
      </div>
      <ToastContainer/>
    </div>
  );
}

export default App;