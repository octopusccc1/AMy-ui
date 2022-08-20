import React, { useEffect, useRef } from "react";
import 'codemirror/mode/jsx/jsx';
import 'codemirror/keymap/sublime';
import 'codemirror/addon/comment/comment';
import './style/index.less'
const CodeMirror = require('codemirror');


const debounce = (fn:any, inte:number = 500) => {
    let timer:any;
    return (...params:any) => {
        if (timer) {
            clearTimeout(timer)
        }
        timer=  setTimeout(() => {
            fn(...params)
        }, inte)

    }
}
type TEditor = {
    defaultValue:string
    onChange?:(value:string)=>void
}
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

export default Editor;