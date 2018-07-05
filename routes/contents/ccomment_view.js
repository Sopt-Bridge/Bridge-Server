const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');

router.get('/:contentsIdx', async (req, res) => {

	
    let contents_idx = req.params.contentsIdx;
    // 대댓글 수 , 
	let recommentNum = 'SELECT count(CrecmtIdx) FROM Crecomment WHERE CcmtIdx IN (SELECT CcmtIdx FROM Ccomment WHERE contentsIdx=?)'
	let renumResult = await db.queryParam_Arr(recommentNum, [contentsIdx]);

	let getReviewListQuery = 'SELECT CcmtDate, CcmtContent, CcmtIdx, userIdx FROM Ccomment WHERE contentsIdx=?';
	let getReviewList = await db.queryParam_Arr(getReviewListQuery, [contentsIdx]);

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