const rsmq      = require('./adapters/rsmq')
const nexrender = require('./adapters/nexrender')

/**
 * Starts worker "thread" of continious loop
 * of fetching queued projects and rendering them
 * @param  {String} host
 * @param  {String} secret
 * @param  {Object} settings
 * @return {Promise}
 */

module.exports = ({backend = 'nexrender'})=>{
  switch(backend){
    case 'nexrender':
      return nexrender.start
    case 'rsmq':
      return rsmq.start
  }
}
