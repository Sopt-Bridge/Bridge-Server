const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');

router.get('/:iboardIdx/:lastcontentsIdx', async (req, res) => {
	 let lastcontentsIdx = req.params.lastcontentsIdx;
   
    let maxindex = Number.MAX_VALUE;

    if(lastcontentsIdx == 0){
        lastcontentsIdx = maxindex+1;
    }
    let iboardIdx = req.params.iboardIdx;
    // 대댓글 수 , 유저, 내용 시간
	let recommentNum = 'SELECT count(ircmtIdx) FROM Irecomment WHERE icmtIdx IN (SELECT icmtIdx FROM Icomment WHERE iboardIdx=?)'
	let renumResult = await db.queryParam_Arr(recommentNum, [iboardIdx]);

	let getReviewListQuery = 'SELECT icmtDate, icmtContent, userIdx FROM Icomment WHERE iboardIdx=? and icmtIdx < ? ORDER BY icmtDate DESC limit 50';
	let getReviewList = await db.queryParam_Arr(getReviewListQuery, [iboardIdx, lastcontentsIdx]);

	if (!getReviewList||!renumResult) {
		res.status(500).send({
			message : "Server error"
		});
	} else {
		res.status(201).send({
            message : "ok",
            data : [{recommentNum:renumResult},{contents_list:getReviewList}]
        });
	}
});

module.exports = router;