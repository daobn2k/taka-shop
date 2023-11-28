import { useState } from 'react';

import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

import HistoryProductSell from './HistoryOrder/HistoryOrder';
import styles from './index.module.scss';
import Info from './Info';
import Password from './Password';
import WrapperHome from '../HomePage/WrapperHome';

const InformationUser = () => {
  const [currentTab, setCurrentTab] = useState('1');

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Thông tin cá nhân',
      children: <Info />,
    },
    {
      key: '2',
      label: 'Mật khẩu',
      children: <Password />,
    },
    {
      key: '3',
      label: 'Lịch sử đơn hàng',
      children: <HistoryProductSell />,
    },
  ];

  const onChange = (key: string) => {
    setCurrentTab(key);
  };

  return (
    <div className={styles.root}>
      <WrapperHome className={styles.wrapper}>
        <Tabs activeKey={currentTab} items={items} onChange={onChange} />
      </WrapperHome>
    </div>
  );
};

export default InformationUser;
