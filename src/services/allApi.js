import { commonAPI } from "./commonAPI";
// Remove this unused import ↓
// import { serverURL } from "./serverURL";


// register
export const registerAPI = async (reqBody) => {
  return await commonAPI("POST","/api/register",reqBody);
};


// login - FIXED (change "/login" → "/api/login")
export const loginAPI = (data) => {
  return commonAPI("POST", "/api/login", data, {"Content-Type": "application/json"});
};


// edit user profile
export const updateProfileAPI = async (data, headers) => {
  return await commonAPI("PUT", "/api/update-profile", data, headers);
};


// get all blood requests
export const getAllRequestsAPI = async () => {
  return await commonAPI("GET", "/api/all-requests");
};


// add blood request
export const addRequestAPI = async (reqBody, reqHeader) => {
  return await commonAPI("POST","/api/add-request",reqBody,reqHeader);
};


// get logged-in user's requests
export const getMyRequestsAPI = async (headers) => {
  return await commonAPI("GET", "/api/my-requests", "", headers);
};


// delete request by user 
export const deleteRequestAPI = async (id, headers) => {
  return await commonAPI("DELETE", `/api/delete-request/${id}`, "", headers);
};

// update admin details
export const updateAdminProfileAPI = (reqBody, reqHeader) =>
  commonAPI("PUT", "/api/admin/update-profile", reqBody, reqHeader);

// admin can see all users
export const getAllUsersAPI = async (reqHeader) => {
  return await commonAPI("GET", "/api/admin/users", null, reqHeader);
};

// delete requests by admin
export const deleteRequestByAdminAPI = async (id, headers) => {
  return await commonAPI("DELETE", `/api/delete-request/${id}`, "", headers);  // ← ADD /api HERE
};
