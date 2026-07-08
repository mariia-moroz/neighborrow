import { Session } from "next-auth";

const Header = ({ session }: { session: Session }) => {
  return (
    <header className='admin-header'>
      <div>
        <h2 className='text-2xl font-bold'>Welcome, {session?.user?.name}!</h2>
        <p className='text-base text-muted-special-text'>Monitor all your users and items here</p>
      </div>

      <p>Search</p>
    </header>
  );
};

export default Header;
