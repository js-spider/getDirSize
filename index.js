const path = require('path')
const fs = require('fs')

let size = 0

function getFileSizeFromDir(absolutePath){
    const items = fs.readdirSync(absolutePath,{withFileTypes: true, recursive: true})
    if(Array.isArray(items)){
        items.forEach(item => {
            const itemPath = path.resolve(absolutePath,item.name)
            if(item.isDirectory()){
                getFileSizeFromDir(itemPath)
            }else{
                const stat = fs.statSync(itemPath)
                size += stat.size
            }
        })
    }
}

function main(){
    size = 0
    const argv = process.argv[2]
    if(argv){
        const pathArr = argv.split('=')
        if(['-p', '--path'].includes(pathArr[0])){
            getFileSizeFromDir(path.resolve(__dirname, pathArr[1]))
        }
    }
}


main()

