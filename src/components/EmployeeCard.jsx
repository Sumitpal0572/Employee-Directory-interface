// components/EmployeeCard.jsx
function EmployeeCard({ employee, onDelete, onEdit }) {
  return (
    <div className="border p-4 rounded shadow bg-white">
      <p>
        <strong>ID:</strong> {employee.id}
      </p>
      <p>
        <strong>Name:</strong> {employee.firstName} {employee.lastName}
      </p>
      <p>
        <strong>Email:</strong> {employee.email}
      </p>
      <p>
        <strong>Department:</strong> {employee.department}
      </p>
      <p>
        <strong>Role:</strong> {employee.role}
      </p>
      <div className="flex justify-end gap-2 mt-4">
        <button
          className="bg-yellow-500 text-white px-3 py-1 rounded"
          onClick={() => onEdit(employee.id)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded"
          onClick={() => onDelete(employee.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default EmployeeCard;
