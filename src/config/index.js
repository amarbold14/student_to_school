const sharedConstants = {};
const testConstants = {
  apiBaseUrl: "https://bb:442/api/",
  isTest: true,
};

const prodConstants = {
  apiBaseUrl: "https://aa:442/api/",
  isTest: false,
};
export const config = {
  ...sharedConstants,
  // ...testConstants,
  ...prodConstants,
};
