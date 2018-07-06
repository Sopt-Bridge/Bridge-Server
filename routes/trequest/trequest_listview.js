const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');
const moment = require('moment');

router.get('/:lastcontentsIdx', async (req, res) => {
		 let lastcontentsIdx = req.params.lastcontentsIdx;
   
         let maxindex = Number.MAX_VALUE;

         if(lastcontentsIdx == 0){
             lastcontentsIdx = maxindex+1;
         }
		    let viewQuery = 'SELECT iboardTitle, iboardDate, userIdx From Interpretation WHERE iboardIdx < ? limit 20'
			let viewResult = await db.queryParam_Arr(viewQuery, [lastcontentsIdx]);

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