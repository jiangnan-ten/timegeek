const express = require('express')
const router = express.Router()
const fs = require('fs-extra')
const path = require('path')

const baseDir = '/Users/ten/Downloads'
const baseConfDir = path.resolve(baseDir, 'conf.json')

// 获取资源列表
const getResourceInfo = () => {
	try {
		const resourceInfo = fs.readdirSync(baseDir)
		const resourceDir = []
		resourceInfo.forEach(dirName => {
			const currentResourceDir = path.resolve(baseDir, dirName)
			const isDir = fs.lstatSync(currentResourceDir).isDirectory()
			if (isDir) {
				resourceDir.push({
					dirPath: currentResourceDir,
					dirName
				})
			}
		})
		return resourceDir
	} catch (e) {
		console.log(e)
		return []
	}
}

// 获取目录详情
const getDirDetail = dir => {
	return new Promise(resolve => {
		const { dirName, dirPath } = dir
		try {
			const files = fs.readdirSync(dirPath)
			const filesFilter = files.filter(file => {
				return file && /\.html$/.test(file)
			})
			return resolve({
				files: filesFilter,
				dirName,
				count: filesFilter.length
			})
		} catch (err) {
			console.log(err)
			return resolve({
				files: [],
				dirName,
				count: 0
			})
		}
	})
}

// 首页列表
const getResources = () => {
	const confExists = fs.pathExistsSync(baseConfDir)
	if (confExists) {
		return fs.readJsonSync(baseConfDir).data
	} else {
		const resourceInfo = getResourceInfo()
		const promises = resourceInfo.map(dir => getDirDetail(dir))
		return Promise.all(promises).then(res => {
			fs.writeJsonSync(baseConfDir, { data: res })
			return Promise.resolve(res)
		})
	}
}

router.get('/', async (req, res) => {
	const resources = await getResources()

	res.render('index', { resources })
})

router.get('/column/:column', (req, res, next) => {
	const { column } = req.params
	try {
		const data = fs.readJsonSync(baseConfDir).data
		const foundObj = data.find(dir => dir.dirName == column)

		if (!foundObj) {
			throw new Error(`not found: ${column}`)
		}

		res.render('column', { column, data: foundObj })
	} catch (err) {
		next(err)
	}
})

router.get('/column/:column/:article', (req, res) => {
	const { column, article } = req.params
	const filePath = path.resolve(baseDir, column, article)

	res.sendFile(filePath, {
		maxAge: 1000 * 60 * 60 * 6,
		headers: {}
	})
})

module.exports = router
