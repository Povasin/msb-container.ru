const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000
const http = require('http');
const bcrypt = require('bcrypt');
const db = require('./app')
const fileUpload = require("express-fileupload")
const fs = require('fs');
// const { APP_PORT, APP_IP, APP_PATH } = process.env;
// const indexPath = path.join(path.dirname(APP_PATH), './index.html')



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

app.post('/register', function(request, response){  
    try {
        const {email, password, name, phone} = request.body;
        db.msbClient.findAll({where:{email: email}, raw: true })
        .then(user=>{
            console.log(user);
            if (user.length == 0) {
                const hashPassword = bcrypt.hashSync(password, 7);
                db.msbClient.create({
                    email: email,
                    name: name,
                    phone: phone,
                    password: hashPassword,
                }).then(result=>{
                    console.log(result._previousDataValues);
                    return response.json({...result._previousDataValues})
                }).catch(err =>{
                    console.log(err);  
                    return response.status(500).json({err: "ОШИБКА в добавлении таблицы"})
                })
            } else {
                return response.json( {message: "Пользователь с таким email уже существует"})
            }
        }).catch(err=>console.log(err));
   } catch (e) {
        console.log(e);
        return response.status(500).json({err: "ОШИБКА в catch"})
   }
});

app.post("/login", function(request, response) {
    try {
        const {email, password} = request.body;
        db.msbClient.findAll({where:{email: email}, raw: true })
        .then(user=>{
            console.log(user);
            if (user.length != 0) {
                const validPassword = bcrypt.compareSync(password, user[0].password)
                validPassword ? response.json({...user[0]}) : response.status(401).json({message:`Введен неверный пароль`})
            } else {
                return response.json( {message: "Пользователь с таким email не существует"})
            }
        }).catch(err=>console.log(err));
    } 
    catch (e) {
        console.log(e);
         return response.status(500).json({err: "ОШИБКА в catch"})
    }
})

app.post('/bag', (request, response)=>{
    try {
        const {idUser, body} = request.body;
        db.msbClientOrder.create({
            idUser: idUser,
            delivery: body.delivery == "самовызов" ? body.delivery : `${body.delivery.city}/${body.delivery.house}`,
            orderAccepted: '',
            orderCollect: '',
            orderGo:'',
            orderReceived: '',
            date: '',
            img: body.mass[0].data.img
        }).then(result=>{
            body.mass.map(item=>{
                db.msbClientOrderCard.create({
                    idUser: idUser,
                    number: result.number,
                    idCard: item.idCard,
                    count: item.count,
                    month: item.month
                }).then(result=>{console.log(result);}).catch(err=>console.log(err));
            })
            console.log(result);
            return response.json({})
        }).catch(err =>{
            console.log(err);  
            return response.status(500).json({err: "ОШИБКА в добавлении таблицы"})
        })
    } catch (e) {
        console.log(e);
        return response.status(500).json({err: "ОШИБКА в catch"})
    }

})

app.post('/overwriteMass', (request, response)=>{
    try {
        db.msbClientOrder.findAll({where:{idUser: request.body.idUser}, raw: true })
        .then(result=>{
           if (result == undefined) {
            return response.json([])
           }
            console.log(result);
            return response.json(result)
        }).catch(err=>console.log(err));
    } catch (e) {
        console.log(e);
        return response.status(500).json({err: "ОШИБКА в catch"})
    }
})

app.post('/getOrdersCards', (request, response)=>{
    try {
        console.log(request.body);
        db.msbClientOrderCard.findAll({where:{idUser: request.body.idUser, number: request.body.number}, raw: true })
        .then(result=>{
           if (result == undefined) {
            return response.json([])
           }
            console.log(result);
            return response.json(result)
        }).catch(err=>console.log(err));
    } catch (e) {
        console.log(e);
        return response.status(500).json({err: "ОШИБКА в catch"})
    }
})


// ADMIN


app.get('/getCards', (request, response)=>{
    try {
        db.cards.findAll({raw: true })
        .then(result=>{
            console.log(result);
            return response.json(result)
        }).catch(err=>console.log(err));
    } catch (e) {
        console.log(e);
        return response.status(500).json({err: "ОШИБКА в catch"})
    }
})
app.get('/getCardsImg', (request, response)=>{
    try {
        db.cardsImg.findAll({raw: true })
        .then(result=>{
            return response.json(result)
        }).catch(err=>console.log(err));
    } catch (e) {
        console.log(e);
        return response.status(500).json({err: "ОШИБКА в catch"})
    }
})

app.post('/create', function(request, response){  
     try {
        const {email, password, name, phone, role} = request.body;
        db.msbAdmins.findAll({where:{email: email}, raw: true })
        .then(user=>{
            console.log(user);
            if (user.length == 0) {
                const hashPassword = bcrypt.hashSync(password, 7);
                db.msbAdmins.create({
                    email: email,
                    name: name,
                    phone: phone,
                    password: hashPassword,
                    role: role
                }).then(result=>{
                    console.log(result._previousDataValues);
                    return response.json(result._previousDataValues)
                }).catch(err =>{
                    console.log(err);  
                    return response.status(500).json({err: "ОШИБКА в добавлении таблицы"})
                })
            } else {
                return response.json( {message: "Пользователь с таким email уже существует"})
            }
        }).catch(err=>console.log(err));
    } catch (e) {
        console.log(e);
        return response.status(500).json({err: "ОШИБКА в catch"})
    }
});
app.post("/loginAdmin", function(request, response) {
    try {
        const {email, password} = request.body;
        db.msbAdmins.findAll({where:{email: email}, raw: true })
        .then(user=>{
            console.log(user);
            if (user.length != 0) {
                const validPassword = bcrypt.compareSync(password, user[0].password)
                validPassword ? response.json({...user[0]}) : response.status(401).json({message:`Введен неверный пароль`})
            } else {
                return response.json( {message: "Пользователь с таким email не существует"})
            }
        }).catch(err=>console.log(err));
    } 
    catch (e) {
        console.log(e);
         return response.status(500).json({err: "ОШИБКА в catch"})
    }
})

app.get('/getOrdersAdmin', (request, response)=>{
    try {
        db.msbClientOrder.findAll({raw: true })
        .then(result=>{
            if (result == undefined) {
                return response.json({message: "закзов пока нет"})
            } else{
                return response.json(result)
            }
        }).catch(err=>console.log(err));
    } catch (e) {
        console.log(e);
        return response.status(500).json({err: "ОШИБКА в catch"})
    }

})
app.post("/getOrdersAuth", function(request, response) {
    try {
        const {idUser} = request.body;
        db.msbClient.findAll({where:{idUser: idUser}, raw: true })
        .then(user=>{
            console.log({...user[0]});
            return  response.json({...user[0]})
        }).catch(err=>console.log(err));
    } 
    catch (e) {
        console.log(e);
         return response.status(500).json({err: "ОШИБКА в catch"})
    }
})
app.post("/deleteCard", function(request, response) {
    try {
        const {idCard} = request.body;
        db.cards.findAll({where:{idCard: idCard}, raw: true })
        .then(searchCards=>{
            fs.unlink(`../www/${searchCards[0].img.split('/')[3]}/${searchCards[0].img.split('/')[4]}`, err => {
                if(err) {
                    console.log(err);
                } else{
                    console.log('Файл успешно удалён');
                } 
            });
            db.cardsImg.findAll({where:{idCard: idCard}, raw: true })
            .then(searchCardsImg=>{
                console.log(searchCardsImg);
                searchCardsImg.map(item=>{
                    fs.unlink(`../www/${item.img.split('/')[3]}/${item.img.split('/')[4]}`, err => {
                        if(err) {
                            console.log(err);
                        } else{
                            console.log('Файл успешно удалён');
                        } 
                    });
                })
                db.cardsImg.destroy({where:{idCard: idCard}, raw: true })
                .then(result=>console.log(result)).catch(err=>console.log(err))

            }).catch(err=>console.log(err));
            db.cards.destroy({where:{idCard: idCard}, raw: true })
            .then(result=>{
                db.cards.findAll({raw: true })
                .then(user=>{
                    return  response.json(user)
                }).catch(err=>console.log(err));

            }).catch(err=>console.log(err));

        }).catch(err=>console.log(err));
    } 
    catch (e) {
        console.log(e);
         return response.status(500).json({err: "ОШИБКА в catch"})
    }
})


app.post("/changeOrderCard", function(request, response) {
    try {
        const {body} = request.body;
        console.log(body);
        db.msbClientOrder.update({
            idUser: body.idUser,
            delivery: body.delivery,
            date: body.date,
            img: body.img,
            number: body.number,
            orderAccepted: body.orderAccepted,
            orderCollect: body.orderCollect,
            orderGo: body.orderGo,
            orderReceived: body.orderReceived,
        }, {where:{idUser: body.idUser, number: body.number}, raw: true })
        .then(result=>{
            db.msbClientOrder.findAll({raw: true })
            .then(user=>{
                console.log(user);
                return  response.json(user)
            }).catch(err=>console.log(err));
        }).catch(err=>console.log(err));
    } 
    catch (e) {
        console.log(e);
         return response.status(500).json({err: "ОШИБКА в catch"})
    }
})
app.get('/addCards', async (request, response)=>{
    try {
        db.cards.create({
            name: 'Новая Карточка',
            role: "Бытовки для проживания", 
            content: 0, 
            size: "", 
            finishing: "", 
            states: "", 
            star: "", 
            text: "", 
            price: 0,
            discount: 0,
            have: "false",
            img: 'false'
        }).then(result=>{
            return  response.json(result._previousDataValues)
        }).catch(err =>{
            console.log(err);  
            return response.status(500).json({err: "ОШИБКА в добавлении таблицы"})
        })
    } catch (e) {
        console.log(e);
        return response.status(500).json({err: "ОШИБКА в catch"})
    }
})
app.post('/addImg', async (request, response)=>{
    try {
        console.log(request.body.idCard);
        const {content, name, role , size, finishing, states, star, text, price, discount, have, idCard} = request.body;
        let newDateCard = Date.now()
        request.files.img.mv(`../www/uploads/${newDateCard}-${request.files.img.name}`, err=>{
            if (err) {
                console.log(err);
                return response.status(500).json({err: "ОШИБКА в добавлении файла"})
            } else {
                if (request.body.index != 0) {      
                    db.cardsImg.create({
                        idCard : idCard,
                        img: `https://backend.msb-container.ru/uploads/${newDateCard}-${request.files.img.name}`,
                        active: 'false'
                    }).then(result=>{
                        db.cardsImg.findAll({where:{idCard: idCard}, raw: true })
                        .then(lastCard=>{
                            return response.json({cardsImgResult: lastCard})
                        }).catch(err=>console.log(err));
                    })
                    .catch(err=>console.log(err));
                } else{
                    db.cards.update({
                        img: `https://backend.msb-container.ru/uploads/${newDateCard}-${request.files.img.name}`,
                        name: name,
                        role: role, 
                        content: content, 
                        size: size, 
                        finishing: finishing, 
                        states: states, 
                        star: star, 
                        text: text, 
                        price: price,
                        discount: discount,
                        have: have
                    }, {where:{idCard: idCard}, raw: true }).then(()=>{
                        db.cards.findAll({raw: true })
                        .then(lastCard=>{
                            return response.json({cardsResult: lastCard})
                        }).catch(err=>console.log(err));
                    }).catch(err=>console.log(err));
                }
            }
         
        })
    } catch (e) {
        console.log(e);
        return response.status(500).json({err: "ОШИБКА в catch"})
    }
})
app.post('/deleteImg', async (request, response)=>{
    try {
        console.log(request.body);
        const {index, img, idCard} = request.body;
        const {content, name, role , size, finishing, states, star, text, price, discount, have} = request.body.form;
        fs.unlink(`../www/${img.img.split('/')[3]}/${img.img.split('/')[4]}`, err => {
            if(err) {
                console.log(err);
            } else{
                console.log('Файл успешно удалён');
            }
        });
        if (index == true) {
            console.log(request.body.img);
            db.cardsImg.destroy({where:{idCard: idCard, idCardImg: request.body.img.idCardImg}, raw: true })
            .then(()=>{
                db.cardsImg.findAll({where:{idCard: request.body.idCard}, raw: true })
                .then(lastCard=>{
                    return response.json({cardsImgResult: lastCard})
                }).catch(err=>console.log(err));
            }).catch(err=>console.log(err));
        }else{
            db.cards.update({
                img: `${index == false ? 'false' : index.img}`,
                name: name,
                role: role, 
                content: content, 
                size: size, 
                finishing: finishing, 
                states: states, 
                star: star, 
                text: text, 
                price: price,
                discount: discount,
                have: have
            }, {where:{idCard: request.body.idCard}, raw: true }).then(()=>{
                db.cards.findAll({raw: true })
                .then(lastCard=>{
                    if (index != false) {
                        db.cardsImg.destroy({where:{idCard: idCard, idCardImg: index.idCardImg}, raw: true })
                        .then(()=>{
                            db.cardsImg.findAll({where:{idCard: request.body.idCard}, raw: true })
                            .then(lastCardImg=>{
                                return response.json({cardsImgResult: lastCardImg, cardsResult: lastCard})
                            }).catch(err=>console.log(err));
                        }).catch(err=>console.log(err));
                    } else{
                        return response.json({cardsResult: lastCard})
                    }
                }).catch(err=>console.log(err));
            }).catch(err=>console.log(err));
        }
    } catch (e) {
        console.log(e);
        return response.status(500).json({err: "ОШИБКА в catch"})
    }
})

app.post('/changePhoto', async (request, response)=>{
    try {
        const {img} = request.body;
        db.cardsImg.update({
            active: img.active
        }, {where:{idCard: img.idCard, idCardImg: img.idCardImg}, raw: true }).then(()=>{
            db.cardsImg.findAll({where:{idCard: img.idCard}, raw: true })
            .then(lastCardImg=>{
                return response.json({cardsImgResult: lastCardImg})
            }).catch(err=>console.log(err));
        }).catch(err=>console.log(err));
    } catch (e) {
        console.log(e);
        return response.status(500).json({err: "ОШИБКА в catch"})
    }
})


// ПРОВЕРИТЬ 
app.post('/updateCard', async (request, response)=>{
    try {
        console.log(request.body);
        const {content, name, role , size, finishing, states, star, text, price, discount, idCard, have} = request.body;
        db.cards.update({
            name: name,
            role: role, 
            content: content, 
            size: size, 
            finishing: finishing, 
            states: states, 
            star: star, 
            text: text, 
            price: price,
            discount: discount,
            have: have
        }, {where:{idCard: idCard}, raw: true }).then(()=>{
            db.cards.findAll({raw: true })
            .then(lastCard=>{
                return response.json(lastCard)
            }).catch(err=>console.log(err));
        }).catch(err=>console.log(err));
    } catch (e) {
        console.log(e);
        return response.status(500).json({err: "ОШИБКА в catch"})
    }
})
app.get('/overwriteAuthAdmin', (request, response)=>{
    try {
        db.msbAdmins.findAll({raw: true })
        .then(result=>{
            if (result == undefined) {
                return response.json({message: "сотрудников пока нет"})
            } else {
                console.log(result);
                return response.json(result)
           }
        })
    } catch (e) {
        console.log(e);
        return response.status(500).json({err: "ОШИБКА в catch"})
    }

})

app.post('/deletePeople', (request, response)=>{
    try {
        const {idUser} = request.body;
        console.log(idUser);
        db.msbAdmins.destroy({where:{idUser: idUser}, raw: true })
        .then(result=>{
            db.msbAdmins.findAll({raw: true })
            .then(user=>{
                return  response.json(user)
            }).catch(err=>console.log(err));
        
        }).catch(err=>console.log(err));
    } catch (e) {
        console.log(e);
        return response.status(500).json({err: "ОШИБКА в catch"})
    }

})
app.post("/changePeople", function(request, response) {
    try {
        const {body} = request.body;
        console.log(body);
        db.msbAdmins.update({
            name: body.name,
            phone: body.phone,
            role: body.role
        }, {where:{idUser: body.idUser}, raw: true })
        .then(result=>{
            db.msbAdmins.findAll({raw: true })
            .then(user=>{
                console.log(user);
                return  response.json(user)
            }).catch(err=>console.log(err));
        }).catch(err=>console.log(err));
    } 
    catch (e) {
        console.log(e);
         return response.status(500).json({err: "ОШИБКА в catch"})
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
