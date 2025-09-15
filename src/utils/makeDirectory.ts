import fs from 'fs'

export async function makeDirectory() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const folderName = `logs/${year}-${month}-${day}/`

  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName, { recursive: true })
    }
    return folderName
  } catch (e) {
    throw new Error(e)
  }
}
