import Link from 'next/link';

const Header: React.FC = () => {
  return ( //Yes, I shamelessly stole the header from the labs. Yes, I regret not checking what bootstrap can do...
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
      </nav>
    </header>
  );
};

export default Header;
