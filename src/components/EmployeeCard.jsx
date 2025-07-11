function EmployeeCard({ employee }) {
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
    </div>
  );
}

export default EmployeeCard;
