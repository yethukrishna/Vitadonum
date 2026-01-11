import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import AdminHeader from "../components/AdminHeader";
import { getAllRequestsAPI } from "../../services/allApi";
import { deleteRequestByAdminAPI } from "../../services/allApi";

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchAllRequests();
  }, []);

  const fetchAllRequests = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) return;

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    const result = await getAllRequestsAPI(reqHeader);

    if (result.status === 200) {
      setRequests(result.data);
    }
  };

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("token");

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    const result = await deleteRequestByAdminAPI(id, reqHeader);

    if (result.status === 200) {
      setRequests(requests.filter((item) => item._id !== id));
    }
  };


  return (
    <>
      <AdminHeader />

      <div className="bg-zinc-200 min-h-screen">
        <div className="max-w-7xl mx-auto p-10">

          {/* Page Header */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-semibold">Blood Requests</h1>
          </div>

          {/* Requests Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {requests.length > 0 ? (
              requests.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-black/80 p-6 hover:shadow-lg transition"
                >
                  <h2 className="font-semibold text-lg">
                    {item.userName}
                  </h2>

                  <p className="text-sm text-gray-600 mt-1">
                    Patient Name: <span className="font-bold">{item.patientName}</span>
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    Age: <span className="font-bold">{item.age}</span>
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    Blood Group:{" "}
                    <span className="font-bold text-red-500">
                      {item.bloodGroup}
                    </span>
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    Hospital: <span className="font-bold">{item.hospital}</span>
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    Description:{" "}
                    <span className="font-bold">{item.description}</span>
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    Bystander: <span className="font-bold">{item.bystander}</span>
                  </p>

                  <p className="text-xl text-gray-600 mt-1">
                    Contact No:{" "}
                    <span className="font-bold text-xl">
                      {item.contact}
                    </span>
                  </p>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Delete Request
                  </button>

                </div>
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">
                No requests found
              </p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AdminRequests;
