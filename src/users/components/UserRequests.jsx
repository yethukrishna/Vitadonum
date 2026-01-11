import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import { deleteRequestAPI, getMyRequestsAPI } from "../../services/allApi";
import ProfileHeader from "./ProfileHeader";

const UserRequests = () => {
  const [requests, setRequests] = useState([]);

  const token = sessionStorage.getItem("token");
  const reqHeader = {
    Authorization: `Bearer ${token}`,
  };

  // fetch user's requests
  const fetchMyRequests = async () => {
    const result = await getMyRequestsAPI(reqHeader);
    if (result.status === 200) {
      setRequests(result.data);
    }
  };

  // delete request
  const handleDelete = async (id) => {
    const result = await deleteRequestAPI(id, reqHeader);
    if (result.status === 200) {
      fetchMyRequests(); // refresh list
    }
  };

  useEffect(() => {
    fetchMyRequests();
  }, []);

  return (
    <>
      <ProfileHeader />

      <div className="bg-zinc-200 min-h-screen">
        <div className="max-w-7xl mx-auto p-10">

          <div className="mb-10 text-center">
            <h1 className="text-3xl font-semibold">Your Blood Requests</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {requests.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl border border-black/80 p-6 flex flex-col"
              >
                <div className="flex justify-between">

                  <div>
                    <h2 className="font-semibold text-lg">{item.userName}</h2>

                    <p className="text-sm mt-1">
                      Patient Name: <b>{item.patientName}</b>
                    </p>

                    <p className="text-sm mt-1">
                      Age: <b>{item.age}</b>
                    </p>

                    <p className="text-sm mt-1">
                      Blood Group:{" "}
                      <b className="text-red-500">{item.bloodGroup}</b>
                    </p>

                    <p className="text-sm mt-1">
                      Hospital: <b>{item.hospital}</b>
                    </p>

                    <p className="text-sm mt-1">
                      Description: <b>{item.description}</b>
                    </p>

                    <p className="text-sm mt-1">
                      Bystander: <b>{item.bystander}</b>
                    </p>

                    <p className="text-lg mt-1">
                      Contact: <b>{item.contact}</b>
                    </p>
                  </div>
                </div>
                <div className="mt-auto flex justify-end">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-4 py-2 text-red-600 font-semibold border border-red-500 rounded-lg ">
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {requests.length === 0 && (
              <p className="text-center col-span-full text-gray-600">
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

export default UserRequests;


