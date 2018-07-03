const express = require('express');
const router = express.Router();

const crypto = require('crypto-promise');      // crypto 모듈의 promise 버전
const db = require('../../module/pool.js');


router.post('/:searchname', async (req, res) => {
   let searchname = req.params.searchname;

   if (searchname) {
      res.status(400).send({
         message : "Null searchname Value"
      });
   } else {
      let searchresult;
      if(searchname.charAt(0)=="#"){
          let hashQuery = 'SELECT * FROM contents,hashtag WHERE contents.hashidx=hashtag.hashidx and hashtag.hash_name = ?';      // 입력받은 s_idx DB에 존재하는지 확인
          searchResult = await db.queryParam_Arr(hashQuery, [searchname]);
      }else{
          let searchQuery = 'SELECT * FROM contents WHERE contents.title = ?';      // 입력받은 s_idx DB에 존재하는지 확인
          searchResult = await db.queryParam_Arr(searchQuery, [searchname]);
      } 
      if (!searchResult) {                                    // 정상적으로 query문이 수행되지 않았을 경우
         res.status(500).send({
            message : "Fail searching from server"
         });
      } else {      // 배열의 길이 === 1 => DB에 s_idx가 존재
          res.status(201).send(
          {
              message : "success showing menu",
              data : [selectResult]
          }
       );
      
      }
   }
});

module.exports = router;