function FilterSidebar({ employees, setEmployees }) {
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = employees.filter(
      (emp) =>
        emp.firstName.toLowerCase().includes(value) ||
        emp.email.toLowerCase().includes(value)
    );
    setEmployees(filtered);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        onChange={handleSearch}
        placeholder="Search by name/email"
        className="w-full border px-2 py-1 mb-2"
      />
    </div>
  );
}

export default FilterSidebar;
