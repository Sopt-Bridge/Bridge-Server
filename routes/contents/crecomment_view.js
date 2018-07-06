const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');

router.get('/:ccmtIdx/:lastcontentsIdx', async (req, res) => {

	let lastcontentsIdx = req.params.lastcontentsIdx;
   
    let maxindex = Number.MAX_VALUE;

    if(lastcontentsIdx == 0){
    	lastcontentsIdx = maxindex+1;
    }
    let ccmtIdx = req.params.ccmtIdx;
    // 대댓글 수 , 유저, 작성시간, 내용
	
	let recommentNum = 'SELECT count(crecmtIdx) FROM Crecomment WHERE ccmtIdx =?'
	let renumResult = await db.queryParam_Arr(recommentNum, [ccmtIdx]);

	let getReviewListQuery = 'SELECT crecmtDate, crecmtContent, userIdx FROM Crecomment WHERE ccmtIdx=? and contentsIdx < ? limit 50 ';
	let getReviewList = await db.queryParam_Arr(getReviewListQuery, [ccmtIdx, lastcontentsIdx]);

	if (!getReviewList) {
		res.status(500).send({
			message : "Failed"
		});
	} else {
		res.status(201).send({
            message : "ok",
            data : [{recommentNum:renumResult},{contents_list:getReviewList}]
        });
	}
});

module.exports = router;