import { MoreSVG } from "../svgs/svgs";
import s from "./Card.module.scss";

const Card = () => {
  return (
    <div className={s.card}>
      <p className={s.title}>Total Balance</p>
      <p className={s.balance}>₴ 94,064.29</p>
      <p className={s.balance}>$ 2,548.00</p>
      <div className={s.more}>
        <MoreSVG />
      </div>
    </div>
  );
};

export default Card;
