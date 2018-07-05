const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');  
const db = require('../../module/pool.js');
const moment = require('moment');

router.get('/', async (req, res) => {
	

	
		    let viewQuery = 'SELECT iboardTitle, iboardDate, userIdx From Interpretation'
			let viewResult = await db.queryParam_Arr(viewQuery);

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