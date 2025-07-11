import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockEmployees } from "../data/mockEmployee";
import EmployeeCard from "../components/EmployeeCard";
import FilterSidebar from "../components/FilterSidebar";

function Dashboard() {
  const [employees, setEmployees] = useState(mockEmployees);
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Employee Directory</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/form")}
        >
          Add Employee
        </button>
      </header>

      <FilterSidebar employees={mockEmployees} setEmployees={setEmployees} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {employees.map((emp) => (
          <EmployeeCard key={emp.id} employee={emp} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
