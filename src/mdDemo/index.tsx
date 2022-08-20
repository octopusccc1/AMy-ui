import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Demo from "../demo";
import marked from "marked";
import renderer from './renderer';
type TMdDemo = {
  name?: string;
  mdKey:string
};
const mdDemo = (props: any) => {
  const [components, setComponents] = useState<any>([]);
  const [html, setHtml] = useState("");

  useEffect(() => {
    if(props.mdKey){
        const list: any = [];
        const doc = require(`../md/${props.mdKey}.md`);
        const newDoc = doc.replace(
          /:::\s?(demo)\s?([^]+?):::/g,
          (a: any, p1: any, p2: any, offset: any) => {
            const id = offset.toString(36);
            list.push([
              id,
              React.createElement(
                Demo,
                Object.assign(
                  {
                    name: props.name,
                    showCode: p1 === "demo",
                    containerId: id,
                  },
                  props
                ),
                p2
              ),
            ]);
    
            return `<div id=${id} class="demo-container"></div>`;
          }
        );
        setComponents(list);
        setHtml(newDoc);
    }
   
   
  }, [props.mdKey]);

  useEffect(() => {
    for (const [id, component] of components) {
      const div = document.getElementById(id);
      if (div instanceof HTMLElement) {
        ReactDOM.render(component, div);
      }
    }
  }, [components]);

  return <div dangerouslySetInnerHTML={{ __html: marked(html,{renderer}) }}></div>;
};

export default mdDemo;
