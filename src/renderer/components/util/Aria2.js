function multicallOjb (name, token, parameters) {
  var obj = {
    methodName: `aria2.${name}`
  }
  var params = (token && token !== '') ? [`token:${token}`] : []
  if (Array.isArray(parameters)) {
    params = params.concat(parameters)
  }
  if (params.length > 0) {
    obj.params = params
  }
  return obj
}

function multicall (axios, conn) {
  return send('system.multicall', [[
    multicallOjb('tellActive', conn.token, []),
    multicallOjb('tellWaiting', conn.token, [0, 1000]),
    multicallOjb('tellStopped', conn.token, [0, 1000]),
    multicallOjb('getGlobalStat', conn.token, []),
    multicallOjb('getGlobalOption', conn.token, [])
  ]], axios, conn)
}

function send (name, parameters, axios, conn) {
  var { addr, port, token, secure, path } = conn
  var url = `http${secure ? 's' : ''}://${addr}:${port}${path}`
  var data = {
    method: name,
    id: 'AriaEr'
  }
  var params = (token && token !== '') ? [`token:${token}`] : []
  if (Array.isArray(parameters)) {
    params = params.concat(parameters)
  }
  if (params.length > 0) {
    data.params = params
  }
  // console.log(data)
  return axios.post(url, data)
}

export default {
  multicall,
  send
}
/*
var multicall = function (aria2, fn) {
  var secret = aria2.secret
  aria2.secret = ''
  aria2.send(
    'system.multicall',
    [
      {
        methodName: 'aria2.getVersion',
        params: ['token:' + secret]
      },
      {
        methodName: 'aria2.tellActive',
        params: ['token:' + secret]
      },
      {
        methodName: 'aria2.tellWaiting',
        params: ['token:' + secret, 0, 1000]
      },
      {
        methodName: 'aria2.tellStopped',
        params: ['token:' + secret, 0, 1000]
      },
      {
        methodName: 'aria2.getGlobalStat',
        params: ['token:' + secret]
      },
      {
        methodName: 'aria2.getGlobalOption',
        params: ['token:' + secret]
      }
    ],
    function (err, res) {
      fn(err, res)
      aria2.secret = secret
    }
  )
}

export default {
  multicall
}
*/
