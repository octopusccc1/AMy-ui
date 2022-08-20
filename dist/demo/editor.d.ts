import 'codemirror/mode/jsx/jsx';
import 'codemirror/keymap/sublime';
import 'codemirror/addon/comment/comment';
import './style/index.less';
declare type TEditor = {
    value: string;
    onChange?: (value: string) => void;
};
declare const Editor: (props: TEditor) => JSX.Element;
export default Editor;
