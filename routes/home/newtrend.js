const express = require('express');
const router = express.Router();

const crypto = require('crypto-promise');      // crypto 모듈의 promise 버전
const db = require('../../module/pool.js');


router.get('/newtrend', async (req, res) => {

      let selectQuery = 'SELECT * FROM contents ORDER BY contents_like limit 8';      
      let selectResult = await db.queryParam_Arr(selectQuery);
     
      if (!selectResult) {                                    // 정상적으로 query문이 수행되지 않았을 경우
         res.status(500).send({
         message : "Fail showing new trend video from server"
         });
      } else {      // 배열의 길이 === 1 => DB에 s_idx가 존재
         res.status(201).send(
              {
                  message : "success showing new trend video",
                  data : [selectResult]
              }
       );
      
      }
 
});

module.exports = router;