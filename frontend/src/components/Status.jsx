import { FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useState } from "react";

import { formatStatusDate } from "../date";

const Status = ({ status }) => {
  const { data: authenticateUser } = useQuery({ queryKey: ["authenticateUser"] });
  const queryClient = useQueryClient();
  const statusOwner = status.user;

  const isMyStatus =
  authenticateUser && statusOwner
    ? authenticateUser._id === statusOwner._id
    : false;
  
  if (!statusOwner) {
   return <div></div>;
  }
    
  const formattedDate = formatStatusDate(status.createdAt);

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(status.text);

  const { mutate: deleteStatus, isLoading: isDeleting } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/status/${status._id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      return data;
    },
    onSuccess: () => {
      toast.success("Status deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["statuses"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete status");
    },
  });

  const { mutate: updateStatus, isLoading: isUpdating } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/status/${status._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: editText }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      return data;
    },
    onSuccess: () => {
      toast.success("Status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["statuses"] });
      setIsEditing(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update status");
    },
  });

  const handleDeletePost = () => {
    if (isDeleting) return;
    deleteStatus();
  };

  const handleEditPost = () => {
    if (isUpdating) return;
    updateStatus();
  };

  return (
    <div className="flex gap-2 items-start p-4 border-b border-gray-700">
      <div className="avatar">
        <Link to={`/profile/${statusOwner.username}`} className="w-8 rounded-full overflow-hidden">
          <img src={statusOwner.profileImg || "/avatar-placeholder.png"} alt="User avatar" />
        </Link>
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex gap-2 items-center">
          <Link to={`/profile/${statusOwner.username}`} className="font-bold">
            {statusOwner.fullName}
          </Link>
          <span className="text-gray-700 flex gap-1 text-sm">
            <Link to={`/profile/${statusOwner.username}`}>@{statusOwner.username}</Link>
            <span>·</span>
            <span>{formattedDate}</span>
          </span>
          {isMyStatus && (
            <span className="flex justify-end flex-1 gap-2">
              <FaEdit
                className={`cursor-pointer hover:text-blue-500 ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => setIsEditing(!isEditing)}
              />
              <FaTrash
                className={`cursor-pointer hover:text-red-500 ${isDeleting ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={handleDeletePost}
              />
            </span>
          )}
        </div>
        {isEditing ? (
          <div className="flex flex-col gap-3">
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full p-2 border border-gray-700 rounded"
            />
            <button
              onClick={handleEditPost}
              className="self-end px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={isUpdating}
            >
              Save
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 overflow-hidden">
            <span>{status.text}</span>
            {status.img && (
              <img
                src={status.img}
                className="h-80 object-contain rounded-lg border border-gray-700"
                alt="Status content"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Status;
