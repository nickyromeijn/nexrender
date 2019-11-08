const RSMQWorker = require( "rsmq-worker" );
const { init, render } = require('@nexrender/core')

const start = async (host, secret, settings) => {
    const port = host.split(':')[1]
    host = host.split(':')[0]
    settings = init(Object.assign({}, settings, {
        logger: console,
    }))

    const worker = new RSMQWorker("renders", {
        host,
        port,
        timeout: 0
    });

    worker.on("message", async ( job, next, id ) => {
        try{
            await render(JSON.parse(job), settings)
            next()
        } catch(e){
            console.log("error rendering", e)
            next()
        }
    });

    worker.start()

}

module.exports = { start }
