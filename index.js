const express = require("express")
const jwt = require("jsonwebtoken")
const app = express()

const secretkey = "SAJIDSECRET"

app.get("/", (req, res) => {
    res.json({ dataa: "d" })
})

app.post("/login", (req, res) => {
    const user = {
        username: "sajid",
        email: "ansajid02@gmail.com"
    }
    jwt.sign({ user }, secretkey, { expiresIn: "300s" }, (err, token) => {
        res.json({ token})
    })
})

app.post("/profile",verifyToken,(req,res) => {
    
    jwt.verify(req.token,secretkey,(err,authData) => {
        if (err){
            res.send({result:"Invalid Token"})
        }
        else {
            res.json({
                message:"Prfile is now accessible",
                authData
            })
        }
    })

})

function verifyToken(req, res, next) {
    const bearerHeader = req.headers.authorization;
    console.log(bearerHeader);
    
    if (bearerHeader && bearerHeader.startsWith("Bearer ")) {
        const [a, token] = bearerHeader.split(" ");
        console.log(a,"Aaa");
        req.token = token;
        next();
    } else {
        res.status(401).send("Unauthorized, Token is not valid");
    }
}
















app.listen(5000, () => {
    console.log("SERVER is listening on port 5000");
})