import React from 'react';

import classNames from 'classnames';

import styles from './index.module.scss';

const WrapperHome = ({
  children,
  style,
  className = '',
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) => {
  return (
    <div className={classNames(styles.wrapper, { [className]: !!className })} style={style}>
      {children}
    </div>
  );
};
export default WrapperHome;
