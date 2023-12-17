const express=require('express');
const mysql=require('mysql')
const cors=require('cors');
const multer=require('multer');
require('./db/conn')
const router=require('./routes/router')
const app=express();
app.use(cors());
app.use(express.json())
app.use(router)
app.use("/upload",express.static("./upload"))



const db=mysql.createConnection({
    host:"localhost",
    user:'root',
    password:'root123',
    database:'cartrabbit'
})


app.post('/LoginS', async (req, res) => {
    console.log(req.body)
    const sql = "INSERT INTO userlog(name,email,phone,password,address,pincode,place) VALUES(?,?,?,?,?,?,?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.phoneNumber,
        req.body.password,
        req.body.address,
        req.body.pincode,
        req.body.place
    ];


    try {
        const result = await new Promise((resolve, reject) => {
            db.query(sql, values, (err, data) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        reject({ error: 'Entered values email or phoneNumber already exist' });
                    } else {
                        reject(err);
                    }
                } else {
                    resolve(data);
                }

            });
        });
        return res.send(result);
    } 
    catch (error) {
        return res.json(error);
    }
});

app.post('/OwnerS',async(req,res)=>{
    console.log(req.body);
    const sql='INSERT INTO ownerlog(name,email,phone,password,address,residency,pincode,place) VALUES (?,?,?,?,?,?,?,?)'
    const values=[
        req.body.name,
        req.body.email,
        req.body.phoneNumber,
        req.body.password,
        req.body.address,
        req.body.residency,
        req.body.pincode,
        req.body.place
    ]
    try{
        const result= await new Promise((resolve,reject)=>{
            db.query(sql,values,(err,data) =>{
                if(err){
                    if(err.code === 'ER_DUP_ENTRY'){
                        reject({error : 'Entered email or phone number is already exist'})
                    }
                    else{
                        reject(err);
                    }
                }
                else{
                    resolve(data)
                }
            })
        })
        return res.send(result)
    }
    catch (error){
        return res.json(error)
    }
})

app.post('/Login',(req,res)=>{
    const sql="SELECT * FROM userlog WHERE `phone`=? AND `password`=? "
    db.query(sql,[req.body.phone,req.body.password],(err,data)=>{
        if(err){
            return rex.json(err);
        }
        if(data.length >0){
            return res.json("Success")
        }
        else{
            return res.json("Failed")
        }
    })
})


app.post('/Owner',(req,res)=>{
    const sql="SELECT * FROM ownerlog WHERE `phone`=? AND `password`=? "
    db.query(sql,[req.body.phone,req.body.password],(err,data)=>{
        if(err){
            return rex.json(err);
        }
        if(data.length >0){
            return res.json("Success")
        }
        else{
            return res.json("Failed")
        }
    })
})
app.post('/Display', async (req, res) => {
    const sql = "INSERT INTO booking(name, phone, days, checkin, checkout,hotel) VALUES(?, ?, ?, ?, ?,?)";
    const values = [
        req.body.name,
        req.body.phone,
        req.body.numberOfDays,
        req.body.checkInDate,
        req.body.checkOutDate,
        req.body.hotel
    ];

    try {
        const result = await new Promise((resolve, reject) => {
            db.query(sql, values, (err, data) => {
                if (err) {
                    console.error(err); 
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
        return res.send(result);
    } catch (error) {
        console.error(error); 
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/getUserBookings/:phone', async (req, res) => {
    const phone = req.params.phone;
  
    const sql = "SELECT * FROM booking WHERE phone = ?";
    try {
      const result = await new Promise((resolve, reject) => {
        db.query(sql, [phone], (err, data) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
      return res.status(201).json({ status: 201, data: result });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.get('/getPic/:hotel', (req, res) => {
    const hotel = req.params.hotel;
    const sql = 'SELECT * FROM pics WHERE name = ?';
    db.query(sql, [hotel], (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ status: 500, error: 'Internal Server Error' });
      } else {
        res.status(200).json({ status: 200, data });
      }
    });
  });

app.listen(8080,()=>{
    console.log('Server is running on port 8080');
})