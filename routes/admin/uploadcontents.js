const express = require('express');
const router = express.Router();  

const db = require('../../module/pool.js');
const moment = require('moment');

router.post('/', async (req, res) => {
	let contentsType = req.body.contentsType;
	if(!contentsType){
		res.status(400).send({
			message : "null Value"
		});
	} else if(contentsType === 0){
		let 
	}
})