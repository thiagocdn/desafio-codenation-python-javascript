runChallenge = require('./runChallenge');

const token = 'insert_token_here'

async function main() {

    const info = await runChallenge(token);

    console.log(info);
    
}

main();