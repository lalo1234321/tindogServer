
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


if(process.env.NODE_ENV === 'dev'){
    process.env.URI_DB = 'mongodb://localhost:27017/tindog';
} else {
    process.env.URI_DB = 'mongodb+srv://lalo:lalo@cluster0.inmzb.mongodb.net/tindog?retryWrites=true&w=majority';
}

