import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const superAdminValidation = Joi.object({
    name: Joi.string()
      .min(3)
      .max(50)
      .pattern(/^([^0-9]*)$/i, 'only letters')
      .required(),
    lastName: Joi.string()
      .min(3)
      .max(50)
      .pattern(/^([^0-9]*)$/i, 'only letters')
      .required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(8).required(),
  });
  const validation = superAdminValidation.validate(req.body, {
    abortEarly: false,
  });
  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

const validateEdit = (req, res, next) => {
  const superAdminValidation = Joi.object({
    name: Joi.string().min(3).max(50).pattern(/^([^0-9]*)$/i, 'only letters'),
    lastName: Joi.string().min(3).max(50).pattern(/^([^0-9]*)$/i, 'only letters'),
    email: Joi.string().email(),
    password: Joi.string().alphanum().min(8),
  });
  const validation = superAdminValidation.validate(req.body, {
    abortEarly: false,
  });
  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export { validateCreation, validateEdit };
