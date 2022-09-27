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

module.exports.login = (req, res) => {

    const email = req.body.email;
    const password_ = req.body.password_;

    const sql = `SELECT idUser FROM User_ WHERE email = ?`
        //const sql2 = `SELECT SHA2(contrasena,224) FROM usuario WHERE nickname=?`
    const sql2 = `SELECT password_ FROM User_ WHERE email=? `

    //const sql3 = `SELECT contrasena FROM usuario WHERE contrasena = SHA2(?,224)`
    let idUser;
    let resultUser;
    let resultPassword;

    let mensaje = 'Usuario o contraseña inválidos' //mensaje updated

    ////////////////
    let token = '';

    const payload = {
        id: 1,
        email: req.body.email
    }

    console.log(req.body);

    function Fun(pw) {

        conexion.query(sql, [email], (error, results, fields) => {
            if (error)
                res.send(error);
            else {

                if (results[0] != undefined) {

                    resultUser = results[0];
                    idUser = resultUser.idUser;

                    conexion.query(sql2, [email], (error, results2, fields) => {

                        if (error)
                            
                            res.send(error);
                        else {

                            resultPassword = results2[0].password_;

                            //////////7
                            let pwd = pw;
                            pwd = crypto.createHash('sha224')
                                .update(pwd)
                                .digest('hex');

                            if (resultUser != undefined) {
                                console.log(resultPassword);

                                if (resultPassword === pwd) {
                                    token = jwt.sign(payload, config.key, { expiresIn: 7200 })
                                    mensaje = 'Usuario o contraseña autenticados'

                                }
                            }
                        }

                        res.json({
                            mensaje,
                            token,
                            idUser
                        })
                    })

                } else {
                    res.json({
                        mensaje
                    })
                }

            }
        })
    }

    Fun(password_);
}