import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockEmployees } from "../data/mockEmployee";
import EmployeeCard from "../components/EmployeeCard";

function Dashboard() {
  const [employees, setEmployees] = useState(mockEmployees);
  const [sortBy, setSortBy] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [filterValues, setFilterValues] = useState({
    firstName: "",
    department: "",
    role: "",
  });

  const navigate = useNavigate();

  const filteredEmployees = employees.filter((emp) => {
    return (
      emp.firstName
        .toLowerCase()
        .includes(filterValues.firstName.toLowerCase()) &&
      emp.department
        .toLowerCase()
        .includes(filterValues.department.toLowerCase()) &&
      emp.role.toLowerCase().includes(filterValues.role.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = mockEmployees.filter(
      (emp) =>
        emp.firstName.toLowerCase().includes(value) ||
        emp.email.toLowerCase().includes(value)
    );
    setEmployees(filtered);
    setCurrentPage(1);
  };

  return (
    <div className="p-4">
      <header className="bg-gray-800 text-white p-4 rounded mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-xl font-bold">Employee Directory</h1>
        <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Search by name or email"
            className="px-2 py-1 text-black rounded"
          />
          <button
            className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded"
            onClick={() => setShowFilter(!showFilter)}
          >
            Filter
          </button>
        </div>
      </header>

      {showFilter && (
        <div className="bg-gray-100 p-4 rounded mb-4">
          <h2 className="text-lg font-semibold mb-2">Filter Employees</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="border px-2 py-1 rounded"
              value={filterValues.firstName}
              onChange={(e) =>
                setFilterValues({ ...filterValues, firstName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Department"
              className="border px-2 py-1 rounded"
              value={filterValues.department}
              onChange={(e) =>
                setFilterValues({ ...filterValues, department: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Role"
              className="border px-2 py-1 rounded"
              value={filterValues.role}
              onChange={(e) =>
                setFilterValues({ ...filterValues, role: e.target.value })
              }
            />
          </div>
          <div className="flex justify-end mt-4 gap-2">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() =>
                setFilterValues({ firstName: "", department: "", role: "" })
              }
            >
              Reset
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:justify-between mb-2 gap-2">
        <div className="flex gap-2 items-center">
          <label htmlFor="sort">Sort:</label>
          <select
            id="sort"
            onChange={(e) => handleSort(e.target.value)}
            className="border px-2 py-1 rounded"
            value={sortBy}
          >
            <option value="">--Select--</option>
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
        {paginatedEmployees.map((emp) => (
          <EmployeeCard
            key={emp.id}
            employee={emp}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-2 py-1">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <footer className="bg-gray-800 text-white text-center mt-8 py-2 rounded">
        © 2025 Employee Directory App. All rights reserved.
      </footer>
    </div>
  );
}

export default Dashboard;
