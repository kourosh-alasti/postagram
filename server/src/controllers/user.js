import User from "../models/user";

export const createUser = async ({ username, password }) => {
  try {
    const newUser = await User.create({ username, password });

    return newUser;
  } catch (error) {
    console.error("Error occured while creating new user");
    console.error(error);
  }
};

export const getUserByUsername = async (username) => {
  try {
    const fetchedUser = await User.find({ username });
    return fetchedUser;
  } catch (error) {
    console.error("Error while getting user");
    console.error(error);
  }
};

export const addFollow = async ({ username, toFollow }) => {
  try {
    const fetchedUser = await User.updateOne(
      {
        username,
      },
      { $push: { username: toFollow } }
    );

    return fetchedUser;
  } catch (error) {
    console.error(`Error while following ${toFollow}`);
    console.error(error);
  }
};

export const removeFollow = async ({ username, toFollow }) => {
  try {
    const fetchedUser = await User.updateOne(
      { username },
      { $pull: { username: toFollow } }
    );

    return fetchedUser;
  } catch (error) {
    console.error(`Error while unfollowing ${toFollow}`);
    console.error(error);
  }
};

export const deleteAllUsers = async () => {
  try {
    await User.deleteMany({});
  } catch (error) {
    console.error("Error Deleting Users");
    console.error(error);
  }
};
