const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const lessMiddleware = require('less-middleware')
const helmet = require('helmet')

const app = express()

// 模板引擎
app.engine('art', require('express-art-template'))
app.set('view options', {
	debug: process.env.NODE_ENV !== 'production',
	imports: {
		chapterFilter(value) {
			return value.replace(/\.html$/, '')
		}
	}
})
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'art')

// 中间件
app.use(helmet())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(
	lessMiddleware('/less', {
		dest: '/css',
		pathRoot: path.join(__dirname, 'public')
	})
)
app.use(express.static(path.join(__dirname, 'public')))

// 路由
const index = require('./routes/index')
app.use('/', index)

// 404
app.use(function(req, res, next) {
	const err = new Error('Not Found')
	err.status = 404
	next(err)
})

// 错误处理
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render('error')
})

module.exports = app
