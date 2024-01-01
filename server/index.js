import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config.js";
import express from "express";
import residencyRoute from "./routers/residencyRoute.js";
import userRoute from "./routers/userRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//register routes
app.use("/api/user", userRoute);
app.use("/api/residency", residencyRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
