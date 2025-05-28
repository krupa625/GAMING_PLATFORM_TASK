const express = require("express");
const { connectDb } = require("./database/db");
connectDb();
const { port } = require("./config/config");
const gameRoutes = require("./models-routes-services/games/game.route");
const userRoutes = require("./models-routes-services/users/user.route");
const adminRoutes = require("./models-routes-services/admin/admin.route");
const { commonLogger } = require("./middleware/index");

const app = express();
app.use(express.json());
app.use(commonLogger);

app.use("/api", gameRoutes, userRoutes, adminRoutes);

app.get("/", (req, res) => res.send(" Gaming Platform API is live"));

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
