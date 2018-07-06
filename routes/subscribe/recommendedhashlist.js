const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');
const moment = require('moment');

router.get('/:lastcontentsIdx/:userIdx', async (req, res) => {
		 let lastcontentsIdx = req.params.lastcontentsIdx;
   		 let userIdx = req.params.userIdx;
         let maxindex = Number.MAX_VALUE;

         if(lastcontentsIdx == 0){
             lastcontentsIdx = maxindex+1;
         }
		    let viewQuery = `SELECT DISTINCT
    Hashtag.hashName,
    Hashtag.hashImg,
    Hashtag.hashCnt,
    CASE
        WHEN
            (SELECT 
                    T.subflag
                FROM
                    Subscribe as T
                WHERE
                    T.userIdx = ?
                        AND T.hashName = S.hashName) IS NULL
        THEN
            0
        ELSE 1
    END AS subflagresult
FROM
    Hashtag,
    Subscribe as S
WHERE
    S.subflag = 1
        AND S.hashName = Hashtag.hashName
        AND Hashtag.hashIdx<?
ORDER BY Hashtag.hashCnt DESC`;

			let viewResult = await db.queryParam_Arr(viewQuery,[userIdx, lastcontentsIdx]);

			if (!viewResult) {
				res.status(500).send({
					message : "Fail at Server"
				});
			} else {
				res.status(201).send({
					message : "ok",
					data : [{contents_list : viewResult}]
				});
			}
		
});

module.exports = router;