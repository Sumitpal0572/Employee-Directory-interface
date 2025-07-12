import EmployeeForm from "../components/EmployeeForm";

function FormPage() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Add / Edit Employee</h2>
      <EmployeeForm />
    </div>
  );
}

export default FormPage;
