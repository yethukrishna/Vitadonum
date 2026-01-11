import React, { useState } from "react";
import Footer from "../../components/Footer";
import AdminHeader from "../components/AdminHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faHeartPulse, faCirclePlus, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie } from "recharts";
import { useNavigate } from "react-router-dom";
import EditAdminProfile from "../components/EditAdminProfile";


const AdminHome = () => {

  const barData = [
    { name: "Jan", users: 20, requests: 10 },
    { name: "Feb", users: 35, requests: 18 },
    { name: "Mar", users: 54, requests: 32 }
  ];

  const pieData = [
    { name: "A+", value: 15 },
    { name: "B+", value: 10 },
    { name: "O+", value: 20 },
    { name: "AB+", value: 9 }
  ];

  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);

  const admin = JSON.parse(sessionStorage.getItem("user"));


  return (
    <>
      <AdminHeader />

      <section className="min-h-screen bg-zinc-200 py-14 px-6 md:px-20">
        <h1 className="text-3xl font-semibold mb-10 text-center text-red-500">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Sidebar */}
          <aside className="bg-white border border-black rounded-xl p-6 h-full">
            <h3 className="text-lg font-semibold mb-6">Admin Menu</h3>
            <ul className="space-y-4">
              <li
                onClick={() => navigate('/admin-users')}
                className="cursor-pointer hover:text-green-400">
                <FontAwesomeIcon icon={faUsers} className="mr-3 text-green-400" />
                Users
              </li>
              <li
                onClick={() => navigate('/admin-request')}
                className="cursor-pointer hover:text-red-500">
                <FontAwesomeIcon icon={faHeartPulse} className="mr-3 text-red-500" />
                Requests
              </li>
              <li
                onClick={() => setShowEditModal(true)}
                className="cursor-pointer hover:text-gray-700"
              >
                <FontAwesomeIcon icon={faPenToSquare} className="mr-3 text-gray-700" />
                Edit Details
              </li>

            </ul>
          </aside>

          <main className="lg:col-span-3 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-black rounded-xl p-6">
                <h3 className="text-lg">Registered Users</h3>
                <p className="text-3xl font-semibold mt-2 text-amber-300">54</p>
              </div>

              <div className="bg-white border border-black rounded-xl p-6">
                <h3 className="text-lg">Active Requests</h3>
                <p className="text-3xl font-semibold mt-2 text-green-300">32</p>
              </div>
            </div>
            <h2 className="text-xl font-semibold">
              Statistics & Graph
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Graph */}
              <div className="bg-white border border-black rounded-xl p-7  h-[350px] overflow-hidden">
                <h3 className="text-md mb-3">Users vs Requests</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="requests" fill="#4747d1" />
                    <Bar dataKey="users" fill="#e60000" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pie-chart */}
              <div className="bg-white border border-black rounded-xl p-4 h-[350px]">
                <h3 className="text-md mb-3">Blood Group Distribution</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      label
                    />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </main>
        </div>
      </section>
      <Footer />
      {showEditModal && (
        <EditAdminProfile
          admin={admin}
          onClose={() => setShowEditModal(false)}
          onSave={(updatedAdmin) => {
            sessionStorage.setItem("user", JSON.stringify(updatedAdmin));
            setShowEditModal(false);
          }}
        />
      )}

    </>
  );
};

export default AdminHome;
