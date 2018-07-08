const express = require('express');
const router = express.Router();

const db = require('../../module/pool.js');

router.post('/', async (req, res) => {
   let userIdx = req.body.userIdx;
   let groupTitle = req.body.groupTitle;
   let groupBgimage = req.body.groupBgimage;
   let groupColor = req.body.groupColor;

   if(!userIdx){
      res.status(400).send({
            message : "Null Value"
         });
   }else{
   let insertGroupQuery = `INSERT INTO Bridge.group (userIdx, groupTitle, groupBgimage, groupColor) VALUES (?, ?, ?, ?)`
   let insertGroupResult = await db.queryParam_Arr(insertGroupQuery, [userIdx, groupTitle, groupBgimage, groupColor]);

   if(!insertGroupResult){
      res.status(500).send({
      message : "Server error"
         });
      }
    else {
         res.status(201).send({
            message : "ok"
         });
      }
   }
   
});

module.exports = router;