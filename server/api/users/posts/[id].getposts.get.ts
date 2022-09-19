// GET THE DATA OF THE CHANNEL ON WHICH THE USER CLICKS
// FOR EX-  IF THE USER CLICKS CHANNEL A. FETCH THE DATA OF CHANNEL A
import { Channels, Users } from "../../../dbModels";

export default defineEventHandler(async (e) => {
	//GET A USERS
	const query = useQuery(e);
	const userId = query.userid;
	const channelId = query.channelid;
	console.log(userId, channelId);

	try {
		const channels = await Users.find({})
	} catch (error) {
		
	}

});
