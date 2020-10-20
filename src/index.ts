import * as App from './server';

async function start () {
    return await App.init()
}

start().catch((err) => {
    console.log(err);
    process.exit(1)
})
