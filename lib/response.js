const sendResponse = (message, success) => {
  return {
    message: success ? message : 'error: ' + message,
    success,
  };
};

module.exports = sendResponse;
