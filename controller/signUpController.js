const res = require('express/lib/response');
const mysql = require('mysql');
const mysqlConfig = require('../helpers/mysql-config');
const { NULL } = require('mysql/lib/protocol/constants/types');
const conexion = mysql.createConnection(mysqlConfig);

module.exports.insertUsuario = (req,res) =>{

    const body= req.body;
    let mensaje = "El usuario ya se encuentra registrado";


    const sq = `INSERT INTO User_(firstName, lastName, email, password_, age, sex, phoneNumber, userType) VALUES
    (?,?,?,SHA2(?,224),?,?,?,?)`

    const sql = `SELECT idUser FROM User_ WHERE firstName = ? OR lastName = ? OR email=?`
    
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    let resultUser;

    async function Fun(){

        conexion.query(sql, [firstName, lastName, email], (error,results,fields)=>{

            if (error)
                res.send(error)
            else{
                
                resultUser = results[0];
                console.log("resultUser, first query");
                console.log(resultUser);

                if (resultUser == undefined){
                    mensaje = 'Usuario insertado correctamente'

                    conexion.query(sq, [body.firstName, body.lastName, body.email ,body.password_, body.age, body.sex, body.phoneNumber, body.userType], (error, resultsInsert, fields)=>{

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

module.exports.getUsuarios = (req,res) =>{
    const sql = `SELECT * FROM User_`
    conexion.query(sql,(error,results,fields) =>{
        if(error)
            res.send(error);

        res.json(results);
    })
}

module.exports.getIdUsuario = (req,res) =>{
    const idU = req.params.idU;
    const sql =`SELECT idUser FROM User_ WHERE firstName = ?`

    conexion.query(sql, [idU], (error,results,fields) =>{
        if(error)
            res.send(error);

        console.log(results);
        res.json(results);

    })
}