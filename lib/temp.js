const sayHello = (loggedInUser) => {
  if (!loggedInUser) {
    throw new Error("You are not authenticated!");
  }
  return `Hello ${loggedInUser.email}`;
};

const log = (value) => {
  console.log(value);
};

module.exports = { sayHello, log };
