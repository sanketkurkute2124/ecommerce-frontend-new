import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
import CustomerNavbar from "./CustomerNavbar";

export default function Address() {
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    AddressLine1: "",
    AddressLine2: "",
    City: "",
    State: "",
    PostalCode: "",
    Country: "IN",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      const customerId =
        localStorage.getItem("customerId");

      const res = await api.get(
        `/Addresses/GetAddressesByCustomer/${customerId}`
      );

      const data = res.data.Data || [];

      setAddresses(data);

      if (data.length > 0) {
        setSelectedAddressId(data[0].Id);
      } else {
        setShowForm(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveAddress = async (e) => {
    e.preventDefault();

    try {
      const customerId =
        localStorage.getItem("customerId");

      const payload = {
        CustomerId: Number(customerId),
        ...formData,
      };

      const res = await api.post(
        "/Addresses/CreateAddress",
        payload
      );

      if (res.data.Success) {
        await loadAddresses();
        setShowForm(false);

        setFormData({
          AddressLine1: "",
          AddressLine2: "",
          City: "",
          State: "",
          PostalCode: "",
          Country: "IN",
        });
      }
    } catch (error) {
      console.error(error);
      alert("Failed to save address");
    }
  };

  const continueToPayment = () => {
    const selectedAddress = addresses.find(
      (x) => x.Id === Number(selectedAddressId)
    );

    if (!selectedAddress) {
      alert("Please select an address");
      return;
    }

    localStorage.setItem(
      "selectedAddress",
      JSON.stringify(selectedAddress)
    );

    navigate("/payment");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <CustomerNavbar />

      <div className="max-w-4xl mx-auto p-4">

        <h1 className="text-2xl font-bold mb-4">
          Delivery Address
        </h1>

        {addresses.length > 0 && (
          <>
            <div className="space-y-4">

              {addresses.map((address) => (
                <label
                  key={address.Id}
                  className="block bg-white p-4 rounded-lg shadow cursor-pointer border"
                >
                  <div className="flex gap-3">

                    <input
                      type="radio"
                      name="address"
                      checked={
                        selectedAddressId === address.Id
                      }
                      onChange={() =>
                        setSelectedAddressId(address.Id)
                      }
                    />

                    <div>
                      <p className="font-semibold">
                        {address.AddressLine1}
                      </p>

                      <p>
                        {address.AddressLine2}
                      </p>

                      <p>
                        {address.City}, {address.State}
                      </p>

                      <p>
                        {address.PostalCode}
                      </p>

                      <p>
                        {address.Country}
                      </p>
                    </div>

                  </div>
                </label>
              ))}

            </div>

            <button
              onClick={() => setShowForm(true)}
              className="mt-4 text-blue-600 font-semibold"
            >
              + Add New Address
            </button>

            <div className="mt-6">
              <button
                onClick={continueToPayment}
                className="bg-pink-600 text-white px-8 py-3 rounded-lg"
              >
                Deliver Here
              </button>
            </div>
          </>
        )}

        {showForm && (
          <div className="bg-white mt-6 p-4 rounded-lg shadow">

            <h2 className="text-xl font-bold mb-4">
              Add Address
            </h2>

            <form
              onSubmit={saveAddress}
              className="space-y-3"
            >
              <input
                type="text"
                name="AddressLine1"
                placeholder="Address Line 1"
                value={formData.AddressLine1}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />

              <input
                type="text"
                name="AddressLine2"
                placeholder="Address Line 2"
                value={formData.AddressLine2}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                name="City"
                placeholder="City"
                value={formData.City}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />

              <input
                type="text"
                name="State"
                placeholder="State"
                value={formData.State}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />

              <input
                type="text"
                name="PostalCode"
                placeholder="Postal Code"
                value={formData.PostalCode}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />

              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded"
              >
                Save Address
              </button>

            </form>

          </div>
        )}

      </div>
    </div>
  );
}