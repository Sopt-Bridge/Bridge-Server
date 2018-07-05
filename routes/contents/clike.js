const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');

router.post('/', async (req, res) => {

   let contentsIdx = req.body.contentsIdx;

   if(!contentsIdx){
      res.status(400).send({
         message : "Null Value"
      });
   } else {
      let likenum = 'SELECT contents.like FROM contents WHERE contentsLike=?';
      let likeResult = await db.queryParam_Arr(likenum, [contentsIdx]);

         if(!likenum) {
            res.status(500).send({
               message : "Failed at Server"
            });
         } else {
            if(likenum==0){
               let mQuery = 'UPDATE contents SET contentsLike=1';
               let mResult =  await db.queryParam_Arr(mQuery);
                res.status(201).send({
                  message : "ok"
               });
            }else{
               let mQuery = 'UPDATE contents SET contentsLike=0';
               let mResult =  await db.queryParam_Arr(mQuery);
                res.status(201).send({
                  message : "ok"
               });
            }
            
         }
      }
});

module.exports = router;