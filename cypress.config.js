import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
  env:{
    base_url: "http://localhost:5173",
    server_url: "http://localhost:3000"
  }
});
