import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import Footer from "../../components/Footer";
import { getAllUsersAPI } from "../../services/allApi";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const token = sessionStorage.getItem("token");

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    const result = await getAllUsersAPI(reqHeader);

    if (result.status === 200) {
      setUsers(result.data);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <AdminHeader />

      <div className="bg-zinc-200 min-h-screen">
        <div className="max-w-7xl mx-auto p-10">

          {/* Page Header */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-semibold">Registered Users</h1>
            <p className="text-gray-600 mt-1 text-sm">
              List of users registered in the platform
            </p>
          </div>

          {/* Users Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-2xl border border-black/80 p-6 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4">
                  {user.profile ? (
  <img
    src={`http://localhost:4000/upload/${user.profile}`}
    alt="profile"
    className="w-14 h-14 rounded-full object-cover"
  />
) : (
  <div className="w-14 h-14 rounded-full bg-zinc-300 flex items-center justify-center font-semibold text-lg">
    {user.username.charAt(0).toUpperCase()}
  </div>
)}

                  <div>
                    <h2 className="font-semibold text-lg">
                      {user.username}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-1 text-sm text-gray-700">
                  <p><b>Phone:</b> {user.phone}</p>
                  <p><b>Location:</b> {user.location}</p>
                  <p><b>Gender:</b> {user.gender}</p>
                  <p><b>DOB:</b> {user.dob}</p>
                  <p><b>Height:</b> {user.height} cm</p>
                  <p><b>Weight:</b> {user.weight} kg</p>
                </div>

                <div className="mt-4">
                  <span className="inline-block px-3 py-1 text-sm rounded-full border border-red-500 text-red-500">
                    {user.bloodGroup}
                  </span>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AdminUsers;
