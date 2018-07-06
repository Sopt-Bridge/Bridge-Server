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
      let likenum = 'SELECT contentsLike FROM Contents WHERE contentsIdx=? and userIdx=?';
      let likeResult = await db.queryParam_Arr(likenum, [contentsIdx, userIdx]);

         if(!likeResult) {
            res.status(500).send({
               message : "Failed at Server"
            });
         } else {
            if(likeResult[0].contentsLike===0){
               let mQuery = 'UPDATE Contents SET contentsLike=1 WHERE contentsIdx=? and userIdx=?';
               let mResult =  await db.queryParam_Arr(mQuery,[contentsIdx, userIdx]);
                res.status(201).send({
                  message : "ok!"
               });
            }else{
               let mQuery = 'UPDATE Contents SET contentsLike=0 WHERE contentsIdx=? and userIdx=?';
               let mResult =  await db.queryParam_Arr(mQuery,[contentsIdx,userIdx]);
                res.status(201).send({
                  message : "ok" 
               });
            }
            
         }
      }
});

module.exports = router;