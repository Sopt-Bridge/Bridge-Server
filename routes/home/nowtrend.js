const express = require('express');
const router = express.Router();

const db = require('../../module/pool.js');


router.get('/:contentsCategory', async (req, res) => {
      let contentsCategory = req.params.contentsCategory;
      if(!contentsCategory){
        res.status(400).send({
          message : "null Value"
        });
      } else {
        if(contentsCategory==0){
          let selectQuery = `SELECT DISTINCT C.contentsIdx, C.contentsTitle, C.contentsInfo, C.contentsHit,C.contentsCategory, C.contentsDate,
                                          C.contentsLike,C.contentsRuntime, C.contentsUrl, C.contentsoriginUrl, C.thumbnailUrl, C.contentsType, hashName1, hashName2, hashName3, 
                                          (SELECT count(imIdx) FROM Imerge WHERE Imerge.contentsIdx = C.contentsIdx) as imgCnt,
                                          (SELECT count(ccmtIdx) FROM Ccomment WHERE Ccomment.contentsIdx = C.contentsIdx) as commentCnt
                                         FROM Contents as C ORDER BY C.contentsLike DESC limit 8`;
                let selectResult = await db.queryParam_None(selectQuery);

                if(!selectResult){
                   res.status(500).send({
                    message : "Server error"
                });
                } else {
                   res.status(201).send({
                     message : "ok",
                     data : [{contents_list : selectResult}]
                  });
                }
        }else{
                let selectQuery = `SELECT DISTINCT C.contentsIdx, C.contentsTitle, C.contentsInfo, C.contentsHit,C.contentsCategory, C.contentsDate,
                                          C.contentsLike,C.contentsRuntime, C.contentsUrl, C.contentsoriginUrl, C.thumbnailUrl, C.contentsType, hashName1, hashName2, hashName3, 
                                          (SELECT count(imIdx) FROM Imerge WHERE Imerge.contentsIdx = C.contentsIdx) as imgCnt,
                                          (SELECT count(ccmtIdx) FROM Ccomment WHERE Ccomment.contentsIdx = C.contentsIdx) as commentCnt
                                         FROM Contents as C WHERE C.contentsCategory=? ORDER BY C.contentsLike DESC limit 8`;
                let selectResult = await db.queryParam_Arr(selectQuery, [contentsCategory]);

                if(!selectResult){
                   res.status(500).send({
                    message : "Server error"
                });
                } else {
                   res.status(201).send({
                     message : "ok",
                     data : [{contents_list : selectResult}]
                  });
                }
      }
    }
});

module.exports = router;