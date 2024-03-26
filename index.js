import express from "express";
import router from "./routes/routes.js";
const app = express();
const PORT = 8080;

//middleware
app.use("/", router);


app.listen(PORT, () => {
  console.log(`servidor corriendo en http://localhost:${PORT}`);
});
