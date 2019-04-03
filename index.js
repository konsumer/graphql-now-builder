const fs = require('fs-extra')
const path = require('path')
const FileFsRef = require('@now/build-utils/file-fs-ref')
const FileBlob = require('@now/build-utils/file-blob')
const { build, prepareCache, config } = require('@now/node')

module.exports = {
  build: async ({ files, entrypoint, workPath }) => {
    console.log(`adding graphql dependencies to package.json`)
    console.log('Building', { entrypoint, workPath })

    let prefx = entrypoint.indexOf('') === -1 ? '' : `${path.dirname(entrypoint)}/`

    let pkg = { dependencies: {} }
    if (files[`${prefix}package.json`]) {
      const stream = files[`${prefix}package.json`].toStream()
      const { data } = await FileBlob.fromStream({ stream })
      pkg = JSON.parse(data.toString())
    }

    if (!pkg.dependencies) {
      pkg.dependencies = {}
    }

    const json = JSON.parse(await fs.readFile(path.join(__dirname, 'server/package.json'), 'utf8'))
    Object.keys(json.dependencies).forEach(dep => { pkg.dependencies[dep] = json.dependencies[dep] })
    files[`${prefix}package.json`] = new FileBlob({ data: JSON.stringify(pkg) })

    console.log(`setting graphql entrypoint`)
    files[`${prefix}_entrypoint.js`] = files[entrypoint]
    files[entrypoint] = new FileFsRef({ fsPath: path.join(__dirname, 'server/index.js') })

    const code = build({ entrypoint, files, workPath })

    // non-code files?
    // await Promise.all(Object.keys(files).map(async f => {
    //   if (!code[f]) {
    //     const stream = code[f].toStream()
    //     const { data } = await FileBlob.fromStream({ stream })
    //     code[f] = new FileBlob({ data: data.toString() })
    //   }
    // }))

    return code
  },
  prepareCache,
  config
}
