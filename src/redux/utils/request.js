import superagent from 'superagent'
import { ParseConfig } from 'redux/config'

const request = (functionName, data = null, cb) => {
  superagent.post('https://api.parse.com/1/functions/' + functionName)
  .set('X-Parse-Application-Id', ParseConfig.applicationId)
  .set('X-Parse-REST-API-Key', ParseConfig.restKey)
  .send({data: data})
  .end(cb)
}

export default request
