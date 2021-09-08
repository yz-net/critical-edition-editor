import React from 'react';
import { DataContext } from 'Data/Context';
import { defaultProjectData } from 'Data/ProjectData';
import styles from './LogoBar.module.css';
import { ReactComponent as ArrowLeft } from '../../../svg/arrow-left.svg';

export default function LogoBar() {
  const context = React.useContext(DataContext);
  const { pathname } = window.location;
  const isIndexPage: Boolean = pathname === '/';

  const {
    homeLink,
    organizationName: orgName,
    title: appName,
  } = context?.projectData || defaultProjectData();
  return (
    <>
      <div className={`${styles.BigBar} ${styles.Bar}`}>
        <a className={styles.BarLink} href={homeLink}>
          <div className={styles.BlueBox}>
            {/* <Logo /> */}
            <img alt={`${orgName} logo`} src="/img/header-logo.svg" />
          </div>
        </a>

        <a className={styles.BarLink} href="/">
          <div className={`${styles.LogoText} teal-font`}>
            <div className={styles.FullAppLogo}>
              <div className={styles.AppWordmark}>{appName}</div>
            </div>
            {isIndexPage ? null : (
              <div className={styles.BackButton}>
                <ArrowLeft />
              </div>
            )}
          </div>
        </a>
      </div>
    </>
  );
}
