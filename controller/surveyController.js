const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
/////////
const mysql = require('mysql');
const mysqlConfig = require('../helpers/mysql-config');
const { NULL } = require('mysql/lib/protocol/constants/types');
const conexion = mysql.createConnection(mysqlConfig);
const crypto = require('crypto');
const { resolveAny } = require('dns');
////////


module.exports.addSurvey = (req, res) =>{
    const idUser = req.body.idUser;
    const idFamily = req.body.idFamily;
    const idQuestionList = req.body.idQuestionList;

    const sql = `INSERT INTO Survey (idUser, idFamily, idQuestionList) VALUES(? ,?,?)`

    conexion.query(sql, [idUser,idFamily, idQuestionList], (error, results, fields)=>{
        if(error)
            res.send(error)
        else{
            res.json(results)
        }
    })

}