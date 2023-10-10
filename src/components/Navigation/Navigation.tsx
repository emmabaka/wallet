import NavigationItem from "../NavigationItem/NavigationItem";
import { HomeSVG, StatsSVG, WalletSVG, SettingsSVG } from "../svgs/svgs.js";
import s from "./Navigation.module.scss";

const navList = [
  { href: "/", icon: HomeSVG },
  { href: "/statistic", icon: StatsSVG },
  { href: "/wallet", icon: WalletSVG },
  { href: "/settings", icon: SettingsSVG },
];

const Navigation = () => {
  return (
    <footer className={s.footer}>
      <div className="container">
        <nav className={s.nav}>
          <ul className={s.navList}>
            {navList.map(({ href, icon }, i) => (
              <NavigationItem key={i} href={href} Icon={icon} />
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Navigation;
