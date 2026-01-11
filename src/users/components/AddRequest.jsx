import React, { useState } from "react";
import { addRequestAPI } from "../../services/allApi";
import { toast } from "react-toastify";

const AddRequest = ({ user, onClose }) => {
  const [requestData, setRequestData] = useState({
    patientName: "",
    age: "",
    bloodGroup: "",
    hospital: "",
    description: "",
    bystander: "",
    contact: "",
  });

  const handleChange = (e) => {
    setRequestData({
      ...requestData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      toast.error("Please login again");
      return;
    }

    const reqBody = {
      requestedBy: user.username, // 🔥 IMPORTANT
      ...requestData,
    };

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    const result = await addRequestAPI(reqBody, reqHeader);

    if (result?.status === 200) {
      toast.success("Blood request added");
      onClose(); // close modal only after success
    } else {
      toast.error(result?.data || "Failed to add request");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md border border-black">

        <h2 className="text-xl font-bold mb-4">
          {user.username}
        </h2>

        <div className="space-y-2 text-sm">

          <Input label="Patient Name" name="patientName" onChange={handleChange} />
          <Input label="Age" name="age" type="number" onChange={handleChange} />

          <div>
            <p className="text-gray-700">Blood Group</p>
            <select
              name="bloodGroup"
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-black rounded-lg"
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          <Input label="Hospital" name="hospital" onChange={handleChange} />
          <Input label="Description" name="description" onChange={handleChange} />
          <Input label="Bystander" name="bystander" onChange={handleChange} />
          <Input label="Contact No" name="contact" onChange={handleChange} />

        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-red-400 text-white py-2 rounded-lg font-medium hover:scale-105 transition"
          >
            Save Request
          </button>

          <button
            onClick={onClose}
            className="flex-1 border border-black py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const Input = ({ label, name, type = "text", onChange }) => (
  <div>
    <p className="text-gray-700">{label}</p>
    <input
      type={type}
      name={name}
      onChange={onChange}
      className="w-full mt-1 p-2 border border-black rounded-lg"
    />
  </div>
);

export default AddRequest;
