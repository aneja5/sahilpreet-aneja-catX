import React from "react";
import Statuses from "../components/Statuses";
import CreateStatus from "./CreateStatus";

const HomePage = () => {
	return (
		<>
			<div className="flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen">
				<div className="flex w-full border-b border-gray-700">
					<h1 className="p-3 text-xl font-bold">Home</h1>
				</div>

				<CreateStatus />

				<Statuses />
			</div>
		</>
	);
};

export default HomePage;

