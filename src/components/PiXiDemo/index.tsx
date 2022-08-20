import React, { useEffect, useRef } from 'react';
 import * as PIXI  from 'pixi.js'

const PiXiDemo = ()=>{
    useEffect(()=>{
        const a = new PIXI.Application({width: 256, height: 256});

        document.querySelector('.pixi-wrapper')?.appendChild(a.view)
    },[])
    return <div  className="pixi-wrapper">

    </div>
}

export default PiXiDemo