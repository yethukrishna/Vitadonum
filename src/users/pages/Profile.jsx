import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import ProfileHeader from "../components/ProfileHeader";
import EditProfile from "../components/EditProfile";
import AddRequest from "../components/AddRequest";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);

  const navigate = useNavigate();

  // get logged in user
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // calculate age from DOB
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Please login to view profile</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-200 flex flex-col">
      <ProfileHeader />

      <div className="container mx-auto px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT CARD */}
          <div className="bg-white/5 p-8 rounded-2xl border border-black">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border border-black">
                <img
                  src={
                    user.profile
                      ? `http://localhost:4000/upload/${user.profile}`
                      : "https://cdn-icons-png.freepik.com/512/219/219988.png"
                  }
                  alt="profile"
                  className="w-32 h-32 object-cover"
                />
              </div>

              <h2 className="mt-4 text-2xl font-semibold">
                {user.username}
              </h2>

              <p className="text-gray-900 mt-1">
                {user.email}
              </p>

              <div className="mt-6 flex gap-3 w-full">
                <button
                  onClick={() => setShowEditModal(true)}
                  className="flex-1 px-4 py-2 rounded-lg bg-red-500 border border-red-500 text-black hover:bg-white transition flex justify-center items-center gap-2"
                >
                  <FontAwesomeIcon icon={faPen} /> Edit Profile
                </button>
              </div>

              <div className="mt-4 flex gap-3 w-full">
                <button
                  onClick={() => setShowRequestModal(true)}
                  className="flex-1 px-4 py-2 rounded-lg bg-blue-500 border border-blue-500 text-black hover:bg-white transition flex justify-center items-center gap-2"
                >
                  <FontAwesomeIcon icon={faPlus} /> Add Request
                </button>
              </div>

              <div className="mt-4 flex gap-3 w-full">
                <button
                  onClick={() => navigate("/my-requests")}
                  className="flex-1 px-4 py-2 rounded-lg bg-green-500 border border-green-500 text-black hover:bg-white transition"
                >
                  Your Requests
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT DETAILS */}
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-white/5 p-8 rounded-xl border border-black">
              <h3 className="text-xl font-semibold mb-6">Profile</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <ProfileField label="Full Name" value={user.username} />
                <ProfileField label="Email" value={user.email} />
                <ProfileField label="Phone" value={user.phone} />
                <ProfileField label="Location" value={user.location} />
                <ProfileField label="Gender" value={user.gender} />
                <ProfileField label="D-O-B" value={user.dob} />
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
                <SmallBox label="Blood Group" value={user.bloodGroup} />
                <SmallBox
                  label="Age"
                  value={user.dob ? calculateAge(user.dob) : "--"}
                />
                <SmallBox label="Height" value={`${user.height} cm`} />
                <SmallBox label="Weight" value={`${user.weight} kg`} />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      {showEditModal && (
        <EditProfile
          user={user}
          onClose={() => setShowEditModal(false)}
          onSave={(updatedUser) => {
            setUser(updatedUser);
            sessionStorage.setItem("user", JSON.stringify(updatedUser));
            setShowEditModal(false);
          }}
        />
      )}

      {/* ADD REQUEST MODAL */}
      {showRequestModal && (
        <AddRequest
          user={user}
          onClose={() => setShowRequestModal(false)}
        />
      )}

      <Footer />
    </div>
  );
};

const ProfileField = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-900">{label}</p>
    <div className="mt-2 p-3 rounded-lg border border-black">
      {value}
    </div>
  </div>
);

const SmallBox = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-900">{label}</p>
    <div className="mt-2 p-3 rounded-lg border border-black text-center">
      {value}
    </div>
  </div>
);

export default Profile;
