const express=require('express');
const bodyParser=require('body-parser');
const graphqlHttp=require('express-graphql');
const mongoose=require('mongoose');
const graphQlSchema=require('./graphql/schema/index');
const graphQlResolvers=require('./graphql/resolvers/index');
const isAuth=require('./middleware/is-Auth');

const app=express();
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
})

app.use(isAuth);

app.use('/graphql',graphqlHttp({
       schema:graphQlSchema,
       rootValue:graphQlResolvers,
       graphiql:true 
}));

mongoose.connect('mongodb+srv://test:test@todo-oo9wu.mongodb.net/event?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    app.listen(8000)
    console.log("Connected...");
})
.catch((err)=>{
    console.log(err);
})