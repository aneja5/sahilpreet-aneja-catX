import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmileFill } from "react-icons/bs";
import { useRef, useState, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const CreateStatus = () => {
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);
    const imgRef = useRef(null);

    const { data: authenticateUser, isLoading, isError } = useQuery({
        queryKey: ["authenticateUser"],
    });

    const queryClient = useQueryClient();

    const {
        mutate: createStatus,
        isPending,
        isError: mutationError,
        error,
    } = useMutation({
        mutationFn: async ({ text, img }) => {
            try {
                const res = await fetch("/api/status/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ text, img }),
                });
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }
                return data;
            } catch (error) {
                throw new Error(error);
            }
        },

        onSuccess: () => {
            setText("");
            setImg(null);
            toast.success("Status created successfully");
            queryClient.invalidateQueries({ queryKey: ["statuses"] });
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        createStatus({ text, img });
    };

    const handleImgChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    if (isLoading) return <div>Loading...</div>;

    if (isError || !authenticateUser) {
        return (
            <div className="flex justify-center items-center">
                <div className="bg-black-500 text-white p-4 rounded-md shadow-lg text-center">
                    Please log in to create a status.
                </div>
            </div>
        );
    }

    return (
        <div className="flex p-4 items-start gap-4 border-b border-gray-700">
            <div className="avatar">
                <div className="w-8 rounded-full">
                    <img
                        src={authenticateUser.profileImg || "/avatar-placeholder.png"}
                        alt="Profile"
                    />
                </div>
            </div>
            <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
                <textarea
                    className="textarea w-full p-0 text-lg resize-none border-none focus:outline-none border-gray-800"
                    placeholder="What is happening?!"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                {img && (
                    <div className="relative w-72 mx-auto">
                        <IoCloseSharp
                            className="absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer"
                            onClick={() => {
                                setImg(null);
                                imgRef.current.value = null;
                            }}
                        />
                        <img
                            src={img}
                            className="w-full mx-auto h-72 object-contain rounded"
                            alt="Preview"
                        />
                    </div>
                )}

                <div className="flex justify-between border-t py-2 border-t-gray-700">
                    <div className="flex gap-1 items-center">
                        <CiImageOn
                            className="fill-primary w-6 h-6 cursor-pointer"
                            onClick={() => imgRef.current.click()}
                        />
                        <BsEmojiSmileFill className="fill-primary w-5 h-5 cursor-pointer" />
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        ref={imgRef}
                        onChange={handleImgChange}
                    />
                    <button className="btn btn-primary rounded-full btn-sm text-white px-4">
                        {isPending ? "Posting..." : "Post"}
                    </button>
                </div>
                {(mutationError || error) && (
                    <div className="text-red-500">{error?.message || mutationError?.message}</div>
                )}
            </form>
        </div>
    );
};

export default CreateStatus;
