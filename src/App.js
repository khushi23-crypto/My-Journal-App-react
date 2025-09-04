import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [entries, setEntries] = useState([]);
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Personal");
  const [filterCategory, setFilterCategory] = useState("All");
  useEffect(() => {
    const savedEntries = localStorage.getItem("journalEntries");
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(entries));
  }, [entries]);

  const handleAdd = () => {
    if (text.trim() === "") return;

    const newEntry = {
      id: Date.now(),
      text,
      category,
      date: new Date().toLocaleString(),
    };

    setEntries([...entries, newEntry]);
    setText("");
    setCategory("Personal");
    toast("💖 Yay! New journal added!", {
      position: "top-right",
      autoClose: 2000,
      style: {
        background: "#ffe4f2",
        color: "#d63384",
        fontWeight: "bold",
      }
    },);
  };

  const handleDelete = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
    toast("🗑 Entry deleted!", {
      position: "top-right",
      autoClose: 2000,
      style: {
        background: "#e0f7ff",
        color: "#0d6efd",
        fontWeight: "bold",
      },
    });
  };

  const filteredEntries =
    filterCategory === "All"
      ? entries
      : entries.filter((entry) => entry.category === filterCategory);

  return (
    <div className="max-w-xl mx-auto p-6 bg-slate-400 mt-10 rounded-3xl">
      <h1 className="text-2xl font-bold mb-4 text-center">📔 My Journal App</h1>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-3 border rounded-lg mb-3 bg-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
        <option value="Gratitude">Gratitude</option>
        <option value="Travel">Travel</option>
        <option value="Other">Other</option>
      </select>

      <textarea
        rows="10"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your thoughts..."
        className="w-full p-3 border rounded-lg mb-3 bg-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={handleAdd}
        className="bg-pink-900 hover:bg-pink-500 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
      >
        Add Entry
      </button>

      <div className="mt-6">
        <label className="font-semibold mr-2">Filter by Category:</label>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="All">All</option>
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Gratitude">Gratitude</option>
          <option value="Travel">Travel</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="mt-6 space-y-4">
        {filteredEntries.map((entry) => (
          <div
            key={entry.id}
            className="border border-gray-300 rounded-lg p-4 shadow-sm"
          >
            <p className="text-gray-800 flex ">{entry.text}</p>
            <span className="inline-block mt-1 text-sm px-2 py-1 bg-blue-200 text-blue-900 rounded-md ">
              {entry.category}
            </span>
            <small className="block text-gray-900">{entry.date}</small>
            <button
              onClick={() => handleDelete(entry.id)}
              className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
            >
              🗑 Delete
            </button>
          </div>
        ))}

        {filteredEntries.length === 0 && (
          <p className="text-center text-gray-500">No entries found.</p>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

export default App;