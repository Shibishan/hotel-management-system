import React, { useEffect, useState } from "react";
import "./App.css";
import PocketBase from "pocketbase";

const pb = new PocketBase(
  process.env.REACT_APP_POCKETBASE_URL || "http://127.0.0.1:8090"
);

interface Guest {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: string;
  date_of_birth?: string;
}

function App() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    date_of_birth: "",
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    getGuests();
  }, []);

  async function getGuests() {
    try {
      const records = await pb.collection("guests").getFullList<Guest>();
      setGuests(records);
    } catch (error) {
      console.log("Error getting guests", error);
    }
  }

  async function addGuest(e: React.FormEvent) {
    e.preventDefault();
    try {
      await pb.collection("guests").create(form);
      alert("Guest added!");
      setForm({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        date_of_birth: "",
      });
      getGuests();
    } catch (error: any) {
      alert("Error: " + (error?.message || "Failed to add guest"));
    }
  }

  async function deleteGuest(id: string) {
    if (!window.confirm("Are you sure you want to delete this guest?")) return;
    try {
      await pb.collection("guests").delete(id);
      setGuests(guests.filter((g) => g.id !== id));
    } catch (error) {
      console.log("Error deleting guest", error);
    }
  }

  const filteredGuests = guests.filter((guest) => {
    return (
      guest.first_name.toLowerCase().includes(search.toLowerCase()) ||
      guest.last_name.toLowerCase().includes(search.toLowerCase()) ||
      guest.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="app-container">
      <h1 className="app-title">🏨 Hotel Guest Management</h1>

      {/* search bar */}
      <div className="search-row">
        <input
          type="text"
          placeholder="Search guests by name or email..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* guest list */}
      <div className="table-wrap">
        <table className="guest-table">
          <thead>
            <tr>
              <th className="cell">First Name</th>
              <th className="cell">Last Name</th>
              <th className="cell">Email</th>
              <th className="cell">Phone</th>
              <th className="cell">Address</th>
              <th className="cell">Date of Birth</th>
              <th className="cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredGuests.length > 0 ? (
              filteredGuests.map((guest) => (
                <tr key={guest.id}>
                  <td className="cell">{guest.first_name}</td>
                  <td className="cell">{guest.last_name}</td>
                  <td className="cell">{guest.email}</td>
                  <td className="cell">{guest.phone}</td>
                  <td className="cell">{guest.address}</td>
                  <td className="cell">{guest.date_of_birth}</td>
                  <td className="cell actions-cell">
                    <button
                      onClick={() => deleteGuest(guest.id)}
                      className="btn btn-delete"
                    >
                      ❌ Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="no-results">
                  No guests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* add new guest form */}
      <h2 className="section-title">➕ Add New Guest</h2>
      <form onSubmit={addGuest} className="guest-form">
        <input
          type="text"
          placeholder="First Name"
          className="input"
          value={form.first_name}
          onChange={(e) => setForm({ ...form, first_name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          className="input"
          value={form.last_name}
          onChange={(e) => setForm({ ...form, last_name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="input"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          className="input"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="Address"
          className="input input-wide"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <input
          type="date"
          className="input input-wide"
          value={form.date_of_birth}
          onChange={(e) =>
            setForm({ ...form, date_of_birth: e.target.value })
          }
        />
        <button type="submit" className="btn btn-primary btn-wide">
          ✅ Add Guest
        </button>
      </form>
    </div>
  );
}

export default App;
