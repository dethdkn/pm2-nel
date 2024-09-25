export default function(epochOrSec: number, type: 'epoch' | 'sec'): string{
  let minutes: number

  if(type === 'epoch') minutes = (Date.now() - epochOrSec) / (1000 * 60)
  else if(type === 'sec') minutes = epochOrSec / 60
  else throw new Error('Invalid type, must be either \'epoch\' or \'sec\'')

  if(minutes >= 60){
    const hours = minutes / 60
    return `${hours.toFixed(2)} hours`
  }
  return `${Math.floor(minutes)} minutes`
}
