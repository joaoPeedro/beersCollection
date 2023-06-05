// 'use client';

// import { usePathname } from 'next/navigation';
import Link from "next/link";

export function NavBar() {
  // !#TODO  const pathname = usePathname();

  return (
    <nav>
      <ul>
        <li>
          <Link href={`/beers`}> Beers Collection</Link>
        </li>
        <li>
          <Link href={`/favorite-beers`}> Favorite Beers</Link>
        </li>
      </ul>
    </nav>
  );
}
