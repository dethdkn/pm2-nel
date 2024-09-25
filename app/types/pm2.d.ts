export interface PM2Process{
  pid: number,
  pm_id: number[],
  name: string,
  status: string,
  instances: 'max' | number,
  cpu: number,
  ram: string,
  ramI: number,
  uptime: string,
}

export interface PM2Details extends PM2Process{
  cwd: string,
  exec_path: string,
  interpreter: string,
  out_log: string,
  error_log: string,
  app_instance: number,
}
