const express = require('express');
const router = express.Router();

const db = require('../../module/pool.js');


router.get('/:contentsCategory/:lastcontentsIdx', async (req, res) => {
      let contentsCategory = req.params.contentsCategory;
      let lastcontentsIdx = req.params.lastcontentsIdx;
      
      let maxindex = Number.MAX_VALUE;
      
      if(!contentsCategory || !lastcontentsIdx){
        res.status(400).send({
          message : "null Value"
        });
      } else {

      if(lastcontentsIdx == 0){
        lastcontentsIdx = maxindex+1;
       }

      let selectQuery = 'SELECT contentsTitle, contentsInfo, contentsHit, contentsDate, contentsLike, contentsType, contentsRuntime, hashName1, hashName2, hashName3 FROM Contents WHERE contentsCategory=? and contentsIdx<? ORDER BY contentsHit DESC limit 12';      
      let selectResult = await db.queryParam_Arr(selectQuery,[contentsCategory, lastcontentsIdx]);
     

      if (!selectResult) {                                    // 정상적으로 query문이 수행되지 않았을 경우
         res.status(500).send({
         message : "server error"
         });
      } else {      // 배열의 길이 === 1 => DB에 s_idx가 존재
         res.status(201).send(
              {
                  message : "ok",
                  data : [{contents_list : selectResult}]
              }
       );
      
      }
    }
});

module.exports = router;