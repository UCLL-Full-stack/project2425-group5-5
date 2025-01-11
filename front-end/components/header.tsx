import { User } from '@types';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Header: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    setLoggedInUser(JSON.parse(localStorage.getItem("loggedInUser")!));
  }, []);

  const handleClick = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  return ( //Yes, I shamelessly stole the header from the labs. Yes, I regret not checking what tailwindcss can do...
    <header className="p-2 border-bottom bg-success">
      <a className="fs-2 d-flex justify-content-center mb-2 text-white text-decoration-none">
        {' '}
        BugSquashr
      </a>
      <nav className="nav justify-content-center">
        <Link href="/" className="nav-link px-4 fs-5 text-white-50">
          Home
        </Link>
        <Link href="/login" className="nav-link px-4 fs-5 text-white-50">
          Login
        </Link>
        <Link href="/user" className="nav-link px-4 fs-5 text-white-50">
          user info
        </Link>
        {loggedInUser && (
          <a
              href="/login"
              onClick={handleClick}
              className="nav-link px-4 fs-5 text-white-50"
          >
              logout
          </a>
        )}
        {loggedInUser && (
          <div className="nav-link px-4 fs-5 text-white-50">
              welcome, {loggedInUser.username}!
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
