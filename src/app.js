const helpersConfig = require("./config")

const cookieParser = require("cookie-parser")
const sanitize = require('sanitize')
const express = require("express")
const app = express()

const marvelAPI = require('./models/marvelAPI')

const path = require('node:path')

/** serving react with static path */
const buildPath = path.join(
    __dirname,
    '../',
    'client',
    'build',
)
app.use(express.static(buildPath))

app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(sanitize.middleware)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", helpersConfig.appURL)
    res.header("Access-Control-Allow-Credentials", "true")
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization, x-id, Content-Length, X-Requested-With")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    next()
})

const router = express.Router()

router.get('/comics', async (req, res) => {
    await (new marvelAPI()).getComics(req.query)
        .then(payload => {
            res.statusCode = 200
            res.send(JSON.stringify({ data: payload.data.data }))
        })
        .catch(err => {
            console.log(err)
            res.send(JSON.stringify(false))
        })
})

router.get('/comics/:id', async (req, res) => {
    await (new marvelAPI()).getComic(req.params.id)
        .then(payload => {
            res.statusCode = 200
            res.send(JSON.stringify({ data: payload.data.data.results[0], }))
        })
        .catch(err => {
            console.log(err)
            res.send(JSON.stringify(false))
        })
})
/*
router.get('/comics/search', async (req, res) => {
    const filterOptions = ['name', 'status', 'species', 'type', 'gender']
    const filters = {}
    for (const filterOption of filterOptions) {
        if (undefined !== req.query[filterOption]) {
            filters[filterOption] = req.query[filterOption]
        }
    }
    const strFilters = marvelAPI.uriEncodeArray(filters)
    const page = req.query.page !== undefined ? req.query.page : 1
    await marvelAPI.search(strFilters, page)
        .then((payload) => {
            res.statusCode = 200
            res.send(JSON.stringify({ data: payload.data }))
        })
        .catch(err => {
            console.log(err)
            res.send(JSON.stringify(false))
        })
})
*/
app.use('/api/v1', router)

/** Serving react with static path */
const reactRoutesPath = path.join(
    buildPath,
    'index.html'
)
app.use('*', express.static(reactRoutesPath))

if (helpersConfig.nodeEnv === "production") {
    app.listen(helpersConfig.appPort)
} else {
    app.listen(helpersConfig.appPort, () => {
        const url = `http://127.0.0.1:${helpersConfig.appPort}`
        console.log(`Listening on ${url}`)
    })
}
