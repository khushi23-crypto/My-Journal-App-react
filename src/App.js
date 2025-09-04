import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [entries, setEntries] = useState([]);
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Personal");
  const [filterCategory, setFilterCategory] = useState("All");

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  const correctPassword = "kajal123"; 

  useEffect(() => {
    const savedEntries = localStorage.getItem("journalEntries");
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(entries));
  }, [entries]);

  const handleLogin = () => {
    if (passwordInput === correctPassword) {
      setIsAuthenticated(true);
      toast.success("🔓 Journal Unlocked!", { autoClose: 2000 });
    } else {
      toast.error("❌ Wrong Password!", { autoClose: 2000 });
    }
  };

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
    toast.success("New entry added ✅", { autoClose: 2000 });
  };

  const handleDelete = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
    toast.success("Entry deleted 🗑", { autoClose: 2000 });
  };

  const filteredEntries =
    filterCategory === "All"
      ? entries
      : entries.filter((entry) => entry.category === filterCategory);

  if (!isAuthenticated) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
          <h2 className="text-xl font-bold mb-4">🔐 Enter Password</h2>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Enter password"
            className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
          >
            Unlock Journal
          </button>
          <ToastContainer />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">📔 My Journal App</h1>

      <textarea
        rows="4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your thoughts..."
        className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
        <option value="Gratitude">Gratitude</option>
        <option value="Travel">Travel</option>
        <option value="Other">Other</option>
      </select>

      <button
        onClick={handleAdd}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
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
            <p className="text-gray-800">{entry.text}</p>
            <span className="inline-block mt-1 text-sm px-2 py-1 bg-blue-100 text-blue-600 rounded-md">
              {entry.category}
            </span>
            <small className="block text-gray-500">{entry.date}</small>
            <button
              onClick={() => handleDelete(entry.id)}
              className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
            >
              🗑 Delete
            </button>
          </div>
        ))}

        {filteredEntries.length === 0 && (
          <p className="text-center text-gray-900">No entries found.</p>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

export default App;