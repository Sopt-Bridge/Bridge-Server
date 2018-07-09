const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');
const moment = require('moment');
const jwt = require('../../module/jwt.js')


router.post('/', async(req, res)=>{
    let admId = req.body.admId;
    let admPW = req.body.admPw;

    if(!admId || !admPw){
        res.status(500).send({
            result : false,
            message : "Null Value"
        });
    }else {
        let GetQuery = 'SELECT * FROM Administer WHERE admId = ?';
        let GetResult = await db.queryParam_Arr(GetQuery,[admId]);

        if(!GetResult){
            res.status(400).send({
                message : " Internal Server Error"
            });
        }else if(GetResult.length === 1){
            let hashed = await crypto.pbkdf2(admPw,GetResult[0].admSalt,100000,32,'sha512');
            if(hashed.toString('base64') === GetResult[0].admPw){
                let token = jwt.sign(GetResult[0].admIdx);
                res.status(201).send({
                    result : true,
                    message : 'Login Success',
                    token : token
                });
            }else{
                console.log("Pw error!")
                res.status(400).send({
                    result : false,
                    message : "Login fail"
                })
            }
        }else { 
            console.log("ID error!")
            res.status(400).send({
                result : false,
                message : "Login failed"
            })
        }
    }
})


module.exports = router;