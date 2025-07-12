import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockEmployees } from "../data/mockEmployee";
import EmployeeCard from "../components/EmployeeCard";

function Dashboard() {
  const [employees, setEmployees] = useState(mockEmployees);
  const [sortBy, setSortBy] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  const handleEdit = (id) => {
    navigate(`/form/${id}`);
  };

  const handleSort = (criteria) => {
    const sorted = [...employees].sort((a, b) =>
      a[criteria].localeCompare(b[criteria])
    );
    setEmployees(sorted);
    setSortBy(criteria);
  };

  const handleShowChange = (e) => {
    setItemsPerPage(Number(e.target.value));
  };

  return (
    <div className="p-4">
      <header className="bg-gray-800 text-white p-4 rounded mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-xl font-bold">Employee Directory</h1>
        <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
          <input
            type="text"
            onChange={(e) => {
              const value = e.target.value.toLowerCase();
              const filtered = mockEmployees.filter(
                (emp) =>
                  emp.firstName.toLowerCase().includes(value) ||
                  emp.email.toLowerCase().includes(value)
              );
              setEmployees(filtered);
            }}
            placeholder="Search by name or email"
            className="px-2 py-1 text-black rounded"
          />
          <button className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded">
            Filter
          </button>
        </div>
      </header>

      <div className="flex justify-between mb-2">
        <div className="flex gap-2">
          <label htmlFor="sort">Sort:</label>
          <select
            id="sort"
            onChange={(e) => handleSort(e.target.value)}
            className="border px-2 py-1 rounded"
            value={sortBy}
          >
            <option value="">Select</option>
            <option value="firstName">First Name</option>
            <option value="department">Department</option>
          </select>

          <label htmlFor="show">Show:</label>
          <select
            id="show"
            onChange={handleShowChange}
            className="border px-2 py-1 rounded"
            value={itemsPerPage}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <button
          className="bg-green-600 text-white px-4 py-1 rounded"
          onClick={() => navigate("/form")}
        >
          Add Employee
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {employees.slice(0, itemsPerPage).map((emp) => (
          <EmployeeCard
            key={emp.id}
            employee={emp}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>

      <footer className="bg-gray-800 text-white text-center mt-8 py-2 rounded">
        © 2025 Employee Directory App. All rights reserved.
      </footer>
    </div>
  );
}

export default Dashboard;
