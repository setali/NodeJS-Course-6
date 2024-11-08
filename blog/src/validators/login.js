export const loginSchema = {
  body: {
    type: "object",
    properties: {
      username: {
        type: "string",
        required: true,
        maxLength: 255,
      },
      password: {
        type: "string",
        required: true,
        maxLength: 255,
      },
    },
  },
};
