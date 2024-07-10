import * as fs from 'fs'
import { exec as cbExec } from 'child_process'
import * as path from 'path'
import { promisify } from 'util'

const app = process && process.type === 'renderer' ? require('@electron/remote').app : require('electron').app
const ALM = app.isPackaged ? path.join(process.resourcesPath, 'ALM') : path.resolve(process.cwd(), '..', 'ALM')
const exec = promisify(cbExec)
const symlinkPath = '/usr/local/bin/ALM'

export function installed() {
  return fs.existsSync(symlinkPath) && fs.readlinkSync(symlinkPath) === ALM
}

export async function install() {
  const command = `do shell script "mkdir -p ${path.dirname(
    symlinkPath
  )} && ln -F -s \\"${ALM}\\" \\"${symlinkPath}\\"" with administrator privileges`

  await exec(`osascript -e '${command}'`)
}
