const express=require('express')
const app=express();
const cors=require('cors')
require('dotenv').config();
const conn =require('./db/connect');
const { default: axios } = require('axios');
 //console.log(conn)

const port=process.env.PORT || 5000

app.use(express.json());
app.use(cors());

app.use(require('./routes/route'))
app.get("/health",(req,res)=>{
    if(conn)
    {
        health = { Server : "healthy" , Database : "established"}
    }
    else{
        health = { Server : "healthy" , Database : "unestablished"}
    }
    res.send(health)
})
app.post("/auth", (req, res) => {
    axios
      .post(
        process.env.server + "/checkAuth",
        {
          session_id: req.body.session_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        res.status(503).send("Server Down");
  });
  });
  app.post("/logout", (req, res) => {
    axios
      .post(
        process.env.server + "/clearSession",
        { session_id: req.body.session_id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) =>
        response.data ? res.send(response.data) : response.send(false)
 );
  });
app.listen(port,()=>
{
    
    console.log(`http://localhost:${port}`)
})

