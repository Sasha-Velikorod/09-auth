import css from '../Header/Header.module.css';
import Link from 'next/link';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

const Header = () => {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <div>
          <ul className={css.navigation}>
            <li>
              <Link href="/">Home</Link>
            </li>

            <AuthNavigation />
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
