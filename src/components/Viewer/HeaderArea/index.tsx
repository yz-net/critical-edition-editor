import React from 'react';
import { ControlBarProps } from './ControlBar';
// import styles from "./HeaderArea.module.css";

interface HeaderAreaProps extends ControlBarProps {
  title?: string;
}

const HeaderArea = (props: HeaderAreaProps) => {
  const { title } = props;
  return (
    <div className="sans-title-ff">
      <h3>{title}</h3>
    </div>
  );
};

HeaderArea.defaultProps = {
  title: '',
};

export default HeaderArea;
