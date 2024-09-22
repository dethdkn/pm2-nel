import os from 'node:os'

export default function(){
  const hostname = os.hostname()
  const platform = os.platform()

  const cpus = os.cpus()
  const cpuName = cpus[0].model
  const numberOfCores = cpus.length

  const totalMemory = bytesToGB(os.totalmem())
  const freeMemory = bytesToGB(os.freemem())
  const usedMemory = Number((totalMemory - freeMemory).toFixed(2))

  const uptime = Number((os.uptime() / 3600).toFixed(2))

  return { hostname, platform, cpuName, numberOfCores, totalMemory, freeMemory, usedMemory, uptime }
}

function bytesToGB(bytes: number){
  return Number((bytes / 1024 / 1024 / 1024).toFixed(2))
}
