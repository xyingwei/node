var fs = require('fs')

var Student = require('./Student')

var express = require('express')
var router = express.Router() //创造一个路由容器

//进行路由的设计与分配

router.get('/students', function (req, res) {
    Student.find(function (err, students) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.render('index.html', {
            students: students
        })
    })
})
//点击添加学生 的请求
router.get('/students/new', function (req, res) {
    res.render('new.html')
})


// //保存添加的学生
router.post('/students/new', function (req, res) {
    // 1. 获取表单数据
    // 2. 处理
    //    将数据保存到 db.json 文件中用以持久化
    // 3. 发送响应
    new Student(req.body).save(function (err) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })

})

/*
 * 渲染编辑学生页面
 */
router.get('/students/edit', function (req, res) {
    // 1. 在客户端的列表页中处理链接问题（需要有 id 参数）
    // 2. 获取要编辑的学生 id
    // 
    // 3. 渲染编辑页面
    //    根据 id 把学生信息查出来
    //    使用模板引擎渲染页面

    // replace
    //    字符串模式
    //      简单，但是不支持全局和忽略大小写问题
    //    正则表达式模式
    //      强大，支持全局和忽略大小写
    Student.findById(req.query.id.replace(/"/g, ''), function (err, student) {
        if (err) {
            console.log(err)
            return res.status(500).send('Server error.')
        }
        res.render('edit.html', {
            student: student
        })
    })
})

/*
 * 处理编辑学生
 */
router.post('/students/edit', function (req, res) {
    // 1. 获取表单数据
    //    req.body
    // 2. 更新
    //    Student.updateById()
    // 3. 发送响应
    var id = req.body.id.replace(/"/g, '')
    Student.findByIdAndUpdate(id, req.body, function (err) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })
})


//删除学生操作

router.get('/students/delete', function (req, res) {
    var id = req.query.id.replace(/"/g, '')


    Student.findByIdAndRemove(id, function (err) {
        if (err) {
            return res.status(500).send('Server error.')
        }

        res.redirect('/students')
    })
})
// router.get('/students/edit', function (req, res) {
//     // 1. 在客户端的列表页中处理链接问题（需要有 id 参数）
//     // 2. 获取要编辑的学生 id
//     // 
//     // 3. 渲染编辑页面
//     //    根据 id 把学生信息查出来
//     //    使用模板引擎渲染页面

//     Student.findById(parseInt(req.query.id), function (err, student) {
//       if (err) {
//         return res.status(500).send('Server error.')
//       }
//       res.render('edit.html', {
//         student: student
//       })
//     })
//   })

//   router.post('/students/edit', function (req, res) {
//     // 1. 获取表单数据
//     //    req.body
//     // 2. 更新
//     //    Student.updateById()
//     // 3. 发送响应
//     Student.updateById(req.body, function (err) {
//       if (err) {
//         return res.status(500).send('Server error.')
//       }
//       res.redirect('/students')
//     })
//   })


module.exports = router