export interface PM2Process{
  pid: number,
  pm_id: number,
  name: string,
  status: string,
  instances: 'max' | number,
  cpu: number,
  ram: number,
  uptime: number,
}

export interface PM2Details extends PM2Process{
  cwd: string,
  exec_path: string,
  interpreter: string,
  out_log: string,
  error_log: string,
  app_instance: number,
}
