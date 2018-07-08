const express = require('express');
const router = express.Router();

const crypto = require('crypto-promise');      // crypto 모듈의 promise 버전
const db = require('../../module/pool.js');


router.get('/:contentsCategory/:pageIdx', async (req, res) => {
      let contentsCategory = req.params.contentsCategory;
      let pageIdx = req.params.pageIdx;
   
      if(!contentsCategory||!pageIdx){
          res.status(400).send({
           message : "Null Value"
      });
      }else  {
         let selectQuery = `SELECT contentsTitle, contentsInfo, contentsHit, contentsDate, contentsLike, contentsType, contentsRuntime, hashName1, hashName2, hashName3 
                         FROM Contents WHERE contentsCategory=? ORDER BY contentsLike DESC limit ?,12`;      
         let selectResult = await db.queryParam_Arr(selectQuery, [contentsCategory, pageIdx]);
         console.log(pageIdx+", "+contentsCategory);
         console.log(selectResult);
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