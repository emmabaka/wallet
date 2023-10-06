import Link from "next/link";
import { HomeSVG, StatsSVG, WalletSVG, SettingsSVG } from "../svgs/svgs.js";
import s from "./Navigation.module.scss";

const Navigation = () => {
  return (
    <footer className={s.footer}>
      <div className="container">
        <nav className={s.nav}>
          <ul className={s.navList}>
            <li>
              <Link className={s.link} href="/">
                <HomeSVG />
              </Link>
            </li>
            <li>
              <Link className={s.link} href="/statistic">
                <StatsSVG />
              </Link>
            </li>
            <li>
              <Link className={s.link} href="/wallet">
                <WalletSVG />
              </Link>
            </li>
            <li>
              <Link className={s.link} href="/settings">
                <SettingsSVG />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Navigation;
