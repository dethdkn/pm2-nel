import os from 'node:os'
import process from 'node:process'
import type { SysInfo } from '~/types/sys'

export default function(): SysInfo{
  const hostname = os.hostname()
  const platform = os.platform()

  const cpus = os.cpus()
  const cpuName = cpus[0]?.model || ''
  const numberOfCores = cpus.length

  const totalMemoryN = os.totalmem()
  const freeMemoryN = os.freemem()
  const totalMemory = formatBytes(totalMemoryN)
  const freeMemory = formatBytes(freeMemoryN)
  const usedMemory = formatBytes(totalMemoryN - freeMemoryN)

  const uptime = formatUptime(os.uptime(), 'sec')

  const nodeVersion = process.version

  return { hostname, platform, cpuName, numberOfCores, totalMemory, freeMemory, usedMemory, uptime, nodeVersion }
}
