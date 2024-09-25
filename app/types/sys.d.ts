import type { platform } from 'node:os'

export interface SysInfo{
  hostname: string,
  platform: platform,
  cpuName: string,
  numberOfCores: number,
  totalMemory: string,
  freeMemory: string,
  usedMemory: string,
  uptime: string,
  nodeVersion: string,
}
