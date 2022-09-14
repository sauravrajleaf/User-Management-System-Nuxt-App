// GET THE DATA OF THE CHANNEL ON WHICH THE USER CLICKS
// FOR EX-  IF THE USER CLICKS CHANNEL A. FETCH THE DATA OF CHANNEL A
import { Channels, Users } from "../../../../dbModels";

export default defineEventHandler(async (e) => {
	const userId = e.context.params.id;
	const channelId = e.context.params.id;

	console.log(`GET api/myChannels/${userId}/${channelId}`);
});
