require("dotenv").config();
const express = require("express");
const dataModel = require("./dataModel");
const userModel = require("./userModel");
const { hashPassword, comparePassword } = require("./bcrypt");
const { validateData } = require("./joiValidate");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.use(express.json());

const verifyToken = (token) => {
  return new Promise((resolve,reject)=>{
    jwt.verify(token, process.env.JWT_SECRET,(err,decoded)=>{
      if(err){
        resolve(false)
      }else{
        resolve(true)
      }
  })
})
}


router.get("/", async (req, res) => {
  res.send("<h1>whoohooo Server is running!!!</h1>");
});

router.get("/get-data", async (req, res) => {
  try {
    const data = await dataModel.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.post("/create-data", async (req, res) => {
  if (!req.body) {
    return res.status(204).send("No request body found");
  }
  try {
    const { title, content } = req.body;
    const token = req.headers.authorization && req.headers.authorization;
    if(!token){return res.status(401).send('authorization failed')}
    const validToken = await verifyToken(token)
    if(!validToken){return res.status(403).send('invalid token')}
    const data = await dataModel.create({ title, content });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

router.delete("/delete-data/:id", async (req, res) => {
  try {
    const token = req.headers.authorization && req.headers.authorization;
    if(!token){return res.status(401).send('authorization failed')}
    const validToken = await verifyToken(token)
    if(!validToken){return res.status(403).send('invalid token')}

    const data = await dataModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.put("/update-data/:id", async (req, res) => {
  if (!req.body) {
    return res.status(204).send("No request body found");
  }
  try {
    const { title, content } = req.body;
    const token = req.headers.authorization && req.headers.authorization;
    if(!token){return res.status(401).send('authorization failed')}
    const validToken = await verifyToken(token)
    if(!validToken){return res.status(403).send('invalid token')}

    const data = await dataModel.findByIdAndUpdate(req.params.id, {
      title,
      content,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.post("/signup", async (req, res) => {
  if (!req.body && !req.body.username && !req.body.password) {
    return res.status(204).send("No request body found");
  }
  const { username, password } = req.body;
  try {
    const data = await userModel.findOne({ username: username });
    if (data) {
      return res.status(201).send("username already exists");
    }
  } catch (err) {
    console.log(err.message);
  }

  const { error, value } = await validateData(req.body);
  if (error) {
    return res.status(400).send(error.details);
  }

  const hashedPassword = await hashPassword(password);
  try {
    await userModel.create({
      username: username,
      password: hashedPassword,
    });
    const token = jwt.sign({ username: username }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });
    // console.log(token);
    return res.status(200).send(token);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }
});

router.post("/login", async (req, res) => {
  if (!req.body && !req.body.username && !req.body.password) {
    return res.status(400).send("no request body found");
  }
  const { username, password } = req.body;
  try {
    const data = await userModel.findOne({ username: username });
    if (!data) {
      return res.status(201).send("cannot find your account");
    }

    const compare = await comparePassword(password, data.password);
    if (compare == true) {
      const token = jwt.sign({ username: username }, process.env.JWT_SECRET, {
        expiresIn: "10m",
      });
      return res.status(200).send(token);
    } else {
      return res.status(201).send("wrong password");
    }
  } catch (err) {
    console.log(err.message);
    return res.status(400).send("something went wrong");
  }
});


router.post('/google-login',(req,res)=>{
  if (!req.body && !req.body.username) {
    return res.status(400).send("no request body found");
  }
  const { username } = req.body;
  const token = jwt.sign({ username: username }, process.env.JWT_SECRET, {
    expiresIn: "10m",
  });
  if(token){
    return res.status(200).send(token);
  }else{
    return res.status(400).send("something went wrong");
  }
})

module.exports = router;