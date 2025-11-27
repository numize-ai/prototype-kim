import "@testing-library/jest-dom";

// Mock framer-motion to avoid animation issues in tests
jest.mock("framer-motion", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
  const React = require("react");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return {
    ...jest.requireActual("framer-motion"),
    motion: new Proxy(
      {},
      {
        get: (_, prop) => {
          // Return a React component that strips framer-motion props
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, react/display-name, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
          return React.forwardRef(({ children, ...props }: any, ref: any) =>
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
            React.createElement(prop as string, { ...props, ref }, children),
          );
        },
      },
    ),
  };
});
