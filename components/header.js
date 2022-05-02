import Link from 'next/link';

export default function Header() {
  return (
    <nav className="flex flex-row justify-between items-center">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
        <Link href="/">
          <a className="hover:underline">The Moving Church Header</a>
        </Link>
        .
      </h2>
      <ul className="flex flex-row justify-around">
        <li className="mx-2 text-lg">
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li className="mx-2 text-lg">
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
