const express = require('express');
const router = express.Router();


const crypto = require('crypto-promise');      // crypto 모듈의 promise 버전
const db = require('../../module/pool.js');


router.get('/recommended', async (req, res) => {

      let selectQuery = 'SELECT * FROM content,recommended WHERE contents.contents_idx=recommended.contents_idx ORDER BY rand() limit 4';   
      let selectResult = await db.queryParam_Arr(selectQuery);

      if (!selectResult) {                                    // 정상적으로 query문이 수행되지 않았을 경우
         res.status(500).send({
         message : "Fail showing recommended video from server"
         });
      } else {     
         res.status(201).send(
              {
                  message : "success showing recommended video",
                  data : [selectResult]
              }
       );
      
      }
 
});

module.exports = router;