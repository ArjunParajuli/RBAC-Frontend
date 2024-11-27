import React from 'react'

const UserForm = ({selectedUser, newUser, setNewUser, handleSaveUser}) => {
  return (
    <div className="mb-6">
          <h3 className="text-2xl font-medium text-green-700 mb-4">
            {selectedUser ? "Edit User" : "Add User"}
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-between items-center gap-4">
              <select
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
                className="w-auto p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="mod">Mod</option>
                <option value="user">User</option>
              </select>
              <button
                onClick={handleSaveUser}
                className="p-3 w-auto bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
              >
                {selectedUser ? "Update" : "Add"} User
              </button>
            </div>
          </div>
        </div>
  )
}

export default UserForm