hello: (parent, args, { loggedInUser }) => {
  if (!loggedInUser) {
    throw new Error("You are not authenticated!");
  }
  return `Hello ${loggedInUser.email}`;
};
