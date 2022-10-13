declare type TDemo = {
    dependencies: any;
    name?: string;
    children: string;
    containerId: string | number;
};
declare const Demo: (props: TDemo) => JSX.Element;
export default Demo;
