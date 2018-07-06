const express = require('express');
const router = express.Router();

const crypto = require('crypto-promise');      // crypto 모듈의 promise 버전
const db = require('../../module/pool.js');


router.get('/:contentsCategory/:lastcontentIdx', async (req, res) => {
      let contentsCategory = req.params.contentsCategory;
      let lastcontentsIdx = req.params.lastcontentsIdx;
      let maxindex = Number.MAX_VALUE;
      if(lastcontentsIdx == 0){
        lastcontentsIdx = maxindex+1;
       }
      let selectQuery = 'SELECT contentsTitle, contentsInfo, contentsHit, contentsDate, contentsLike, contentsType, contentsRuntime, hashName1, hashName2, hashName3 ROM Contents WHERE contentsCategory=? and contentsIdx<? ORDER BY contentsHit DESC limit 12';      
      let selectResult = await db.queryParam_Arr(selectQuery,[lastcontentsIdx, contentsCategory]);
     

      if (!selectResult) {                                    // 정상적으로 query문이 수행되지 않았을 경우
         res.status(500).send({
         message : "server error"
         });
      } else {      // 배열의 길이 === 1 => DB에 s_idx가 존재
         res.status(201).send(
              {
                  message : "ok",
                  data : [{contents_list:selectResult}]
              }
       );
      
      }
 
});

module.exports = router;