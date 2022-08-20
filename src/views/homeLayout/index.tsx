import React, { useState } from "react";
import { Layout, Menu } from "antd";
import MdDemo from "../../mdDemo";
import HomeHeader from "./homeHeader";
import * as source from "../../demo/source";
import "./index.less";
const { Content, Sider } = Layout;
const ctx = require["context"]("../../md", false, /\.md$/);
const values = ctx.keys().map((item: string) =>
  item.replace(/[^]+\/(.*?)\.md/, (p1: any, p2: any) => {
    return p2;
  })
);
const HomeLayout = () => {
  const [key, setKey] = useState(values[0]);
  return (
    <div className="home-wrapper">
      <Layout>
        <HomeHeader />
        <Layout>
          <Sider width={200} className="site-layout-background" theme="light">
            <Menu
              mode="inline"
              selectedKeys={[key]}
              onClick={(k) => {
                setKey(k.key);
              }}
              // defaultSelectedKeys={["0"]}
              style={{ height: "100%", borderRight: 0 }}
              items={[
                ...values.map((it: string, index: number) => {
                  return {
                    key: it,
                    label: it.replace(/[^]{1}/, (p: string) => {
                      return p.toUpperCase();
                    }),
                  };
                }),
              ]}
            />
          </Sider>
          <Content
            className="site-layout-background markdown"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <MdDemo dependencies={source} mdKey={key} />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default HomeLayout;
