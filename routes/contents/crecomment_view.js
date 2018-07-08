const express = require('express');
const router = express.Router();
 
const db = require('../../module/pool.js');

router.get('/:ccmtIdx/:lastcontentsIdx', async (req, res) => {

   let lastcontentsIdx = req.params.lastcontentsIdx;
   let ccmtIdx = req.params.ccmtIdx;
    let maxindex = Number.MAX_VALUE;
    if (!lastcontentsIdx||!ccmtIdx) {
      res.status(400).send({
         message : "Null Value"
      });
   }else{
    if(lastcontentsIdx == 0){
       lastcontentsIdx = maxindex+1;
    }
    
    // 대댓글 수 , 유저, 작성시간, 내용
   
   let recommentNum = 'SELECT count(crecmtIdx) as countcremtIdx FROM Crecomment WHERE ccmtIdx =?'
   let renumResult = await db.queryParam_Arr(recommentNum, [ccmtIdx]);

   let getReviewListQuery = 'SELECT crecmtDate, crecmtContent, userIdx FROM Crecomment WHERE ccmtIdx=? and crecmtIdx < ? ORDER BY CrecmtDate DESC limit 50 ';
   let getReviewList = await db.queryParam_Arr(getReviewListQuery, [ccmtIdx, lastcontentsIdx]);

   if (!getReviewList) {
      res.status(500).send({
         message : "server error"
      });
   } else {
      res.status(201).send({
            message : "ok",
            data : [{recommentNum:renumResult[0].countcremtIdx},{contents_list:getReviewList}]
        });
   }
}
});

module.exports = router;