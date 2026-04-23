import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    title:"", description:"", category:"Academic"
  });
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const load = async () => {
    const res = await API.get("/grievances");
    setList(res.data);
  };

  useEffect(()=>{ load(); }, []);

  const submit = async () => {
    if(editId){
      await API.put(`/grievances/${editId}`, form);
      setEditId(null);
    } else {
      await API.post("/grievances", form);
    }
    setForm({ title:"", description:"", category:"Academic" });
    load();
  };

  const del = async (id) => {
    await API.delete(`/grievances/${id}`);
    load();
  };

  const edit = (g) => {
    setForm(g);
    setEditId(g._id);
  };

  const searchData = async () => {
    const res = await API.get(`/grievances/search?title=${search}`);
    setList(res.data);
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      {/* FORM */}
      <div className="container">
        <input placeholder="Title" value={form.title}
          onChange={e=>setForm({...form,title:e.target.value})}/>

        <input placeholder="Description" value={form.description}
          onChange={e=>setForm({...form,description:e.target.value})}/>

        <select value={form.category}
          onChange={e=>setForm({...form,category:e.target.value})}>
          <option>Academic</option>
          <option>Hostel</option>
          <option>Transport</option>
          <option>Other</option>
        </select>

        <button onClick={submit}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {/* SEARCH */}
      <div className="container">
        <input placeholder="Search"
          onChange={e=>setSearch(e.target.value)} />
        <button onClick={searchData}>Search</button>
        <button onClick={load}>Reset</button>
      </div>

      {/* LIST */}
      {list.map(g => (
        <div className="card" key={g._id}>
          <h4>{g.title}</h4>
          <p>{g.description}</p>
          <p>{g.category}</p>

          <button onClick={()=>edit(g)}>Edit</button>
          <button onClick={()=>del(g._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}