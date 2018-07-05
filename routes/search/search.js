const express = require('express');
const router = express.Router();

const crypto = require('crypto-promise');      // crypto 모듈의 promise 버전
const db = require('../../module/pool.js');


router.post('/', async (req, res) => {
   let searchname = req.body.searchname;
   let searchType = req.body.searchType;
   let searchParams = ['%'+req.body.searchname+'%'];
   if (!searchname) {
      res.status(400).send({
         message : "Null searchname Value"
      });
   } else {
      let searchResult;
      if(searchType==0){// 해시 검색 
          let hashQuery = 'SELECT * FROM Contents,Hashtag WHERE ((Contents.hashIdx1=Hashtag.hashIdx) or (Contents.hashIdx2=Hashtag.hashIdx) or (Contents.hashIdx3=Hashtag.hashIdx) )and Hashtag.hashName = ?';      // 입력받은 s_idx DB에 존재하는지 확인
          searchResult = await db.queryParam_Arr(hashQuery, [searchname]);
      }else{
          let searchQuery = "SELECT * FROM Contents WHERE contentsTitle LIKE ? ";      // 입력받은 s_idx DB에 존재하는지 확인
          searchResult = await db.queryParam_Arr(searchQuery,[searchParams]);
      }
      
      if (!searchResult) {                                    // 정상적으로 query문이 수행되지 않았을 경우
         res.status(500).send({
            message : "Fail searching from server"
          });
      } else {      // 배열의 길이 === 1 => DB에 s_idx가 존재
          res.status(201).send(
          {
              message : "ok",
              data : [{contents_list:searchResult}]
          }
       );
      
      }
   }
});

module.exports = router;