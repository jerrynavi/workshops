import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

export default function Layout() {
  return (
    <div className="w-full min-h-full flex">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
