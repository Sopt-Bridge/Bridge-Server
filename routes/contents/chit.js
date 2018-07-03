const express = require('express');
const router = express.Router();

const db = require('../../module/pool.js');

router.post('/', async (req, res) => {

	let contents_idx = req.body.contents_idx;

	if(!contents_idx){
		res.status(400).send({
			message : "Null Value"
		});
	} else {
		let hitQuery = 'UPDATE Contents SET contents_hit = contents_hit+1 WHERE contents_idx=?';
		let hitResult = await db.queryParam_Arr(hitQuery, [contents_idx]);

			if(!hitResult) {
				res.status(500).send({
					message : "Failed at Server"
				});
			} else {
 				res.status(201).send({
					message : "Successful modify hit"
				});
			}
		}
});

module.exports = router;