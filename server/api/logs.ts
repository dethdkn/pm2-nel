// ! incomplete
import type { Peer } from 'crossws'
import { destr } from 'destr'
import { spawn } from 'node:child_process'

export default defineWebSocketHandler({
  open(peer){
    getLogs(peer)
  },
})

function getLogs(peer: Peer){
  const pm2Logs = spawn('pm2', ['logs', '--json'])
  pm2Logs.stdout.on('data', data => {
    const logs = (data.toString() as string).split('\n').filter(Boolean)
    for(const log of logs){
      const logObj = destr(log)
      if(typeof logObj === 'object') peer.send(logObj)
    }
  })
}
