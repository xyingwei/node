var mongoose = require('mongoose')

//链接数据库
mongoose.connect('mongodb://localhost/itcast')

//设计集合结构
var Schema = mongoose.Schema  
var studentSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    gender :{
        type : Number,
        enum : [0,1],
        default : 0

    },
    age :{
        type :Number
    },
    hobbies :{
        type : String
    }
})


// var mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost/itcast', { useMongoClient: true })

// var Schema = mongoose.Schema

// var studentSchema = new Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   gender: {
//     type: Number,
//     enum: [0, 1],
//     default: 0
//   },
//   age: {
//     type: Number
//   },
//   hobbies: {
//     type: String
//   }
// })

// 直接导出模型构造函数
// module.exports = mongoose.model('Student', studentSchema)
//发布文档架构模型 形成数据库并导出
module.exports = mongoose.model('Student',studentSchema)