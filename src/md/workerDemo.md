# WorkerDemo

## 何时使用

- 就这么用

## 基本使用

:::demo 基本使用。

```js
const Demo = () => {
  const [text, setText] = useState([])
  const textRef = useRef();
  textRef.current = text
  const textbob = `addEventListener('message', event => {
        console.log(event.data) 
        setInterval(()=>{
            postMessage('收到了') 
        },300)
    })`
  const blob = new Blob([textbob])
  const url = window.URL.createObjectURL(blob)
  const worker = new Worker(url)
  worker.onmessage = event => {
    console.log(event.data) // 收到了
    setText([...textRef.current, event.data])
  }

  return (
    <div>
      <WorkerDemo />
      <Button
        onClick={() => {
          worker.postMessage('收到了吗')
        }}
      >
        点击
      </Button>
      <div>
        信息:
        {textRef.current.map((item, index) => <div key={index}>{item}</div>)}
      </div>
    </div>
  )
}
```

:::
