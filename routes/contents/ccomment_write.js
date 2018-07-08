const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');
const moment = require('moment');

router.post('/', async (req, res) => {
   let currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
   let userIdx = req.body.userIdx;
   let ccmtContent = req.body.CcmtContent;
   let contentsIdx = req.body.contentsIdx;

   if (!userIdx || !contentsIdx) {
      res.status(400).send({
         message : "Null Value"
      });
   } else {
          let registerReviewQuery = 'INSERT INTO Ccomment (ccmtDate, ccmtContent, userIdx,contentsIdx) VALUES (?,?,?,?)'
         let registerReview = await db.queryParam_Arr(registerReviewQuery, [currentTime,ccmtContent, userIdx, contentsIdx]);
         let numQuery = 'SELECT count(ccmtIdx) as countCcmtIdx FROM Ccomment';
         let numResult = await db.queryParam_Arr(numQuery);
         
         if (!registerReview||!numResult) {
            res.status(500).send({
               message : "Server error"
            });
         } else {
            res.status(201).send({
               message : "ok",
               data : [{ccmtIdx : numResult[0].countCcmtIdx}]
            });
         }
      }
});

module.exports = router;