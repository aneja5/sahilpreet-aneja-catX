import Status from "./Status";
import StatusBox from "./StatusBox";
import { useQuery } from "@tanstack/react-query";

const Statuses = ({ username = null }) => {
	const ENDPOINT = username
		? `/api/status/user/${username}` 
		: `/api/status/all`;

	const {
		data: statuses,
		isLoading,
		isRefetching,
		error,
	} = useQuery({
		queryKey: username ? ["userStatuses", username] : ["statuses"],
		queryFn: async () => {
			try {
				const res = await fetch(ENDPOINT);
				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}

				return data;
			} catch (error) {
				throw new Error(error.message);
			}
		},
		enabled: !!ENDPOINT, // Ensure the query only runs when the endpoint is defined
	});

	return (
		<>
			{/* Show loading or refetching placeholders */}
			{(isLoading || isRefetching) && (
				<div className="flex flex-col justify-center">
					<StatusBox />
					<StatusBox />
					<StatusBox />
				</div>
			)}

			{/* Show error message if query fails */}
			{error && (
				<p className="text-center my-4 text-red-500">
					{error.message || "Failed to fetch statuses. Please try again later."}
				</p>
			)}

			{/* Show message if no statuses are available */}
			{!isLoading && !isRefetching && statuses?.length === 0 && (
				<p className="text-center my-4">
					{username
						? "This user hasn't posted any statuses yet."
						: "No statuses available. Be the first to post! 🚀"}
				</p>
			)}

			{/* Render statuses when available */}
			{!isLoading && !isRefetching && statuses && (
				<div>
					{statuses.map((status) => (
						<Status key={status._id} status={status} />
					))}
				</div>
			)}
		</>
	);
};

export default Statuses;
