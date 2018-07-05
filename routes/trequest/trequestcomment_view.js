const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');

router.get('/:iboardIdx', async (req, res) => {

    let iboardIdx = req.params.iboardIdx;
    // 대댓글 수 , 유저, 내용 시간
	let recommentNum = 'SELECT count(ircmtIdx) FROM Irecomment WHERE icmtIdx IN (SELECT icmtIdx FROM Icomment WHERE iboardIdx=?)'
	let renumResult = await db.queryParam_Arr(recommentNum, [iboardIdx]);

	let getReviewListQuery = 'SELECT icmtDate, icmtContent, userIdx FROM Icomment WHERE iboardIdx=?';
	let getReviewList = await db.queryParam_Arr(getReviewListQuery, [iboardIdx]);

	if (!getReviewList||!renumResult) {
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