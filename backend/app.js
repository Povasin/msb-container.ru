const Sequelize = require('sequelize')

// const sequelize = new Sequelize('msbclientdb', 'root', 'Pk7802662302', {
//     dialect: 'mysql',
//     host: "localhost",
// })

const sequelize = new Sequelize('c74846_msb_container_ru', 'c74846_msb_container_ru', 'XaCduNugnesuh25', {
    dialect: 'mysql',
    host: "localhost",
})

const msbClient = sequelize.define('msbClient', {
    idUser: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    phone:{
        type: Sequelize.NUMBER,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName : 'msbClient',
    timestamps : false
});
const msbClientOrder = sequelize.define('msbClientOrder', {
    number: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    idUser:{
        type: Sequelize.NUMBER,
        allowNull: false
    },
    delivery: {
        type: Sequelize.STRING,
        allowNull: false
    },
    orderAccepted: {
        type: Sequelize.STRING,
        allowNull: false
    },
    orderCollect: {
        type: Sequelize.STRING,
        allowNull: false
    },
    orderGo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    orderReceived: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false
    },
    img: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {
    tableName : 'msbClientOrder',
    timestamps : false
});

const msbClientOrderCard = sequelize.define('msbClientOrderCard', {
    idUser:{
        type: Sequelize.NUMBER,
        allowNull: false,
        primaryKey: true,
    },
    number:{
        type: Sequelize.NUMBER,
        allowNull: false
    },
    idCard:{
        type: Sequelize.NUMBER,
        allowNull: false
    },
    count:{
        type: Sequelize.NUMBER,
        allowNull: false
    },
    month:{
        type: Sequelize.NUMBER,
        allowNull: false
    }
}, {
    tableName : 'msbClientOrderCard',
    timestamps : false
});

const msbAdmins = sequelize.define('msbAdmins', {
    idUser: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    phone:{
        type: Sequelize.NUMBER,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    role:{
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName : 'msbAdmins',
    timestamps : false
});

const cards = sequelize.define('cards', {
    idCard: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    img:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    discount:{
        type: Sequelize.NUMBER,
        allowNull: false
    },
    price:{
        type: Sequelize.NUMBER,
        allowNull: false
    },
    star : {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    size:{
        type: Sequelize.STRING,
        allowNull: false
    },
    content:{
        type: Sequelize.NUMBER,
        allowNull: false
    },
    finishing:{
        type: Sequelize.STRING,
        allowNull: false
    },
    states:{
        type: Sequelize.STRING,
        allowNull: false
    },
    text:{
        type: Sequelize.STRING,
        allowNull: false
    },
    role:{
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName : 'cards',
    timestamps : false
});

const cardsImg = sequelize.define('cardsImg', {
    
    img:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    idCard:{
        type: Sequelize.NUMBER,
        allowNull: false,
        primaryKey: true
    },
}, {
    tableName : 'cardsImg',
    timestamps : false
});

module.exports = {
    sequelize : sequelize,
    msbClient: msbClient,
    msbClientOrder: msbClientOrder,
    msbClientOrderCard: msbClientOrderCard, 
    msbAdmins: msbAdmins,
    cards: cards, 
    cardsImg: cardsImg
}