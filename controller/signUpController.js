const res = require('express/lib/response');
const mysql = require('mysql');
const mysqlConfig = require('../helpers/mysql-config');
const { NULL } = require('mysql/lib/protocol/constants/types');
const conexion = mysql.createConnection(mysqlConfig);

module.exports.insertUsuario = (req,res) =>{

    const body= req.body;
    let mensaje = "El usuario ya existe";
    const sq = `INSERT INTO usuario(name, firstLastName, secondLastName, email, password, age, sex, phoneNumber) VALUES
    (?,?,?,SHA2(?,224),0)`
    const sql = `SELECT idUsuario FROM usuario WHERE nickname = ?`
    const user = req.body.nickname;
    let resultUser;

    async function Fun(){

        conexion.query(sql, [user], (error,results,fields)=>{
                

            if (error)
                res.send(error)
            else{
                
                resultUser = results[0];
                console.log("resultUser, first query");
                console.log(resultUser);

                if (resultUser == undefined){
                    mensaje = 'Usuario insertado correctamente'

                    conexion.query(sq, [body.name, body.firstLastName, body.secondLastName, body.email ,body.password, body.age, body.sex, body.phoneNumeber], (error, resultsInsert, fields)=>{

                        if(error){
                            res.send(error);
                        }
    
                        else{
                            console.log(resultUser);
                            //     
                            res.json({
                                mensaje
                            });
                        }  
                    })
                }
                else{
                    res.json({
                        mensaje
                    });
                }

            }
        })
    }
    
    Fun();

    console.log(body);
    if (mensaje==='Usuario insertado correctamente'){
        return true;         
    }
    else{
        return false;
    }
}