const koa = require("koa")
const koaRoute = require("koa-route")
const koaStatic = require("koa-static")
const koaBody = require("koa-body")
const User = require("./model/model").User

const server = new koa()

server.use(koaStatic("./public"))
server.use(koaBody())

server.use(koaRoute.get("/",function(ctx){
    ctx.redirect("/login.html")
}))

server.use(koaRoute.post("/reg",async function(ctx){
    let{username,password} = ctx.request.body

    if(!username || !password){
        ctx.body = "用户名或密码不能为空"
    }else{
        let res = await User.count({username})
        if(res==0){
            await User.create({username,password})
            ctx.body="已注册"
        }else{
            ctx.body = "用户名已存在"
        }
    }
}))

server.use(koaRoute.post("/login",async function(ctx){
    let res = await User.count(ctx.request.body)
    if(res==0){
        ctx.body="用户名或密码错误"
        }else{
            ctx.body = "登录成功"
        }
}))
server.listen(8080,function(args){
    console.log("server is running")
})