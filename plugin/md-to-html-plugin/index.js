const { readFileSync } = require('fs');
class MdToHtmlPlugin {
    md;
    template;
    filename;
    constructor({ template, md, filename }) {
        this.template = template;
        this.md = md;
        this.filename = filename;
    }
    apply(compiler) {
        const _content = readFileSync(this.template, 'utf8');
        const _data = readFileSync(this.md, 'utf8')
        const dealData = _data.split('\n').map(item => {
            if (item) {
                return `<h${item.match(/\#/g).length}>${item.replace(/\#/g, '').trim()}<h${item.match(/\#/g).length}/>`
            }
            return item
        })
        const dealContent = _content.replace(' <!-- inner -->', dealData.join('\n'))
        compiler.hooks.emit.tap('md-to-html-plugin', (compilation) => {
            if(compilation.assets[this.filename]){
                const source = compilation.assets[this.filename].source().replace(' <!-- inner -->', dealData.join('\n'))
                compilation.assets[this.filename]=Object.assign({},{
                    source:()=>source,
                    size:()=>source.length
                })
            }else {
                compilation.assets[this.filename] = {
                    source: () => dealContent,
                    size: () => dealContent.length
                }
            }
           
        })

    }
}

module.exports = MdToHtmlPlugin;