hello: (parent, args, { loggedInUser }) => {
  if (!loggedInUser) {
    throw new Error("You are not authenticated!");
  }
  return `Hello ${loggedInUser.email}`;
};

blog.comments[commentIndex].upvotes.push({ user: loggedInUser });
blog.save();
return sendResponse("Comment upvoted", true);
