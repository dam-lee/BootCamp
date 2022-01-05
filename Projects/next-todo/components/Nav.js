import Link from "next/link";
import NavStyle from "../styles/Nav.module.css";
const Nav = () => {
  return (
    <nav className={NavStyle.nav}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/todo">Todo</Link>
        </li>
        <li>
          <Link href="/mypage">Mypage</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
