require("dotenv").config()
const Express = require('express');
const app = Express();
const dbConnection = require("./db")

const controllers = require("./controllers")
app.use(require("./middleware/headers"))
app.use(Express.json())

app.use('/user', controllers.userController)

app.use(require("./middleware/validate-jwt"));
app.use('/ticket', controllers.ticketController)
app.use('/comment', controllers.commentController)


dbConnection.authenticate()
.then( async () => await dbConnection.sync ())
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`[Server]: App is listening on ${process.env.PORT}.`);
    });
})
.catch((err) => {
    console.log(`[Server]: Server crash. Error =${err}`);
});
