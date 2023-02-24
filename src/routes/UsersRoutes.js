const {Router} = require("express");
const {tblCourses,tblUsers} = require("../DB_connection.js");
const register = require("../controllers/registerUser.js")
const UsersRouter = Router();    

UsersRouter.get("/", async(req,res) => {
try{
   const result = await tblUsers.findAll()
    res.status(200).json(result)
        }
catch (error) {
    res.status(400).send(error.message)
        }   
})

UsersRouter.get("/instructors", async(req,res) => {
    try {
        const result = await tblUsers.findAll({
            attributes: ["PK_User","Name"],
            where: {
                UserType: "Instructor" 
            }
        }) 
    res.status(200).send(result)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

UsersRouter.post("/registro", async(req,res) => {
    const user = req.body;
  
    try {
        const resp = await register(user)
     res.status(200).send(resp)
    }
    catch(error){
        res.status(200).send(error.message)
    }
} )


module.exports = UsersRouter;