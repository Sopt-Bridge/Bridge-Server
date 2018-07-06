const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');

router.get('/:contentsIdx/:lastcontentsIdx', async (req, res) => {

	let lastcontentsIdx = req.params.lastcontentsIdx;
   
    let maxindex = Number.MAX_VALUE;

    if(lastcontentsIdx == 0){
    	lastcontentsIdx = maxindex+1;
    }
    let contentsIdx = req.params.contentsIdx;
    // 대댓글 수 , 
	let recommentNum = 'SELECT count(CrecmtIdx) FROM Crecomment WHERE CcmtIdx IN (SELECT CcmtIdx FROM Ccomment WHERE contentsIdx=?)'
	let renumResult = await db.queryParam_Arr(recommentNum, [contentsIdx]);

	let getReviewListQuery = 'SELECT CcmtDate, CcmtContent, CcmtIdx, userIdx FROM Ccomment WHERE contentsIdx=? and contentsIdx < ? limit 50 ';
	let getReviewList = await db.queryParam_Arr(getReviewListQuery, [contentsIdx, lastcontentsIdx]);
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