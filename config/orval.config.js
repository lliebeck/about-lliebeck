module.exports = {
  service: {
    output: {
      mode: "tags-split",
      target: "../api/service.ts",
      schemas: "../api/model",
      client: "react-query",
      mock: true,
    },
    input: {
      target: "./openapi.json",
    },
  },
};
