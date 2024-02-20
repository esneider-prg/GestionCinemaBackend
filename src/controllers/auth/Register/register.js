const joi = require("joi");
const bcrypt = require("bcrypt");
const Account = require("../../../models/Account");
const { signToken } = require("../../../middlewares/jsonwebtoken");

async function register(request, response, next) {
  try {
    // Validate request data
    await joi
      .object({
        tipodocumento: joi.string().required(),
        document: joi.string().required(),
        username: joi.string().required(),
        lastname: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().required(),
        passwordconfirm: joi.string().optional(),
      })
      .validateAsync(request.body);
  } catch (error) {
    return response.status(400).json({
      error: "ValidationError",
      message: error.message,
    });
  }

  try {
    const { username, password, tipodocumento,document,lastname,email} = request.body;

    // Verify account username as unique
    const existingAccount = await Account.findOne({ email });
    if (existingAccount) {
      const exists = true;
      return response.status(400).json({
        error: email,
        message: 'El correo ya esta registrado',
        exists
        
      });
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create account
    const newAccount = new Account({ username, password: hash, tipodocumento,document ,lastname,email});
    await newAccount.save();

    // Remove password from response data
    newAccount.password = undefined;
    delete newAccount.password;

    // Generate access token
    const token = signToken({ uid: newAccount._id, role: newAccount.role });

    response.status(201).json({
      message: "Succesfully registered",
      data: newAccount,
      token,
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      error: "Error al crear el usuario",
      message: error.message,
    });
  }
}

async function basicData(request, response, next) {
  try {
    const { uid } = request.auth;
    const foundAccount = await Account.findOne({ _id: uid }).select(
      "-password"
    );
    await joi
      .object({
        name: joi.string().required(),
        idPerson: joi.string().required(),
        email: joi.string().email().required(),
        personAddress: joi.string().required(),
      })
      .validateAsync(request.body);
  } catch (error) {
    return response.status(400).json({
      error: "ValidationError",
      message: error.message,
    });
  }

  try {
    const newData = request.body;
    const { uid } = request.auth;

    await Account.findByIdAndUpdate({ _id: uid },newData)
   const newDataPerson= await Account.findById({ _id: uid })
    newDataPerson.password = undefined;
    delete newDataPerson.password;
   
    response.status(201).json({
      message: "Succesfully Register Data Person",
      data: newDataPerson
    });
  } catch (error) {
    console.error(error);
    return response.status(500).send({
      message: "Error Register Data Person"
    });
  }
}



module.exports = {register,basicData};
