const express = require('express');
const router = express.Router();

const crypto = require('crypto-promise');      // crypto 모듈의 promise 버전
const db = require('../../module/pool.js');


router.get('/:searchname', async (req, res) => {
   let searchname = req.params.searchname;
   let search_params = ['%'+req.params.searchname+'%'];
   if (!searchname) {
      res.status(400).send({
         message : "Null searchname Value"
      });
   } else {
      let searchResult;

      if(searchname[0]=="#"){
          let hashQuery = 'SELECT * FROM Contents,Hashtag WHERE ((Contents.hash_idx1=Hashtag.hash_idx) or (Contents.hash_idx2=Hashtag.hash_idx) or (Contents.hash_idx3=Hashtag.hash_idx) )and Hashtag.hash_name = ?';      // 입력받은 s_idx DB에 존재하는지 확인
          searchResult = await db.queryParam_Arr(hashQuery, [searchname]);
      }else{
          let searchQuery = "SELECT * FROM Contents WHERE contents_title LIKE ? ";      // 입력받은 s_idx DB에 존재하는지 확인
          searchResult = await db.queryParam_Arr(searchQuery,[search_params]);
      } 
      if (!searchResult) {                                    // 정상적으로 query문이 수행되지 않았을 경우
         res.status(500).send({
         //   message : "Fail searching from server",
          //  message : searchname.charAt(0),
            message : searchname[0]
         });
      } else {      // 배열의 길이 === 1 => DB에 s_idx가 존재
          res.status(201).send(
          {
              message : "ok",
              data : [searchResult]
          }
       );
      
      }
   }
});

module.exports = router;