import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// Example API call function to fetch users
const fetchUsers = async () => {
  const res = await fetch("/api/users/search");
  if (!res.ok) throw new Error("Failed to fetch users");
  return await res.json();
};

const RightSideBoxWithSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  // Log the fetched users to verify the data
  console.log("Users fetched:", users);
  console.log("Is loading:", isLoading);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter users based on partial matching
  const filteredUsers = users?.filter((user) =>
    user.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-2 w-52 my-2">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search users..."
        className="input input-bordered w-full max-w-xs mb-4"
        onChange={handleSearchChange}
        value={searchQuery}
      />

      {/* Skeleton Loader or filtered users */}
      {isLoading ? (
        <div className="space-y-2">
          {/* Skeleton UI for the user list */}
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex gap-2 items-center">
              <div className="skeleton w-8 h-8 rounded-full bg-gray-300 animate-pulse"></div>
              <div className="flex flex-1 justify-between">
                <div className="flex flex-col gap-1 w-full">
                  <div className="skeleton h-2 w-3/4 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="skeleton h-2 w-1/2 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
                <div className="skeleton h-6 w-14 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {/* Display filtered users */}
          {filteredUsers?.length > 0 ? (
            filteredUsers.map((user) => (
              <div key={user._id} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                <p>{user.username}</p>
              </div>
            ))
          ) : (
            <p>No users found</p> // Display a message if no users match
          )}
        </div>
      )}
    </div>
  );
};

export default RightSideBoxWithSearch;
