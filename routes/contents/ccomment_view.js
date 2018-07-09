const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');

router.post('/', async (req, res) => {

   let contentsIdx = req.body.contentsIdx;
   let userIdx = req.body.userIdx;
   if(!contentsIdx||!userIdx){
      res.status(400).send({
         message : "Null Value"
      });
   } else {
      let likenum = 'SELECT likeFlag FROM Bridge.Like WHERE contentsIdx=? and userIdx=?';
      let likeResult = await db.queryParam_Arr(likenum, [contentsIdx, userIdx]);

         if(!likeResult) {
            res.status(500).send({
               message : "Server error"
            });
         } else {
            if(likeResult[0].likeFlag===0){
               let mQuery = 'UPDATE Contents SET contentsLike=contentsLike+1 WHERE contentsIdx=?';
               let mResult = await db.queryParam_Arr(mQuery,[contentsIdx]);

               let lQuery = 'UPDATE Bridge.Like SET likeFlag=1 WHERE contentsIdx=? and userIdx=?';
               let lResult = await db.queryParam_Arr(lQuery, [contentsIdx, userIdx]);
               
               if(!mResult||!lResult){
                  res.status(500).send({
                     message:"server error"
                  });
               }else{
                  res.status(201).send({
                     message : "ok"
                   });
               }
            }else{
               let mQuery = 'UPDATE Contents SET contentsLike=contentsLike-1 WHERE contentsIdx=?';
               let mResult =  await db.queryParam_Arr(mQuery,[contentsIdx]);
                
               let lQuery = 'UPDATE Bridge.Like SET likeFlag=0 WHERE contentsIdx=? and userIdx=?';
               let lResult = await db.queryParam_Arr(lQuery, [contentsIdx, userIdx]);
               
               if(!mResult||!lResult){
                  res.status(500).send({
                     message:"server error"
                  });
               }else{
                  res.status(201).send({
                     message : "ok"
                   });
               }
            }
            
         }
      }
});

module.exports = router;