const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');

router.post('/', async (req, res) => {

   let contents_idx = req.body.contents_idx;

   if(!contents_idx){
      res.status(400).send({
         message : "Null Value"
      });
   } else {
      let likenum = 'SELECT contents.like FROM contents WHERE contents_like=?';
      let likeResult = await db.queryParam_Arr(likenum, [contents_idx]);

         if(!likenum) {
            res.status(500).send({
               message : "Failed at Server"
            });
         } else {
            if(likenum==0){
               let mQuery = 'UPDATE contents SET contents_like=1';
               let mResult =  await db.queryParam_Arr(mQuery);
                res.status(201).send({
                  message : "Successful modify like"
               });
            }else{
               let mQuery = 'UPDATE contents SET contents_like=0';
               let mResult =  await db.queryParam_Arr(mQuery);
                res.status(201).send({
                  message : "Successful modify like"
               });
            }
            
         }
      }
});

module.exports = router;