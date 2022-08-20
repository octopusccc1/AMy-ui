import React, { useEffect, useState, useMemo, useRef } from 'react'
import ReactDOM from 'react-dom'
import Editor from './editor'

const { transform } = require('babel-standalone')
type TDemo = {
  dependencies: any
  name?: string
  children: string
  containerId: string | number
}

const locale = {
  hide: '隐藏代码',
  show: '编辑代码',
}
const Demo = (props: TDemo) => {
  const [showBlock, setShowBlock] = useState(false)
  const saveValueRef = useRef<string>('')
  useEffect(() => {
    props.children.replace(/(`{3})([^`]|[^`][\s\S]*?[^`])\1(?!`)/gi, markdown => {
      const [all, type, code]: any = markdown.match(/```(.*)\n?([^]+)```/)
      switch (type.trim()) {
        case 'js':
          saveValueRef.current = code
          break
      }
      return ''
    })
    renderSource(saveValueRef.current)
  }, [props.children])

  const blockControl = (show: boolean) => {
    setShowBlock(show)
  }

  const playerId = useMemo(() => `player-${((Math.random() * 1e9) >> 0).toString(36)}`, [])
  const renderSource = (value: string) => {
    new Promise(resolve => {
      const args = ['React', 'ReactDOM']
      const argv = [React, ReactDOM]
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
  return (
    <div className={`demo-block demo-box demo-${props.name}`}>
      <div className="source" id={playerId} />
      {showBlock && (
        <div className="meta">
          <Editor
            defaultValue={saveValueRef.current}
            onChange={code => {
              saveValueRef.current = code
              renderSource(code)
            }}
          />
        </div>
      )}

      <div
        className="demo-block-control"
        onClick={() => {
          blockControl(!showBlock)
        }}
      >
        {showBlock ? locale.hide : locale.show}
      </div>
    </div>
  )
}

export default Demo
