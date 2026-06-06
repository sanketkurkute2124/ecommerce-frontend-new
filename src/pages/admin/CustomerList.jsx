import React, { useEffect, useState } from "react";
import api from "../../api/axiosInstance";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await api.get("/Customers/GetAllCustomers");

      if (response.data?.Success) {
        setCustomers(response.data.Data || []);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/Customers/DeleteCustomer/${id}`);

      setCustomers((prev) =>
        prev.filter((customer) => customer.Id !== id)
      );

      alert("Customer deleted successfully");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete customer");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-lg">
        Loading customers...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Customers ({customers.length})
        </h1>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200">
          <thead>
            <tr className="bg-slate-100">
              <th className="border p-3 text-left">ID</th>
              <th className="border p-3 text-left">First Name</th>
              <th className="border p-3 text-left">Last Name</th>
              <th className="border p-3 text-left">Email</th>
              <th className="border p-3 text-left">Phone</th>
              <th className="border p-3 text-left">Date Of Birth</th>
              <th className="border p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <tr
                  key={customer.Id}
                  className="hover:bg-gray-50"
                >
                  <td className="border p-3">
                    {customer.Id}
                  </td>

                  <td className="border p-3">
                    {customer.FirstName}
                  </td>

                  <td className="border p-3">
                    {customer.LastName}
                  </td>

                  <td className="border p-3">
                    {customer.Email}
                  </td>

                  <td className="border p-3">
                    {customer.PhoneNumber}
                  </td>

                  <td className="border p-3">
                    {new Date(
                      customer.DateOfBirth
                    ).toLocaleDateString()}
                  </td>

                  <td className="border p-3 text-center">
                    <button
                      onClick={() =>
                        handleDelete(customer.Id)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6"
                >
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}