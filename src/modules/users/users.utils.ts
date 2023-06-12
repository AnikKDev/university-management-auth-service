import Users from "./users.model";
export const findLastUserId = async () => {
  // get users in descending order based on creation and then lean them to get the data not as a document but as a clean object
  const lastUser = await Users.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastUser?.id;
};
export const generateUserId = async () => {
  const currentUserId = (await findLastUserId()) || String(0).padStart(5, "0");
  return currentUserId;
  //   return String(lastUserId).padStart(5, "0");
};
