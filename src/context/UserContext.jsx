import React, { createContext, useContext, useEffect, useState } from "react";
import { get, post, put, deleteUser } from "../services/ApiEndpoint";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Logout } from "../redux/AuthSlice";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    status: "Active",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currUser = useSelector((state) => state.Auth.user);


    const fetchUsers = async () => {
      try {
        const request = await get("/api/users/getAllUsers");
        const response = request?.data;
        if (request.status === 200) {
          setUsers(response.users);
        }
        // console.log(response)
      } catch (error) {
        console.log(error);
      }
    };

  // Add or Edit User
  const handleSaveUser = async () => {
    try {
      if (selectedUser) {
        // Editing an existing user
        // console.log(selectedUser)
        const request = await put(
          `/api/admin/edit/${selectedUser._id}`,
          {...newUser, currUser}
        );
        if (request.status === 200) {
          toast.success("Update Successfull");
          setUsers(
            users.map((user) =>
              user._id === selectedUser._id ? request.data.user : user
            )
          );
        }
      } else {
        // Adding a new user
        // console.log(newUser);
        const request = await post("/api/admin/add", newUser);
        if (request.status === 201) {
          toast.success(`${request?.data?.user?.role} added successfully!`);
          setUsers([...users, request.data.user]);
        }
      }
      setSelectedUser(null); // Reset form
      setNewUser({ name: "", email: "", role: "", status: "Active" });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Access Unauthorized!");
      setSelectedUser(null)
      setNewUser({ name: "", email: "", role: "", status: "Active" });
    }
  };

  // Delete User
  const handleDelete = async (id) => {
    try {
      const request = await deleteUser(`/api/admin/delete/${id}`);
      if (request.status === 200) {
        toast.success("User deleted successfully!");
        setUsers(users.filter((user) => user._id !== id));
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Access Unauthorized!");
    }
  };

  // Toggle Status
  const handleToggleStatus = async (user) => {
    try {
      const updatedStatus = user.status === "Active" ? "Inactive" : "Active";
      const res = await put(`/api/admin/status/${user._id}`, {
        status: updatedStatus,
      });
      if (res.status === 200) {
        toast.success("Status updated successfully!");
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u._id === user._id ? { ...u, status: updatedStatus, permissions: res?.data?.user?.permissions} : u
          )
        );
      }
      // console.log(res)
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Access Unauthorized!");
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      const request = await post("/api/auth/logout");
      if (request.status === 200) {
        dispatch(Logout());
        navigate("/landing/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // permissions
  const handlePermissionToggle = async (user, permission) => {
    const updatedPermissions = user?.permissions?.includes(permission)
      ? user.permissions.filter((perm) => perm !== permission) // Remove permission
      : [...user.permissions, permission]; // Add permission
  
    try {
      // console.log(permission)
      const response = await put(`/api/admin/permissions/${user._id}`, { permissions: updatedPermissions });
      if (response.status === 200) {
        toast.success('Permissions updated successfully!');
        setUsers(users.map((u) => (u._id === user._id ? response.data.user : u)));
      }
    } catch (error) {
      console.error('Error updating permissions:', error);
      toast.error(error?.response?.data?.message || "Access Unauthorized!");
    }
  };



  return (
    <UserContext.Provider
      value={{
        users,
        fetchUsers,
        newUser,
        setNewUser,
        selectedUser,
        setSelectedUser,
        handleToggleStatus,
        handleSaveUser,
        handleDelete,
        handlePermissionToggle,
        handleLogout
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);