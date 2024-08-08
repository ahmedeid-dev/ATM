// ! catch uncaughtException
process.on('uncaughtException', (error) => { console.log("uncaughtException Error Occured", error) })
import bootstrap from './src/module/index.routes.js'
import connection from './database/dbConnection.js'
import express from 'express'

const app = express()
app.use(express.json())
const port = 3000
bootstrap(app)

// ! catch unhandledRejection
process.on('unhandledRejection', (error) => { console.log("unhandledRejection Error Occured", error, "") })

// ! test server connection
app.listen(port, () => console.log(`Example app listening on port ${port}!`))