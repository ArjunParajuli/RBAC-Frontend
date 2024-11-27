import React from "react";
import { useSelector } from "react-redux";

const UserCard = ({
  user,
  handleToggleStatus,
  handlePermissionToggle,
  setSelectedUser,
  setNewUser,
  handleDelete,
}) => {

  const currUser = useSelector((state) => state.Auth.user);
  // console.log(user._id, currUser._id)

  return (
    <div
      key={user._id}
      className={`p-6 ${currUser._id === user._id ? "bg-green-200" : "bg-white"} shadow-lg rounded-lg border border-gray-300 hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105`}
    >
      {/* User Info */}
      <div className="flex flex-col space-y-4">
        <h4 className="text-2xl font-semibold text-green-600">{user.name}</h4>
        <p className="text-sm text-gray-600">{user.email}</p>
        <p className="text-sm text-gray-500 mt-1">Role: {user.role}</p>
        <div className="flex justify-between">
        <p
          className={`text-sm font-medium mt-2 ${
            user.status === "Active" ? "text-green-600" : "text-red-600"
          }`}
        >
          Status: {user.status}
        </p>

        <button
          onClick={() => handleToggleStatus(user)}
          className="bg-blue-500 w-auto text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          {`${user.status==='Active' ? 'Deactivate' : 'Activate' }`}
        </button>
        </div>
        

        {/* Permissions Section */}
        <div className="mt-4">
          <h5 className="text-lg font-medium text-yellow-600 mb-2">
            Permissions
          </h5>
          <div className="space-y-3">
            {["Read", "Write", "Delete"].map((perm) => (
              <div
                key={perm}
                className="flex justify-between items-center p-3 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition duration-200"
              >
                <label className="text-sm text-gray-700">{perm}</label>
                <div className="flex items-center space-x-2">
                  {/* Styled Checkbox */}
                  <input
                    type="checkbox"
                    checked={user.permissions.includes(perm)}
                    onChange={() => handlePermissionToggle(user, perm)}
                    className="text-blue-600 focus:ring-blue-500 rounded-full w-6 h-6 cursor-pointer transition duration-200"
                  />
                  <span
                    className={`text-sm font-semibold ${
                      user.permissions.includes(perm)
                        ? "text-blue-600"
                        : "text-gray-500"
                    }`}
                  >
                    {user.permissions.includes(perm)
                      ? "Granted"
                      : "Not Granted"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex mt-6 space-x-4">
        <button
          onClick={() => {
            setSelectedUser(user);
            setNewUser(user);
          }}
          className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(user._id)}
          className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-all duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
