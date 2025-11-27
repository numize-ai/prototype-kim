// __mocks__/framer-motion.js
const React = require("react");
const handler = {
  get: (target, prop) => {
    return ({ children, ...rest }) => React.createElement(React.Fragment, null, children);
  },
};
module.exports = {
  motion: new Proxy({}, handler),
};
