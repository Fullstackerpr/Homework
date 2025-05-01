import Doctor from '../models/doctor.model.js';
import { catchError } from '../utils/error-response.js';
import { doctorValidator } from '../validation/doctor.validation.js';
import { otpGenerator } from '../utils/otp-generator.js';
import { getCache, setCache } from '../utils/cache.js';

export class DoctorController {
  async createDoctor(req, res) {
    try {
      const { error, value } = doctorValidator(req.body);
      if (error) {
        catchError(res, 400, error);
      }
      const existPhone = await Doctor.findOne({
        phoneNumber: value.phoneNumber,
      });
      if (existPhone) {
        catchError(res, 409, 'Phone number already exist');
      }
      const doctor = await Doctor.create(value);
      return res.status(201).json({
        statusCode: 201,
        message: 'succuss',
        data: doctor,
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }

  async signinDoctor(req, res) {
    try {
      const { phoneNumber } = req.body;
      const doctor = await Doctor.findOne({ phoneNumber });
      if (!doctor) {
        catchError(res, 404, 'Doctor not found');
      }
      const otp = otpGenerator();
      setCache(phoneNumber, otp);
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: otp,
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }
}
