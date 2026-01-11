import React, { useState } from "react";
import { updateProfileAPI} from '../../services/allApi'

const EditProfile = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    username: user.username,
    phone: user.phone,
    location: user.location,
    password: "",
  });

  const [profilePic, setProfilePic] = useState(null);

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("username", formData.username);
    data.append("phone", formData.phone);
    data.append("location", formData.location);
    if (formData.password) data.append("password", formData.password);
    if (profilePic) data.append("profile", profilePic);

    const token = sessionStorage.getItem("token");

    const result = await updateProfileAPI(data, {
      Authorization: `Bearer ${token}`,
    });

    if (result.status === 200) {
      onSave(result.data);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

        <input
          className="w-full border p-2 mb-3"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          placeholder="Name"
        />

        <input
          className="w-full border p-2 mb-3"
          value={formData.phone}
          onChange={(e) =>
            setFormData({ ...formData, phone: e.target.value })
          }
          placeholder="Phone"
        />

        <input
          className="w-full border p-2 mb-3"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          placeholder="Location"
        />

        <input
          className="w-full border p-2 mb-3"
          type="password"
          placeholder="New Password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <input
          type="file"
          accept="image/*"
          className="mb-4"
          onChange={(e) => setProfilePic(e.target.files[0])}
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleSubmit}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
