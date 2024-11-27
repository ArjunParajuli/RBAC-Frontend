import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import UserCard from "../components/UserCard";
import UserForm from "../components/UserForm";
import { useUserContext } from "../context/UserContext";
import { useSelector } from "react-redux";

export default function Home() {
  const {
    users,
    fetchUsers,
    newUser,
    setNewUser,
    selectedUser,
    setSelectedUser,
    handleLogout,
    handleToggleStatus,
    handleSaveUser,
    handlePermissionToggle,
    handleDelete
  } = useUserContext();

  useEffect(() => {
    fetchUsers(); 
  }, []);

  const currUser = useSelector(state => state.Auth.user)

   // Sort users to show current user first
   const sortedUsers = users
    ? [...users].sort((a, b) => (a._id === currUser._id ? -1 : b._id === currUser._id ? 1 : 0))
    : [];


    // console.log(users)

    return (
      <div className="min-h-screen p-6 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
        <div
          className="max-w-7xl mx-auto bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 shadow-xl rounded-lg p-8 relative"
        >
          {/* Header */}
          <Header handleLogout={handleLogout} />
    
          {/* User Form */}
          <UserForm
            selectedUser={selectedUser}
            newUser={newUser}
            setNewUser={setNewUser}
            handleSaveUser={handleSaveUser}
          />
    
          {/* Users List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {sortedUsers?.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                handleToggleStatus={handleToggleStatus}
                handlePermissionToggle={handlePermissionToggle}
                setSelectedUser={setSelectedUser}
                setNewUser={setNewUser}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>
    );
    
}
