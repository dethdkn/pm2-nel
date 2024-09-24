import type { platform } from 'node:os'

export interface SysInfo{
  hostname: string,
  platform: platform,
  cpuName: string,
  numberOfCores: number,
  totalMemory: number,
  freeMemory: number,
  usedMemory: number,
  uptime: number,
  nodeVersion: string,
}
