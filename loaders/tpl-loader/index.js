const tplLoader = function (content, map, meta) {
    const _content = content.replace(/\s+/g, '');
    this.callback(null, `
    module.exports = function(params){
        const render = function (tpl, params) {
            return tpl.replace(/\{\{(.*?)\}\}/g, (node, key) => {
                return params[key]
            })
        }
       return render('${_content}',params);
    }
`, map, meta)
return
}

module.exports = tplLoader;