import React from 'react'

const AdminHeader = ({handleLogout}) => {
  return (
    <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-blue-500">Manage Users</h2>
          <button
            className="bg-red-500 text-white w-auto py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
  )
}

export default AdminHeader