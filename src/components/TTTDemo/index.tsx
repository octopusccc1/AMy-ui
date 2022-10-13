import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react'
import { Button, Input, Modal } from 'antd'
import './index.less'
const logo = require('../../../common/assets/image/logo.jpeg')

const TTTDemo = () => {
  const [value, setValue] = useState<any>({ password: '66' })
  const contentRef = useRef<any>()
  const Content = forwardRef((props: any, ref) => {
    const [password, setPassword] = useState(props.password)
    useEffect(() => {
      setPassword(props.password)
    }, [props.password])
    useImperativeHandle(ref, () => {
      console.log('password', password)
      return { password }
    })
    return (
      <Input
        value={password}
        onChange={e => {
          setPassword(e.target.value)
        }}
      ></Input>
    )
  })
  const handleModal = () => {
    const Content = forwardRef((props: any, ref) => {
      const [password, setPassword] = useState(props.password)
      useEffect(() => {
        setPassword(props.password)
      }, [props.password])
      useImperativeHandle(ref, () => {
        console.log('password', password)
        return { password }
      })
      return (
        <Input
          value={password}
          onChange={e => {
            setPassword(e.target.value)
          }}
        ></Input>
      )
    })
    Modal.confirm({
      title: '',
      content: <Content password={value.password} ref={contentRef} />,
      onOk: () => {
        console.log(' contentRef.current.password', contentRef)
      },
    })
  }

  setTimeout(()=>{
    console.log('setTimeout1');
    Promise.resolve(1).then(()=>{ 
      console.log('Promise4'); 
    setTimeout(()=>{
    console.log('setTimeout5');
     setTimeout(()=>{
    console.log('setTimeout5-1');
    Promise.resolve(1).then(data =>{
       console.log('Promise4-1'); 
    setTimeout(()=>{
    console.log('sPromise4-2'); },0)
    })
    },0)
    })
    })
      },0)
    setTimeout(()=>{
    console.log('setTimeout2'); },0)
    Promise.resolve(1).then(() =>{
       console.log('Promise1');
       setTimeout(()=>{
        console.log('setTimeout3')
            },0)
       })
        Promise.resolve(1).then(() =>{ console.log('Promise2'); })
  //   const [visible, setVisible] = useState(true)
  return (
    <div
      style={{
        height: 800,
        lineHeight: '800px',
        textAlign: 'center',
        border: '1px solid #ccc',
      }}
    >
      {/* <Content password={value.password} ref={contentRef}/>
      <Button onClick={() => {
        console.log('contentRef',contentRef)
      }}>点击</Button> */}
      <img src={logo} />
    </div>
  )
}

export default TTTDemo
