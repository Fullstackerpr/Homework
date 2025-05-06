import Joi from 'joi';

export const patientValidator = (data) => {
    const patient = Joi.object({
        fullName: Joi.string().min(2),
        phoneNumber: Joi.string().pattern(/^(\+998|998)(9[0-9]|3[3]|8[8])[0-9]{7}$/),
        password: Joi.string().min(4).max(20),
        address: Joi.string(),
        age: Joi.number().valid('male', 'female'),
        gender: Joi.string().valid('male', 'female')
    });
    return patient.validate(data);
};