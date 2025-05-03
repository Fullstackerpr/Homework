import { User } from "../models/index.js";
import {
  hashPass,
  successRes,
  errorResponse,
  userValidation,
} from "../utils/index.js";

export class TeacherController {
  async registerTeacher(req, res) {
    try {
      const { data } = userValidation(req.body);

      const { name, email, password } = data;

      const existsUser = await User.findOne({ email });

      if (existsUser) {
        return errorResponse(res, 409, `Teacher already exists`);
      }

      const encodedPass = await hashPass(password);

      const newTeacher = await User.create({
        name,
        email,
        password: encodedPass,
        enrolledCourse_id: null,
        role: "teacher",
        otp_secret: null,
        otp_enabled: null,
      });


      return successRes(
        res,
        201,
        "Teacher registered successfully",
        newTeacher._id
      );
    } catch (error) {
      return errorResponse(res, 500, error);
    }
  }
}
