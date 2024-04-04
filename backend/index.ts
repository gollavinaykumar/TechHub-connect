import express from "express";
import signUpRoutes from "../backend/Routes/signUpRoutes";
import loginRoutes from "./Routes/loginRoutes";
import CoursesRoutes from "./Routes/CoursesRoutes";
import CourseRoutes from "./Routes/CourseRoutes";
import SingleCourseRoutes from "./Routes/SingleCourseRoutes";
import updateProfileRoutes from "./Routes/updateProfileRoutes";
import userProfileRoutes from "./Routes/userProfileRoutes";
import updatePricePlanRoutes from "./Routes/updatePlanPriceRoutes";

const app = express();
const cors = require("cors");
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/signup", signUpRoutes);
app.use("/login", loginRoutes);
app.use("/Home", CoursesRoutes);
app.use("/pricing", updatePricePlanRoutes);
app.use("/Home/:title", CourseRoutes);
app.use("/Home/:title/:id", SingleCourseRoutes);
app.use("/profile", updateProfileRoutes);
app.use("/Home/user", userProfileRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port`);
});
