import Employees from '../models/Employees';
import Projects from '../models/Projects';

const deleteEmployees = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Employees.findByIdAndDelete(id);
    if (!result) {
      throw new Error('Employee not found');
    }
    return res.status(204).json({
      message: `Employee with id ${id} deleted`,
      data: result,
      error: false,
    });
  } catch (error) {
    let status = 400;
    if (error.message.includes('Employee not found')) {
      status = 404;
    }
    return res.status(status).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employees.find(req.query);
    if (Object.keys(req.query).length !== 0 && employees.length === 0) {
      throw new Error('Employees not found');
    }

    const message = employees.length ? 'Employee found' : 'There are no employees';
    return res.status(200).json({
      message,
      data: employees,
      error: false,
    });
  } catch (error) {
    let statusCode = 400;
    if (error.message.includes('Employees not found')) {
      statusCode = 404;
    }
    return res.status(statusCode).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

const updateEmployees = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.body.project) {
      const project = await Projects.findById(req.body.project);
      if (!project) {
        throw new Error('Project not found');
      }
    }
    const result = await Employees.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      throw new Error('Employee not found');
    }
    return res.status(201).json({
      message: `Employee with id ${id} edited`,
      date: result,
      error: false,
    });
  } catch (error) {
    let status = 400;
    if (error.message.includes('Employee not found') || error.message.includes('Project not found')) {
      status = 404;
    }
    return res.status(status).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employees = await Employees.findById(id);
    if (!employees) {
      throw new Error('Employee not found');
    }
    return res.status(200).json({
      message: 'Employee found',
      data: employees,
      error: false,
    });
  } catch (error) {
    let statusCode = 400;
    if (error.message.includes('Employee not found')) {
      statusCode = 404;
    }
    return res.status(statusCode).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

const createEmployees = async (req, res) => {
  try {
    if (req.body.project) {
      const project = await Projects.findById(req.body.project);
      if (!project) {
        throw new Error('Project not found');
      }
    }
    const employee = new Employees({
      name: req.body.name,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      project: req.body.project,
      active: false,
    });

    const result = await employee.save();
    return res.status(201).json({
      message: 'Employee created',
      data: result,
      error: false,
    });
  } catch (error) {
    let statusCode = 400;
    if (error.message.includes('Project not found')) {
      statusCode = 404;
    }
    return res.status(statusCode).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

export {
  deleteEmployees,
  updateEmployees,
  getAllEmployees,
  getEmployeeById,
  createEmployees,
};
