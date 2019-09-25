let app = require("../server");
let testServer = require("supertest");

describe("test the root path", () => {
    test("/user should return user info when authenticated", async () => {
      //Login
      //agent remembers cookies, holds onto it
      let agent = testServer.agent(app);
      const response = await agent
        .post("/api/user/login")
        //send data
        .send({ username: "andy", password: "andy" });
      expect(response.statusCode).toBe(200);
      //GET to /user
      const userResponse = await agent.get("/api/user");
      expect(userResponse.statusCode).toBe(200);
      const historyResponse = await agent.get("/api/user/history/2");
      expect(historyResponse.statusCode).toBe(200);
      const createdResponse = await agent.get("/api/user/created/2");
      expect(createdResponse.statusCode).toBe(200)
      ``;
    });
})