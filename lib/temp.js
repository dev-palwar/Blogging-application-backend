// This function is used to check the logged in user

const sayHello = (loggedInUser) => {
  if (!loggedInUser) {
    throw new Error("You are not authenticated!");
  }
  return `Hello ${loggedInUser.email}`;
};


module.exports = { sayHello};
