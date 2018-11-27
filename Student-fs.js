var fs = require('fs')

var dbPath = './db.json'

exports.find = function(callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if (err) {
            return callback(err)
        }
        callback(null, JSON.parse(data).students)
    })
}

/**
 * 添加保存学生
 * @param  {Object}   student  学生对象
 * @param  {Function} callback 回调函数
 */
exports.save = function (student, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
      if (err) {
        return callback(err)
      }
      var students = JSON.parse(data).students
  
      // 添加 id ，唯一不重复
      student.id = students[students.length - 1].id + 1
  
      // 把用户传递的对象保存到数组中
      students.push(student)
  
      // 把对象数据转换为字符串
      var fileData = JSON.stringify({
        students: students
      })
  
      // 把字符串保存到文件中
      fs.writeFile(dbPath, fileData, function (err) {
        if (err) {
          // 错误就是把错误对象传递给它
          return callback(err)
        }
        // 成功就没错，所以错误对象是 null
        callback(null)
      })
    })
  }
//
// exports.save = function(student,callback) {
//     fs.readFile(dbPath,'utf8',function(err,data){
//         if (err) {
//             return callback(err)
//         }
//         var students = JSON.parse(data).students
//         student.id = students[students.length - 1].id + 1
//         students.push(student)

//         var fileData = JSON.stringify({
//             students: students
//         })

//         fs.writeFile(dbPath,fileData,function(err){
//             return callback(err)
//         })
//         callback(null)
//     })
// }

/**
 * 根据 id 获取学生信息对象
 * @param  {Number}   id       学生 id
 * @param  {Function} callback 回调函数
 */
exports.findById = function (id, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
      if (err) {
        return callback(err)
      }
      var students = JSON.parse(data).students
      var ret = students.find(function (item) {
        return item.id === parseInt(id)
      })
      callback(null, ret)
    })
  }
  exports.updateById = function (student, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
      if (err) {
        return callback(err)
      }
      var students = JSON.parse(data).students
  
      // 注意：这里记得把 id 统一转换为数字类型
      student.id = parseInt(student.id)
  
      // 你要修改谁，就需要把谁找出来
      // EcmaScript 6 中的一个数组方法：find
      // 需要接收一个函数作为参数
      // 当某个遍历项符合 item.id === student.id 条件的时候，find 会终止遍历，同时返回遍历项
      var stu = students.find(function (item) {
        return item.id === student.id
      })
  
      // 这种方式你就写死了，有 100 个难道就写 100 次吗？
      // stu.name = student.name
      // stu.age = student.age
  
      // 遍历拷贝对象
      for (var key in student) {
        stu[key] = student[key]
      }
  
      // 把对象数据转换为字符串
      var fileData = JSON.stringify({
        students: students
      })
  
      // 把字符串保存到文件中
      fs.writeFile(dbPath, fileData, function (err) {
        if (err) {
          // 错误就是把错误对象传递给它
          return callback(err)
        }
        // 成功就没错，所以错误对象是 null
        callback(null)
      })
    })
  }