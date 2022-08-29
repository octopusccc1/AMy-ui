# AMy-ui

## 分享

1.创建项目

2.开发组件库代码

3.打包调试发布

4.发布组件库文档

#### 以下记录核心功能相关

##### 1.创建项目 webpack 配置相关重要的点

```js
//用来引入md文件的loader
{
    test: /\.md$/,
    loader: 'raw-loader'
}
```

...以及其他就是 webpack 的基础配置

###### 用到的主要的第三方库:
 marked：可以把 markdown 的内容转换成 dom 字符串 
<a href="https://github.com/markedjs/marked">传送门</a>

codemirror:在线代码编辑器 <a href="https://github.com/codemirror/codemirror5">传送门</a>

##### 2.开发组件库代码
 -src   -app 项目入口

```tsx
import React, { useRef } from 'react'
import { render } from 'react-dom'
import './styles/index.less'
import 'antd/dist/antd.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomeLayout from './views/homeLayout'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="*" element={<HomeLayout />}></Route>
        </Routes>
      </Router>
    </div>
  )
}
render(<App />, document.getElementById('app'))
```

-index.ts 组件出口 -views 及以下就是除文档区块外的菜单，随便写点。

```ts
export { default as MyButton } from './components/MyButton'
export { default as PiXiDemo } from './components/PiXiDemo'
export { default as EchartsDemo } from './components/EchartsDemo'
export { default as WorkerDemo } from './components/WorkerDemo'
export { default as SvgJsDemo } from './components/SvgJsDemo'
```

-mdDemo 一个 mdDemo,render 一个 md 文档的所有例子，每一个例子的 size 用 36 进制转换为一个 id,把插槽内的 js 转换成字符串，使用封装好的 Demo 创建出一个[id,component]的二维数组，通过 ReactDom.render 的方法生成 真实 dom 的字符串塞进生成的 与 id 绑定的<div>插槽里面，再整体丢进  dangerouslySetInnerHTML，实现渲染。

```tsx
const mdDemo = (props: any) => {
  const [components, setComponents] = useState<any>([])
  const [html, setHtml] = useState('')
  useEffect(() => {
    if (props.mdKey) {
      const list: any = []
      const doc = require(`../md/${props.mdKey}.md`)
      const newDoc = doc.replace(
        /:::\s?(demo)\s?([^]+?):::/g,
        (a: any, p1: any, p2: any, offset: any) => {
          const id = offset.toString(36)
          list.push([
            id,
            React.createElement(
              Demo,
              Object.assign(
                {
                  name: props.name,
                  showCode: p1 === 'demo',
                  containerId: id,
                },
                props,
              ),
              p2,
            ),
          ])

          return `<div id=${id} class="demo-container"></div>`
        },
      )
      setComponents(list)
      setHtml(newDoc)
    }
  }, [props.mdKey])

  useEffect(() => {
    for (const [id, component] of components) {
      const div = document.getElementById(id)
      if (div instanceof HTMLElement) {
        ReactDOM.render(component, div)
      }
    }
  }, [components])

  return <div dangerouslySetInnerHTML={{ __html: marked(html, { renderer }) }}></div>
}
```

-demo

-editor 简单的对 codemirror 进行封装，并导入自定义颜色
```tsx
const Editor = (props:TEditor) => {
    const { defaultValue, onChange } = props;
    const editorRef = useRef(null)
    const handleChange = (cm:any) => {
        if (onChange) {
            onChange(cm.getValue())
        }
    }
    const dHandleChange = debounce(handleChange,300)

    useEffect(() => {
        const cm = CodeMirror(editorRef.current, {
            mode: 'jsx',
            theme: 'react',
            keyMap: 'sublime',
            viewportMargin: Infinity,
            lineNumbers: false,
            dragDrop: false
        });
        cm.setValue(defaultValue)
        cm.on('changes', (cm:any) => {
            dHandleChange(cm)
        });
        
    }, [defaultValue])
    return (<div ref={editorRef}></div>)
}
```
-index 使用  babel-standalone 的 transform  翻译 react 语法，与需要渲染的组件一起通过 new Function 丢到内存中，达到实时编辑并 render 的效果 -md 通过自定义语法及 md 本身支持的语法，进行书写，文档即显示代码，无需分开书写。
```tsx
const renderSource = (value: string) => {
    new Promise(resolve => {
      const args = ['React', 'ReactDOM', ...Object.keys(React)]
      const argv = [React, ReactDOM, ...Object.keys(React).map(key => React[key])]
      props.dependencies &&
        Object.keys(props.dependencies).forEach(key => {
          args.push(key)
          argv.push(props.dependencies[key])
        })
      resolve({ args, argv })
    })
      .then(({ args, argv }: any) => {
        let code
        if (/ReactDOM\.render/.test(value)) {
          code = transform(
            `${value.replace('mountNode', `document.getElementById('${playerId}')`)}
            `,
            {
              presets: ['react', 'stage-1'],
            },
          ).code
        } else {
          code = transform(
            `${value}
              ReactDOM.render(<Demo  />,
              document.getElementById('${playerId}'))
              `,
            {
              presets: ['react', 'stage-1'],
            },
          ).code
        }
        args.push(code)
        new Function(...args).apply(null, argv)
      })
      .catch(err => {
        if (process.env.NODE_ENV !== 'production') {
          throw err
        }
      })
  }
```
##### 3.打包调试发布
-通过father.js进行打包

-yalc:进行本地组件库调试 <a href="https://github.com/wclr/yalc">传送门</a>

如何搭建本地npm仓库?
verdaccio是一个创建npm仓库的工具
```cmd
//全局加入verdaccio
yarn global add verdaccio
```

```
//这个是verdaccio的安装地址,我们执行一下
/usr/local/bin/verdaccio
```

```
//config file后面的就是配置文件的路径
 warn --- config file  - /Users/user1/.config/verdaccio/config.yaml
 warn --- "crypt" algorithm is deprecated consider switch to "bcrypt". Read more: https://github.com/verdaccio/monorepo/pull/580
 info --- plugin successfully loaded: verdaccio-htpasswd
 info --- plugin successfully loaded: verdaccio-audit
 warn --- http address - http://0.0.0.0:4873/ - verdaccio/5.14.0
```

```
cd /Users/user1/.config/verdaccio/
vim config.yaml
```
```
//最后一行加上listen: 0.0.0.0:4873
//代码片段 可以通过 G命令直接跳到最后一行 i 编辑
//用来监听你的本地ip地址
# translate your registry, api i18n not available yet
# i18n:
# list of the available translations https://github.com/verdaccio/verdaccio/blob/master/packages/plugins/ui-theme/src/i18n/ABOUT_TRANSLATIONS.md
#   web: en-US
listen: 0.0.0.0:4873

```
```
//增加淘宝源
# https://verdaccio.org/docs/configuration#uplinks
# a list of other known repositories we can talk to
uplinks:
  npmjs:
    url: https://registry.npm.taobao.org/
# Learn how to protect your packages
# https://verdaccio.org/docs/protect-your-dependencies/
```

```
//下载pm2守护进程
yarn global add pm2
```

```
//就可以运行本地的npm仓库了
pm2 start verdaccio
```
可以通过http://localhost:4873进行访问
```
// 注册账户
npm adduser --registry http://localhost:4873
```

```
//发布之前用father打包好的组件代码，账号密码就是之前注册的。
yarn publish --registry http://localhost:4873 

```

##### 4.发布组件库文档，这里简单的采用gh-pages的方式
上传代码到自己的github仓库。
这里存在一个小问题，由于我们公司的gitlab有一个公私钥，而我们又要自己上传到github上面，这样我们就需要两套公私钥
方法是 
```
//创建另外一套钥匙，回车的时候需要改个新名
ssh-keygen -t rsa -C 【git邮箱】
```
ssh的地址在 ~/.ssh下面
```
cd ~/.ssh
```
```
//在 ~/.ssh下面创建一个config文件
touch config
```
```
vim config
```

//配置信息如下
```
Host github.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/【你的新的私钥的文件名】
```
在github的settings里找到 sshkey配置，加入你的新公钥

```
//判断是否生效
ssh -T git@github.com
```
然后我们在github上面创建 组件库地址，具体的命令行git会提供，这里就不写了！
我们本地创建好的代码需要gitinit一下，然后通过ssh的方式推送到远程仓库
这里可能会报一个错:You've successfully authenticated, but GitHub does not provide shell access.
虽然是用 git 命令push，但本质上仍然是 https，所以不允许提交。具体问题解决地址如下
<a href="https://blog.csdn.net/qq_41726670/article/details/124389683 ">传送门</a>

然后我们创建gh-pages分支，我们通过
```
git subtree push --prefix=【你打包好的文件顶层目录，如build或者dist】 origin gh-pages
```
提交到gh-pages远程分支
再通过git的settings里的pages里进行管理分支配置成gh-pages
这是我的pages页面
<a href="https://octopusccc1.github.io/AMy-ui/">传送门</a>

