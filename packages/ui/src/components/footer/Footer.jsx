import React from 'react';
import { footerItems } from "../../utils/constants";
import styles from './footer.module.css';

function Footer() {
  return (
    <footer className={styles["footer-container"]}>
      <div className={styles["footer-logo"]}>
        <img alt="Logo Icon" src="openlogo.svg" width={30} height={30} />
        <h4>Openlogo</h4>
      </div>
      <div className={styles["footer-items"]}>
        {footerItems.map((item) => (
          <a
            key={item.name}
            className={styles["footer-item"]}
            href={item.url}
          >
            {item.title}
          </a>
        ))}
      </div>
      <div className={styles["footer-copyright"]}>
        © Openlogo 2024 |&nbsp;
        <a
          href="https://team.shiksha"
          target="_blank"
          rel="noopener noreferrer"
          className={styles["footer-powered"]}
        >
          Powered by TeamShiksa
        </a>
      </div>
    </footer>
  );
}

export default Footer;
