const express = require('express');
const router = express.Router();

const db = require('../../module/pool.js');

router.post('/', async (req, res) => {

	let contentsIdx = req.body.contentsIdx;
	let userIdx = req.body.userIdx;
	let contentsType = req.body.contentsType;

	if(!contentsIdx||!userIdx||!contentsType) {
		res.status(400).send({
			message : "null Value"
		});
	} else {
		if(contentsType==0){
		let selectImageQuery = `SELECT C.contentsIdx, C.contentsTitle, C.contentsInfo, C.contentsCategory, C.contentsDate,
                                          C.contentsLike, Imerge.imgname,hashName1, hashName2, hashName3, 
                                          (SELECT count(imIdx) FROM Imerge WHERE Imerge.contentsIdx = C.contentsIdx) as imgCnt,
                                          (SELECT count(ccmtIdx) FROM Ccomment WHERE Ccomment.contentsIdx = C.contentsIdx) as commentCnt,
                                          (SELECT likeFlag FROM Bridge.Like WHERE userIdx=? and contentsIdx=?) as likeFlag,
                                           CASE
      										  WHEN
          										  (SELECT 
                 									   GC.contentsIdx
               									   FROM
                 									   Bridge.group as G , GroupContent as GC
                								   WHERE
                 									   G.groupIdx = GC.groupIdx
                     							   AND G.userIdx = ? AND GC.contentsIdx=?) IS NULL
        									   THEN
        									        0
        									   ELSE 1
 										  END AS subFlag
                                         FROM Contents as C ,Imerge WHERE C.contentsIdx = Imerge.contentsIdx and C.contentsIdx = ? and C.contentsType=0;
`;
        let selectImageResult = await db.queryParam_Arr(selectImageQuery, [userIdx, contentsIdx,userIdx,contentsIdx, contentsIdx]);

        if(!selectImageResult){
              res.status(500).send({
                    message : "Server error"
              });
        } else {
               res.status(201).send({
                     message : "ok",
                     data : [{imageContent : selectImageResult}]
                });
        }
		}
		else if(contentsType==1){

			 let selectVideoQuery = `SELECT C.contentsIdx, C.contentsTitle, C.contentsInfo, C.contentsCategory, C.contentsDate,
                                         C.contentsHit, C.contentsLike, C.contentsRuntime, C.contentsUrl, C.contentsoriginUrl, hashName1, hashName2, hashName3, 
                                          (SELECT count(ccmtIdx) FROM Ccomment WHERE Ccomment.contentsIdx = C.contentsIdx) as commentCnt,
                                          (SELECT likeFlag FROM Bridge.Like WHERE userIdx=? and contentsIdx=?) as likeFlag,
                                           CASE
      										  WHEN
          										  (SELECT 
                 									   GC.contentsIdx
               									   FROM
                 									   Bridge.group as G , GroupContent as GC
                								   WHERE
                 									   G.groupIdx = GC.groupIdx
                     							   AND G.userIdx = ? AND GC.contentsIdx=?) IS NULL
        									   THEN
        									        0
        									   ELSE 1
 										  END AS subFlag
                                         FROM Contents as C WHERE C.contentsIdx=? and C.contentsType=1`;
                let selectVideoResult = await db.queryParam_Arr(selectVideoQuery, [userIdx, contentsIdx, userIdx,contentsIdx, contentsIdx]);

			if(!selectVideoResult){
				res.status(500).send({
					message : "Server error"
					});
			} else {
					let insertRecentQuery = `INSERT INTO Recentview (userIdx, contentsIdx) VALUES (?, ?)`
					let insertRecentResult = await db.queryParam_Arr(insertRecentQuery,[userIdx, contentsIdx]);

					if(!insertRecentResult){
						res.status(500).send({
							message : "Server error"
						});
					} else {
						res.status(201).send({
							message : "ok",
							data : [{videoContents : selectVideoResult}]
						});
					}
			}
		}


	else{
			res.status(400).send({
				message : "no such contentsType"
			});
		}
	}
});

module.exports = router;