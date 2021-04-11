
require('dotenv').config();

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

if(process.env.NODE_ENV === 'dev'){
    process.env.URI_DB = process.env.MONGO_URL_LOCAl;
} else {
    process.env.URI_DB = process.env.MONGO_URL_REMOTE;
}

