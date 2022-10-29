import { Breadcrumb } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React from 'react';

const Layout = ({ children, breadcrumb }) => {
  return (
    <Content
      style={{
        margin: '0 16px',
      }}
    >
      <Breadcrumb
        style={{
          margin: '12px 0',
        }}
      >
        {breadcrumb &&
          breadcrumb.map((item, index) => <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>)}
      </Breadcrumb>
      <div
        className="site-layout-background"
        style={{
          padding: 24,
          minHeight: 360,
        }}
      >
        {children}
      </div>
    </Content>
  );
};

export default Layout;
