import React, { useState } from "react";
import { updateAdminProfileAPI } from "../../services/allApi";
import { toast } from "react-toastify";

const EditAdminProfile = ({ admin, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    username: admin.username,
    password: admin.password,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = sessionStorage.getItem("token");

    const reqHeader = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const result = await updateAdminProfileAPI(formData, reqHeader);

    if (result.status === 200) {
      toast.success("Admin details updated");
      onSave(result.data);
    } else {
      toast.error("Update failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-sm border border-black">
        <h2 className="text-xl font-semibold mb-4">Edit Admin</h2>

        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full mb-3 p-2 border border-black rounded"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full mb-4 p-2 border border-black rounded"
        />

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="flex-1 bg-red-500 text-white py-2 rounded"
          >
            Save
          </button>

          <button
            onClick={onClose}
            className="flex-1 border border-black py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAdminProfile;
