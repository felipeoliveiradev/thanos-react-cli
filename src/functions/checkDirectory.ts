const fs = require(`fs`);
export function CheckDirectory(directory: string) {  

  // Is it a directory?
  if (fs.existsSync(directory)) {
    return true
  } else {
    return false
  }
}