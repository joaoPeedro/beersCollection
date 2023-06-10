"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./styles/navBar.module.scss";
import { APP_ROUTES } from "../../constants/appRoutes";

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav className={styles.containerNav}>
      <ul>
        {Object.keys(APP_ROUTES).map((key, idx) => {
          const keyValue = key as keyof typeof APP_ROUTES;

          const isActive = pathname === APP_ROUTES[keyValue].path;

          return (
            <li key={idx} className={isActive ? styles.activeNavItem : ""}>
              <Link className={styles.navLink} href={APP_ROUTES[keyValue].path}>
                {APP_ROUTES[keyValue].text}
                {APP_ROUTES[keyValue].icon}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
