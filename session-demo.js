const Koa = require('koa');
const Session = require('koa-session-minimal');
const MysqlSession = require('koa-mysql-session');

const app = new Koa();

const store = new MysqlSession({
  user: 'homestead',
  password: 'secret',
  database: 'koa-demo',
  host: '192.168.10.10',
});
const cookie = {
  maxAge: '', // cookie有效时长
  expires: '',  // cookie失效时间
  path: '', // 写cookie所在的路径
  domain: '', // 写cookie所在的域名
  httpOnly: '', // 是否只用于http请求中获取
  overwrite: '',  // 是否允许重写
  secure: '',
  sameSite: '',
  signed: '',

};


app.use(Session({
  key: 'SESSION_ID',
  cookie: cookie,
  store: store
}));
app.use(async (ctx) => {
  if (ctx.url === '/set') {
    ctx.session = {
      user_id: Math.random().toString(36).substr(2),
      count: 0
    };
    ctx.body = ctx.session;
  } else if (ctx.url === '/') {
    ctx.session.count++;
    ctx.body = ctx.session;
  }

});

app.listen(3000);