const express = require('express');
const router = express.Router();

const db = require('../../module/pool.js');

router.post('/', async (req, res) => {
   let groupIdx = req.body.groupIdx;
   let contentsIdx  = req.body.contentsIdx;

   if(!groupIdx||!contentsIdx){
      res.status(400).send({
            message : "Null Value"
         });
   }else{
   let insertGroupQuery = `INSERT INTO GroupContent (groupIdx, contentsIdx) VALUES (?, ?)`
   let insertGroupResult = await db.queryParam_Arr(insertGroupQuery, [groupIdx, contentsIdx]);

   if(!insertGroupResult){
      res.status(500).send({
      message : "Server Error"
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