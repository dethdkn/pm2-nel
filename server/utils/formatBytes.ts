export default function(bytes: number): string{
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  if(bytes === 0) return '0 Bytes'

  const i = Math.floor(Math.log(bytes) / Math.log(1000))
  const value = bytes / 1000 ** i

  return `${Number.parseFloat(value.toFixed(2))} ${sizes[i]}`
}
