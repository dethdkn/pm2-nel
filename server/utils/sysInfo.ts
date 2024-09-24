import os from 'node:os'
import process from 'node:process'
import type { SysInfo } from '~/types/sys'

export default function(): SysInfo{
  const hostname = os.hostname()
  const platform = os.platform()

  const cpus = os.cpus()
  const cpuName = cpus[0]?.model || ''
  const numberOfCores = cpus.length

  const totalMemory = bytesToGb(os.totalmem())
  const freeMemory = bytesToGb(os.freemem())
  const usedMemory = Number((totalMemory - freeMemory).toFixed(2))

  const uptime = Number((os.uptime() / 3600).toFixed(2))

  const nodeVersion = process.version

  return { hostname, platform, cpuName, numberOfCores, totalMemory, freeMemory, usedMemory, uptime, nodeVersion }
}
