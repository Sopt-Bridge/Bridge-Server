const express = require('express');
const router = express.Router();
const moment = require('moment');
const async = require('async');

const jwt = require('../../module/jwt.js');
const db = require('../../module/pool.js');

router.post('/', async(req, res) => {
   let userUuid = req.body.userUuid;
   let signupTime = moment().format('YYYY-MM-DD HH:mm:ss');
   let recentTime = moment().format('YYYY-MM-DD HH:mm:ss');

   	  if(!userUuid){
   	  	res.status(400).send({
   	  		message : "Invalid Uuid"
   	  	});
   	  } else {
      let checkQuery = 'SELECT userUuid FROM User WHERE userUuid = ?';
      let checkResult = await db.queryParam_Arr(checkQuery,[userUuid]);

      let token = jwt.sign(userUuid);

      if(checkResult.length === 0){//첫 로그인
         let InsertUserQuery = 'INSERT INTO User (userUuid, recentTime, signupTime) Values (?, ?, ?)';
         let InsertUserResult = await db.queryParam_Arr(InsertUserQuery, [userUuid,recentTime,signupTime]);
         
         if(!InsertUserResult){
            res.status(500).send({
               message : "Failed Insert From Server"
            });
         } else {
         	let getUserIdxQuery = 'SELECT userIdx FROM User WHERE userUuid = ?';
         	let getUserIdxResult = await db.queryParam_Arr(getUserIdxQuery, [userUuid]);

         	if(!getUserIdxResult) {
         		res.status(500).send({
         			message : "error"
         		});
         	} else {
         		res.status(201).send({
         			message : "success",
         			data : [{userIdx : getUserIdxResult}],
         			token : token
         		});
         	}
          
         }
      } 
      else if(checkResult.length ===1){// 이후 로그인
         let UpdateUserQuery = 'UPDATE User SET recentTime=? WHERE userUuid=?';
         let UpdateUserResult = await db.queryParam_Arr(UpdateUserQuery, [recentTime,userUuid]);
         
         if(!UpdateUserResult){
            res.status(500).send({
               message : "Failed Upated From Server"
            });
         } else {
         let SelectUserIdxQuery = 'SELECT userIdx from User where userUuid = ?'
         let SelectUserIdxResult = await db.queryParam_Arr(SelectUserIdxQuery, [userUuid]);

         if(!SelectUserIdxResult){
            res.status(500).send({
               message : "Failed Select userIdx From Server"
            });
         }else{
            res.status(201).send({
               message : "Updated",
               data : [{userIdx : SelectUserIdxResult}],
               token : token
         });
         }
         }
      }else{
         res.status(500).send({
            message:"server error"
         });
      }
   }
});



module.exports = router;