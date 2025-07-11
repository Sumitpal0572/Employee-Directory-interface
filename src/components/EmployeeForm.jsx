import { useNavigate } from "react-router-dom";

function EmployeeForm() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form));

    // Basic validation
    if (!data.firstName || !data.email.includes("@")) {
      alert("Please enter valid details");
      return;
    }

    alert("Employee saved!");
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="firstName"
        placeholder="First Name"
        className="w-full border p-2"
        required
      />
      <input
        name="lastName"
        placeholder="Last Name"
        className="w-full border p-2"
        required
      />
      <input
        name="email"
        placeholder="Email"
        className="w-full border p-2"
        type="email"
        required
      />
      <input
        name="department"
        placeholder="Department"
        className="w-full border p-2"
        required
      />
      <input
        name="role"
        placeholder="Role"
        className="w-full border p-2"
        required
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </form>
  );
}

export default EmployeeForm;
