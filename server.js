const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000
const http = require('http');
const bcrypt = require('bcrypt');
const mysql = require('mysql')
const fileUpload = require("express-fileupload")
app.use(fileUpload({
    createParentPath : true
}))
app.use(express.static(path.resolve(__dirname, './index.html')));
app.use(express.json()) 
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    );
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
});

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "msbAdminsDb",
    password: "Pk7802662302"
})
connection.connect(err=>{
    if (err) {
        return console.log(err);
    } else{
        console.log("DATABASEADMIN --- OK");
    }
})
const connectionClient = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "msbClientDb",
    password: "Pk7802662302"
})
connectionClient.connect(err=>{
    if (err) {const express = require('express');
    const path = require('path');
    const app = express();
    const PORT = process.env.PORT || 5000
    const http = require('http');
    const bcrypt = require('bcrypt');
    const mysql = require('mysql')
    const fileUpload = require("express-fileupload")
    app.use(fileUpload({
        createParentPath : true
    }))
    app.use(express.static(path.resolve(__dirname, './index.html')));
    app.use(express.json()) 
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        );
        res.header("Access-Control-Allow-credentials", true);
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
        next();
    });
    
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "msbAdminsDb",
        password: "Pk7802662302"
    })
    connection.connect(err=>{
        if (err) {
            return console.log(err);
        } else{
            console.log("DATABASEADMIN --- OK");
        }
    })
    const connectionClient = mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "msbClientDb",
        password: "Pk7802662302"
    })
    connectionClient.connect(err=>{
        if (err) {
            return console.log(err);
        } else{
            console.log("DATABASECLIENT --- SUPER");
        }
    })
    
    app.post('/register', function(request, response){  
        try {
            connectionClient.query("SELECT * FROM `msbClient` WHERE `email` = '" + request.body.email + "'", (error, rows, fields) => {
                if(error) {
                    return response.status(400).json({err: "произошла ошибка в работе с сервером", server: error})
                } else if(typeof rows != undefined && rows.length > 0) {
                    return  response.status(400).json( {message: "Пользователь с таким email уже существует"})
                } else {
                    const {email, password, name, phone} = request.body;
                    const hashPassword = bcrypt.hashSync(password, 7);
                    connectionClient.query("INSERT INTO `msbClient`(`email`, `name`, `phone`, `password`) VALUES (?,?,?,?)", [email, name, phone, hashPassword], (error, results) => {
                        if(error) {
                            return response.status(400).json( {err: "произошла ошибка в работе с сервером", server: error})
                        } else {
                            connectionClient.query("SELECT * FROM `msbClient` WHERE `email` = '" + request.body.email + "'", (error, rows, fields) => {
                                return response.json( {...rows['0']})
                            }) 
                        }
                    })
        
                }
            })
       } catch (e) {
           console.log(e);
            return response.status(500).json({err: "ОШИБКА в catch", server: request.body})
       }
    });
    
    app.post("/login", function(request, response) {
        try {
            connectionClient.query("SELECT * FROM `msbClient` WHERE `email` = '" + request.body.email + "'", (error, rows, fields) => {
                if(error) {
                    return response.status(400).json({err: "произошла ошибка в работе с сервером",  server: error})
                } else if (rows == undefined && rows.length > 0) {
                    return  response.status(400).json({message: "Пользователь с таким email не существует"})
                } else{
                    const validPassword = bcrypt.compareSync(request.body.password, rows['0'].password)
                    if(validPassword) {
                        // const token = jwt.sign({
                        //     id: rw.id,
                        //     email: rw.email
                        // }, config.jwt, { expiresIn: 120 * 120 })
                        return  response.json({...rows['0']})
                    } else return  response.status(401).json({message:`Введен неверный пароль`})
                }
            })
        } 
        catch (e) {
            console.log(e);
             return response.status(500).json({err: "ОШИБКА в catch", server: request.body})
        }
    })
    
    app.post('/bag', (request, response)=>{
        try {
            const {auth, body} = request.body;
            connectionClient.query("INSERT INTO `msbClientOrder`(`id`,`email`, `name`, `phone`, `delivery` , `orderAccepted`, `orderCollect`, `orderGo`, `orderReceived`, img)VALUES (?,?,?,?,?,?,?,?,?,?)" , [auth.id, auth.email, auth.name, auth.phone,  body.delivery,  body.orderAccepted, body.orderCollect, body.orderGo, body.orderReceived, body.mass[0].date.img], (error, results) => {
                if(error) {
                    return  response.status(400).json({error, res})
                } else {
                    console.log(results);
                    body.mass.map(item=>{
                        connectionClient.query("INSERT INTO `msbClientOrderCard`(`id`,`number`, `idCard`, `count`, `month`)VALUES (?,?,?,?,?)", [auth.id, results.insertId, item.date.idCard, item.count, item.month], (error, results)=>{
                            if(error) {
                                return  response.status(400).json({error, res})
                            } else {
                                return  response.status(200).json({})          
                            }
                        })
                    })
                }
            })
        } catch (e) {
            console.log(e);
             return response.status(500).json({err: "ОШИБКА в catch", server: request.body})
        }
    
    })
    
    app.post('/overwriteMass', (request, response)=>{
        try {
            connection.query("SELECT * FROM `msbClientOrder` WHERE `email` = '" + request.body.email + "' " , (error, rows, fields) => {
                if(error) {
                   response.status(400).json({err: "произошла ошибка в работе с сервером",  server: error})
                } else if(rows.length == 0) {
                    return response.status(302, {message: `Заказов пока нет`})
                } else {            
                    return response.status(400).json( {...rows})
                }
            })
        } catch (e) {
            console.log(e);
            return response.status(500).json({err: "ОШИБКА в catch", server: request.body})
        }
    })
    
    app.post('/getOrdersCards', (request, response)=>{
        try {
            connection.query("SELECT * FROM `msbClientOrderCard` WHERE `id` = '" + request.body.id + "' AND  `number` = '" + request.body.number + "'" , (error, rows, fields) => {
                if(error) {
                   response.status(400).json({err: "произошла ошибка в работе с сервером",  server: error})
                } else {  
                    let newItems = []
                    for (let i = 0; i < rows.length; i++) {
                        newItems.push(rows[`${i}`])
                    }          
                    newItems.map(item=>{
                        connection.query("SELECT * FROM `cards` WHERE `idCard` = '" + item.idCard + "'", (error, rows, fields) => {
                            if(error) {
                               response.status(400).json({err: "произошла ошибка в работе с сервером",  server: error})
                            } else {  
                                newItems = [...newItems, {data: rows[0]}]
                            }
                        })
                    })
                    return response.status(400).json( {...newItems})
                }
            })
        } catch (e) {
            console.log(e);
            return response.status(500).json({err: "ОШИБКА в catch", server: request.body})
        }
    })
    
    
    // ADMIN
    
    app.post('/create', function(request, response){  
         try {
            connection.query("SELECT * FROM `msbAdmins` WHERE `email` = '" + request.body.email + "'", (error, rows, fields) => {
                if(error) {
                    return response.status(400).json({err: "произошла ошибка в работе с сервером", server: error})
                } else if(rows['0'] != undefined) {
                    return  response.status(400).json( {message: "Пользователь с таким email уже существует"})
                } else {
                    const {email, password, name, phone, role} = request.body;
                    const hashPassword = bcrypt.hashSync(password, 7);
                    connection.query("INSERT INTO `msbAdmins`(`email`, `name`, `phone`, `password`, `role`) VALUES (?,?,?,?,?)", [email, name, phone, hashPassword, role], (error, results) => {
                        if(error) {
                            return response.status(400).json( {err: "произошла ошибка в работе с сервером", server: error})
                        } else {
                            connection.query("SELECT * FROM `msbAdmins` WHERE `email` = '" + request.body.email + "'", (error, rows, fields) => {
                                return response.json( {...rows['0']})
                            }) 
                        }
                    })
        
                }
            })
        } catch (e) {
            console.log(e);
            return response.status(500).json({err: "ОШИБКА в catch", server: request.body})
        }
    });
    app.post("/loginAdmin", function(request, response) {
        try {
            connection.query("SELECT * FROM `msbAdmins` WHERE `email` = '" + request.body.email + "'", (error, rows, fields) => {
                if(error) {
                    return response.status(400).json({err: "произошла ошибка в работе с сервером",  server: error})
                } else if (rows['0'] == undefined) {
                    return  response.status(400).json({message: "Пользователь с таким email не существует"})
                } else{
                    const validPassword = bcrypt.compareSync(request.body.password, rows['0'].password)
                    if(validPassword) {
                        return  response.json({...rows['0']})
                    } else return  response.status(401).json({message:`Введен неверный пароль`})
                }
            })
        } 
        catch (e) {
            console.log(e);
             return response.status(500).json({err: "ОШИБКА в catch", server: request.body})
        }
    })
    
    app.get('/getOrders', (request, response)=>{
        try {
            connectionClient.query("SELECT * FROM `msbClientOrder`", (error, rows, fields) => {
                if(error) {
                    return response.status(400).json({err: "произошла ошибка в работе с сервером",  server: error})
                } else if (rows['0'] == undefined) {
                    return  response.status(400).json({message: "закзов пока нет"})
                } else{
                    const row = JSON.parse(JSON.stringify(rows))
                    return  response.json([...row])
                }
            })
        } catch (e) {
            console.log(e);
            return response.status(500).json({err: "ОШИБКА в catch", server: request.body})
        }
    
    })
    
    app.post('/addCards', (request, response)=>{
        console.log(request.body);
        const {content, name, role , size, finishing, states, star, text, price, discount} = request.body.card;
        try {
            connection.query("INSERT INTO `cards`(`name`, `role`, `content`, `size` , `finishing`, `states`, `star`, `text` , `price`, `discount`, `img`) VALUES (?,?,?,?,?,?,?,?,?,?,?)", [name, role, content , size, finishing, states, star, text, price, discount, request.body.img[0]], (error, results) => {
                if(error) {
                    console.log(error);
                    return response.status(400).json( {err: "произошла ошибка в работе с сервером", server: error})
                } else {
                    console.log(results);
                    connection.query("SELECT * FROM `cards` `idCard` = '" + results.insertId + "'", (error, rows, fields) => {
                        for (let i = 0; i < request.body.img.length; i++) {
                            connection.query("INSERT INTO `cardsImg`(`idCard`, `img`) VALUES (?,?)", [results.insertId, request.body.img[i]], (error, results) => {
                                if(error) {
                                    console.log({error});
                                    return response.status(400).json( {err: "произошла ошибка в работе с сервером", server: error})
                                } else {
                                    card = {...card, img: [...card.img, request.files.img[i].name]}
                                }
                            })
                        }
                        console.log({...rows['0']});
                        return response.json({...rows['0']})
                    }) 
                }
            })
        } catch (e) {
            console.log(e);
            return response.status(500).json({err: "ОШИБКА в catch", server: request.body})
        }
    })
    
    app.get('/overwriteAuthAdmin', (request, response)=>{
        try {
            connection.query("SELECT * FROM `msbAdmins`", (error, rows, fields) => {
                if(error) {
                    return response.status(400).json({err: "произошла ошибка в работе с сервером",  server: error})
                } else if (rows['0'] == undefined) {
                    return  response.status(400).json({message: "сотрудников пока нет"})
                } else{
                    const row = JSON.parse(JSON.stringify(rows))
                    return  response.json([...row])
                }
            })
        } catch (e) {
            console.log(e);
            return response.status(500).json({err: "ОШИБКА в catch", server: request.body})
        }
    
    })
    
    const start = async ()=>{
        try {
            app.listen(PORT, ()=>{
                console.log(`start to http://localhost:${PORT}`);
            })
        } 
        catch(e){
            console.log(e);
        }
    }
    start()
    
        return console.log(err);
    } else{
        console.log("DATABASECLIENT --- SUPER");
    }
})

app.post('/register', function(request, response){  
    try {
        connectionClient.query("SELECT * FROM `msbClient` WHERE `email` = '" + request.body.email + "'", (error, rows, fields) => {
            if(error) {
                return response.status(400).json({err: "произошла ошибка в работе с сервером", server: error})
            } else if(typeof rows != undefined && rows.length > 0) {
                return  response.status(400).json( {message: "Пользователь с таким email уже существует"})
            } else {
                const {email, password, name, phone} = request.body;
                const hashPassword = bcrypt.hashSync(password, 7);
                connectionClient.query("INSERT INTO `msbClient`(`email`, `name`, `phone`, `password`) VALUES (?,?,?,?)", [email, name, phone, hashPassword], (error, results) => {
                    if(error) {
                        return response.status(400).json( {err: "произошла ошибка в работе с сервером", server: error})
                    } else {
                        connectionClient.query("SELECT * FROM `msbClient` WHERE `email` = '" + request.body.email + "'", (error, rows, fields) => {
                            return response.json( {...rows['0']})
                        }) 
                    }
                })
    
            }
        })
   } catch (e) {
       console.log(e);
        return response.status(500, {err: "ОШИБКА в catch", server: request.body})
   }
});

app.post("/login", function(request, response) {
    try {
        connectionClient.query("SELECT * FROM `msbClient` WHERE `email` = '" + request.body.email + "'", (error, rows, fields) => {
            if(error) {
                return response.status(400, {err: "произошла ошибка в работе с сервером",  server: error})
            } else if (rows == undefined && rows.length > 0) {
                return  response.status(400).json({message: "Пользователь с таким email не существует"})
            } else{
                const validPassword = bcrypt.compareSync(request.body.password, rows['0'].password)
                if(validPassword) {
                    // const token = jwt.sign({
                    //     id: rw.id,
                    //     email: rw.email
                    // }, config.jwt, { expiresIn: 120 * 120 })
                    return  response.json({...rows['0']})
                } else return  response.status(401, {message:`Введен неверный пароль`})
            }
        })
    } 
    catch (e) {
        console.log(e);
         return response.status(500, {err: "ОШИБКА в catch", server: request.body})
    }
})

app.post('/bag', (request, response)=>{
    try {
        const {auth, body} = request.body;
        connectionClient.query("INSERT INTO `msbClientOrder`(`id`,`email`, `name`, `phone`, `delivery` , `orderAccepted`, `orderCollect`, `orderGo`, `orderReceived`, img)VALUES (?,?,?,?,?,?,?,?,?,?)" , [auth.id, auth.email, auth.name, auth.phone,  body.delivery,  body.orderAccepted, body.orderCollect, body.orderGo, body.orderReceived, body.mass[0].date.img], (error, results) => {
            if(error) {
                return  response.status(400).json({error, res})
            } else {
                console.log(results);
                body.mass.map(item=>{
                    connectionClient.query("INSERT INTO `msbClientOrderCard`(`id`,`number`, `idCard`, `count`, `month`)VALUES (?,?,?,?,?)", [auth.id, results.insertId, item.date.idCard, item.count, item.month], (error, results)=>{
                        if(error) {
                            return  response.status(400).json({error, res})
                        } else {
                            return  response.status(200).json({})          
                        }
                    })
                })
            }
        })
    } catch (e) {
        console.log(e);
         return response.status(500, {err: "ОШИБКА в catch", server: request.body})
    }

})

app.post('/overwriteMass', (request, response)=>{
    try {
        connection.query("SELECT * FROM `msbClientOrder` WHERE `email` = '" + request.body.email + "' " , (error, rows, fields) => {
            if(error) {
               response.status(400, {err: "произошла ошибка в работе с сервером",  server: error})
            } else if(rows.length == 0) {
                return response.status(302, {message: `Заказов пока нет`})
            } else {            
                return response.status(400).json( {...rows})
            }
        })
    } catch (e) {
        console.log(e);
        return response.status(500, {err: "ОШИБКА в catch", server: request.body})
    }
})

app.post('/getOrdersCards', (request, response)=>{
    try {
        connection.query("SELECT * FROM `msbClientOrderCard` WHERE `id` = '" + request.body.id + "' AND  `number` = '" + request.body.number + "'" , (error, rows, fields) => {
            if(error) {
               response.status(400, {err: "произошла ошибка в работе с сервером",  server: error})
            } else {  
                let newItems = []
                for (let i = 0; i < rows.length; i++) {
                    newItems.push(rows[`${i}`])
                }          
                newItems.map(item=>{
                    connection.query("SELECT * FROM `cards` WHERE `idCard` = '" + item.idCard + "'", (error, rows, fields) => {
                        if(error) {
                           response.status(400, {err: "произошла ошибка в работе с сервером",  server: error})
                        } else {  
                            newItems = [...newItems, {data: rows[0]}]
                        }
                    })
                })
                return response.status(400).json( {...newItems})
            }
        })
    } catch (e) {
        console.log(e);
        return response.status(500, {err: "ОШИБКА в catch", server: request.body})
    }
})


// ADMIN

app.post('/create', function(request, response){  
     try {
        connection.query("SELECT * FROM `msbAdmins` WHERE `email` = '" + request.body.email + "'", (error, rows, fields) => {
            if(error) {
                return response.status(400).json({err: "произошла ошибка в работе с сервером", server: error})
            } else if(rows['0'] != undefined) {
                return  response.status(400).json( {message: "Пользователь с таким email уже существует"})
            } else {
                const {email, password, name, phone, role} = request.body;
                const hashPassword = bcrypt.hashSync(password, 7);
                connection.query("INSERT INTO `msbAdmins`(`email`, `name`, `phone`, `password`, `role`) VALUES (?,?,?,?,?)", [email, name, phone, hashPassword, role], (error, results) => {
                    if(error) {
                        return response.status(400).json( {err: "произошла ошибка в работе с сервером", server: error})
                    } else {
                        connection.query("SELECT * FROM `msbAdmins` WHERE `email` = '" + request.body.email + "'", (error, rows, fields) => {
                            return response.json( {...rows['0']})
                        }) 
                    }
                })
    
            }
        })
    } catch (e) {
        console.log(e);
        return response.status(500).json({err: "ОШИБКА в catch", server: request.body})
    }
});
app.post("/loginAdmin", function(request, response) {
    try {
        connection.query("SELECT * FROM `msbAdmins` WHERE `email` = '" + request.body.email + "'", (error, rows, fields) => {
            if(error) {
                return response.status(400, {err: "произошла ошибка в работе с сервером",  server: error})
            } else if (rows['0'] == undefined) {
                return  response.status(400).json({message: "Пользователь с таким email не существует"})
            } else{
                const validPassword = bcrypt.compareSync(request.body.password, rows['0'].password)
                if(validPassword) {
                    return  response.json({...rows['0']})
                } else return  response.status(401, {message:`Введен неверный пароль`})
            }
        })
    } 
    catch (e) {
        console.log(e);
         return response.status(500, {err: "ОШИБКА в catch", server: request.body})
    }
})

app.get('/getOrders', (request, response)=>{
    try {
        connectionClient.query("SELECT * FROM `msbClientOrder`", (error, rows, fields) => {
            if(error) {
                return response.status(400, {err: "произошла ошибка в работе с сервером",  server: error})
            } else if (rows['0'] == undefined) {
                return  response.status(400).json({message: "закзов пока нет"})
            } else{
                const row = JSON.parse(JSON.stringify(rows))
                return  response.json([...row])
            }
        })
    } catch (e) {
        console.log(e);
        return response.status(500).json({err: "ОШИБКА в catch", server: request.body})
    }

})

// app.get('/getOrdersCards', (request, response)=>{
//     try {
//         connectionClient.query("SELECT * FROM `msbClientOrderCard` WHERE `id` = '" + request.body.id + "' AND `number` = '" + request.body.number + "'", (error, rows, fields) => {
//             if(error) {
//                 return response.status(400, {err: "произошла ошибка в работе с сервером",  server: error})
//             } else if (rows['0'] == undefined) {
//                 return  response.status(400).json({message: "бытовка не найдена"})
//             } else{
//                 const row = JSON.parse(JSON.stringify(rows))
//                 return  response.json([...row])
//             }
//         })
//     } catch (e) {
//         console.log(e);
//         return response.status(500).json({err: "ОШИБКА в catch", server: request.body})
//     }

// })

app.post('/addCards', (request, response)=>{
    const {content, name, role , size, finishing, states, star, text, price, discount} = request.body;
    try {
        console.log(request.files.img);
        connection.query("INSERT INTO `cards`(`name`, `role`, `content`, `size` , `finishing`, `states`, `star`, `text` , `price`, `discount`, `img`) VALUES (?,?,?,?,?,?,?,?,?,?,?)", [name, role, content , size, finishing, states, star, text, price, discount, request.files.img[0].name], (error, results) => {
            if(error) {
                console.log(error);
                return response.status(400).json( {err: "произошла ошибка в работе с сервером", server: error})
            } else {
                connection.query("SELECT * FROM `cards` `id` = '" + results.insertId + "'", (error, rows, fields) => {
                    // let cardsMass = []
                    // for (let i = 0; i < rows.length; i++) {
                    //     cardsMass.push(rows[`${i}`])
                    // }
                    // let card = cardsMass.find(item=>item.id == results.insertId)
                    // console.log(request.files.img);
                    // for (let i = 0; i < request.files.img.length; i++) {
                    //     connection.query("INSERT INTO `cardsImg`(`idCard`, `img`) VALUES (?,?)", [results.insertId, request.files.img[i].name], (error, results) => {
                    //         if(error) {
                    //             console.log({error});
                    //             return response.status(400).json( {err: "произошла ошибка в работе с сервером", server: error})
                    //         } else {
                    //             card = {...card, img: [...card.img, request.files.img[i].name]}
                    //         }
                    //     })
                    // }
                    console.log({...rows['0']});
                    return response.json({...rows['0']})
                    // for (let i = 0; i < cardsMass.length; i++) {
                    //     connection.query("SELECT * FROM `cards ` WHERE `id` = '" + cardsMass[i].id + "'", (error, rows, fields) => {
                    //         let cardsImg = []
                    //         for (let i = 0; i < rows.length; i++) {
                    //             cardsImg.push(rows[`${i}`])
                    //         }
    
                    //         return response.json({...cards, card})
                    //     })   
                    // }
                   
                }) 
            }
        })
    } catch (e) {
        console.log(e);
        return response.status(500).json({err: "ОШИБКА в catch", server: request.body})
    }
})

app.get('/overwriteAuthAdmin', (request, response)=>{
    try {
        connection.query("SELECT * FROM `msbAdmins`", (error, rows, fields) => {
            if(error) {
                return response.status(400, {err: "произошла ошибка в работе с сервером",  server: error})
            } else if (rows['0'] == undefined) {
                return  response.status(400).json({message: "сотрудников пока нет"})
            } else{
                const row = JSON.parse(JSON.stringify(rows))
                return  response.json([...row])
            }
        })
    } catch (e) {
        console.log(e);
        return response.status(500).json({err: "ОШИБКА в catch", server: request.body})
    }

})
// app.get('/getCards', (request, response)=>{
//     try {
//         cards.find({},function(err, doc) {return  doc && response.json({doc})}); 
//     } catch (e) {
//         console.log(e);
//         return response.status(500).json({err: "ОШИБКА в catch", server: request.body})
//     }

// })
// app.get('/getDeleteCards', (request, response)=>{
//     try {
//         deleteCards.find({},function(err, doc) {return  doc && response.json({doc})}); 
//     } catch (e) {
//         console.log(e);
//         return response.status(500).json({err: "ОШИБКА в catch", server: request.body})
//     }

// })

const start = async ()=>{
    try {
        app.listen(PORT, ()=>{
            console.log(`start to http://localhost:${PORT}`);
        })
    } 
    catch(e){
        console.log(e);
    }
}
start()
