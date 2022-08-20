import React from "react";
import { Button ,ButtonProps} from "antd";

interface TMyButton extends ButtonProps {

}
const MyButton = (props:TMyButton)=>{
    return <Button {...props}>{props.children}</Button>
}
export default MyButton;