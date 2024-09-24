/* eslint-disable promise/prefer-await-to-callbacks */
import pm2 from 'pm2'
import type { PM2Details, PM2Process } from '~/types/pm2'

export function pm2List(){
  return new Promise<PM2Process[]>((resolve, reject) => {
    pm2.connect(err => {
      if(err) return reject(err)

      pm2.list((err, list) => {
        pm2.disconnect()
        if(err) return reject(err)

        const process: PM2Process[] = list.map(p => ({
          pid: p.pid || p.pid === 0 ? p.pid : -1,
          pm_id: p.pm_id || p.pm_id === 0 ? [p.pm_id] : [-1],
          name: p.name || '',
          status: p.pm2_env?.status || '',
          instances: p.pm2_env?.instances || 0,
          cpu: p.monit?.cpu || 0,
          ram: p.monit?.memory || 0,
          uptime: Number(((Date.now() - (p.pm2_env?.pm_uptime || 0)) / (1000 * 60 * 60)).toFixed(2)),
        }))

        const mergedProcesses: PM2Process[] = []

        for(const p of process){
          const existingProcess = mergedProcesses.find(mp => mp.name === p.name)
          if(existingProcess){
            existingProcess.pm_id = [...existingProcess.pm_id, ...p.pm_id]
            existingProcess.cpu += p.cpu
            existingProcess.ram += p.ram
          }
          else mergedProcesses.push(p)
        }
        for(const p of process) p.ram = bytesToGb(p.ram)

        return resolve(mergedProcesses)
      })
    })
  })
}

export function pm2Details(name: string){
  return new Promise<PM2Details[]>((resolve, reject) => {
    pm2.connect(err => {
      if(err) return reject(err)

      pm2.describe(name, (err, apps) => {
        pm2.disconnect()
        if(err) return reject(err)

        const details: PM2Details[] = apps.map(a => ({
          pid: a.pid || a.pid === 0 ? a.pid : -1,
          pm_id: a.pm_id || a.pm_id === 0 ? [a.pm_id] : [-1],
          name: a.name || '',
          status: a.pm2_env?.status || '',
          instances: a.pm2_env?.instances || -1,
          cpu: a.monit?.cpu || 0,
          ram: bytesToGb(a.monit?.memory || 0),
          uptime: Number(((Date.now() - (a.pm2_env?.pm_uptime || 0)) / (1000 * 60 * 60)).toFixed(2)),
          cwd: a.pm2_env?.pm_cwd || '',
          exec_path: a.pm2_env?.pm_exec_path || '',
          interpreter: a.pm2_env?.exec_interpreter || '',
          out_log: a.pm2_env?.pm_out_log_path || '',
          error_log: a.pm2_env?.pm_err_log_path || '',
          // @ts-ignore - NODE_APP_INSTANCE is not in the type definition
          app_instance: a.pm2_env?.NODE_APP_INSTANCE || 0,
        }))

        return resolve(details)
      })
    })
  })
}

export function pm2Start(name: string){
  return new Promise<void>((resolve, reject) => {
    pm2.connect(err => {
      if(err) return reject(err)

      pm2.start(name, err => {
        pm2.disconnect()
        if(err) return reject(err)

        return resolve(void 0)
      })
    })
  })
}

export function pm2Stop(name: string){
  return new Promise<void>((resolve, reject) => {
    pm2.connect(err => {
      if(err) return reject(err)

      pm2.stop(name, err => {
        pm2.disconnect()
        if(err) return reject(err)

        return resolve(void 0)
      })
    })
  })
}

export function pm2Restart(name: string){
  return new Promise<void>((resolve, reject) => {
    pm2.connect(err => {
      if(err) return reject(err)

      pm2.restart(name, err => {
        pm2.disconnect()
        if(err) return reject(err)

        return resolve(void 0)
      })
    })
  })
}

export function pm2Reload(name: string){
  return new Promise<void>((resolve, reject) => {
    pm2.connect(err => {
      if(err) return reject(err)

      pm2.reload(name, err => {
        pm2.disconnect()
        if(err) return reject(err)

        return resolve(void 0)
      })
    })
  })
}

export function pm2Delete(name: string){
  return new Promise<void>((resolve, reject) => {
    pm2.connect(err => {
      if(err) return reject(err)

      pm2.delete(name, err => {
        pm2.disconnect()
        if(err) return reject(err)

        return resolve(void 0)
      })
    })
  })
}
