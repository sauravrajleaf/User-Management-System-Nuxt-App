// // GET THE DATA OF THE CHANNEL ON WHICH THE USER CLICKS
// // FOR EX-  IF THE USER CLICKS CHANNEL A. FETCH THE DATA OF CHANNEL A
// import { Channels } from "../../../dbModels";

// export default defineEventHandler(async (e) => {
// 	//GET DETAILS OF ALL CREATED CHANNELS

// 	try {
// 		console.log("Get all channels");
// 		console.log("GET /api/users/channels");
// 		const allChannels = await Channels.find();
// 		// return usersData;
// 		return allChannels.map((channel) => ({
// 			id: channel._id,
// 			name: channel.name,
// 			channeldata: channel.channeldata,
// 			users: channel.users,
// 		}));
// 	} catch (err) {
// 		console.dir(err);
// 		e.res.statusCode = 500;
// 		return {
// 			code: "ERROR",
// 			message: "Something went wrong.",
// 		};
// 	}
// });
