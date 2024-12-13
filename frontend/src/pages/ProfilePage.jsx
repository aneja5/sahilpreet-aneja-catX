import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Statuses from "../components/Statuses";
import ProfileHeaderBox from "../components/ProfileHeaderBox";
import EditProfileModal from "./EditProfileModal";

import { IoCalendarOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

import { useQuery } from "@tanstack/react-query";
import { formatMemberSinceDate } from "../date";

import updateUserProfile from "../helper/updateUserProfile";


const ProfilePage = () => {
    const [coverImg, setCoverImg] = useState(null);
    const [profileImg, setProfileImg] = useState(null);

    const coverImgRef = useRef(null);
    const profileImgRef = useRef(null);

    const { username } = useParams();

    const { data: authenticateUser } = useQuery({ queryKey: ["authenticateUser"] });

    const {
		data: user,
		isLoading,
		refetch,
		isRefetching,
	} = useQuery({
		queryKey: ["userProfile"],
		queryFn: async () => {
			try {
				const res = await fetch(`/api/users/profile/${username}`);
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
				return data;
			} catch (error) {
				throw new Error(error);
			}
		},
	});

    const { isUpdatingProfile, updateProfile } = updateUserProfile();

    const isMyProfile = authenticateUser?._id === user?._id;
	const memberSinceDate = formatMemberSinceDate(user?.createdAt);

    const handleImgChange = (e, state) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                state === "coverImg" && setCoverImg(reader.result);
                state === "profileImg" && setProfileImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
		refetch();
	}, [username, refetch]);

    return (
        <>
            <div className="flex-[4_4_0] border-r border-gray-700 min-h-screen ">
                {(isLoading || isRefetching)  && <ProfileHeaderBox />}
                {!isLoading && !isRefetching && !user && <p className="text-center text-lg mt-4">User not found</p>}
                <div className="flex flex-col">
                    {!isLoading && !isRefetching && user && (
                        <>
                            <div className="relative group/cover">
                                <img
                                    src={coverImg || user?.coverImg || "/cover.png"}
                                    className="h-52 w-full object-cover"
                                    alt="cover image"
                                />
                                {isMyProfile && (
                                    <div
                                        className="absolute top-2 right-2 rounded-full p-2 bg-gray-800 bg-opacity-75 cursor-pointer opacity-0 group-hover/cover:opacity-100 transition duration-200"
                                        onClick={() => coverImgRef.current.click()}
                                    >
                                        <MdEdit className="w-5 h-5 text-white" />
                                    </div>
                                )}

                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    ref={coverImgRef}
                                    onChange={(e) => handleImgChange(e, "coverImg")}
                                />
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    ref={profileImgRef}
                                    onChange={(e) => handleImgChange(e, "profileImg")}
                                />
                                <div className="avatar absolute -bottom-16 left-4">
                                    <div className="w-32 rounded-full relative group/avatar">
                                        <img
                                            src={profileImg || user?.profileImg || "/avatar-placeholder.png"}
                                        />
                                        <div className="absolute top-5 right-3 p-1 bg-primary rounded-full group-hover/avatar:opacity-100 opacity-0 cursor-pointer">
                                            {isMyProfile && (
                                                <MdEdit
                                                    className="w-4 h-4 text-white"
                                                    onClick={() => profileImgRef.current.click()}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end px-4 mt-5">
                                {isMyProfile && <EditProfileModal authenticateUser={authenticateUser} />}
                                {(coverImg || profileImg) && (
                                    <button
                                    className='btn btn-primary rounded-full btn-sm text-white px-4 ml-2'
                                    onClick={async () => {
                                        await updateProfile({ coverImg, profileImg });
                                        setProfileImg(null);
                                        setCoverImg(null);
                                    }}
                                >
                                    {isUpdatingProfile ? "Updating..." : "Update"}
                                </button>
                                )}
                            </div>

                            <div className="flex flex-col gap-4 mt-14 px-4">
                                <div className="flex flex-col">
                                    <span className="font-bold text-lg">{user?.fullName}</span>
                                    <span className="text-sm text-slate-500">@{user?.username}</span>
                                    <span className="text-sm my-1">{user?.bio}</span>
                                </div>

                                <div className="flex gap-2 flex-wrap">
                                    <div className="flex gap-2 items-center">
                                        <IoCalendarOutline className="w-4 h-4 text-slate-500" />
                                        <span className="text-sm text-slate-500">{memberSinceDate}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full border-b border-gray-700 mt-4">
                                <div
                                    className="flex justify-center flex-1 p-3"
                                >
                                    Feed
                                </div>
                            </div>
                        </>
                    )}

                    <Statuses username={username} />
                </div>
            </div>
        </>
    );
};

export default ProfilePage;


