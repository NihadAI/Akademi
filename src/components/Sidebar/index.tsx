/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink, useLocation } from 'react-router-dom';
import { ArrowLeft, Calendar, HandCoins, Home, User, User2, Users, Utensils } from 'lucide-react';
import Logo from '../../images/brand/logo.svg'
import { useEffect, useRef } from 'react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);


  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-purple duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-center gap-2 px-6 py-5.5">
        <NavLink to="/" className='flex flex-row items-center justify-between'>
          <img src={Logo} alt="Akademi" className='mr-3'/>
          <h1 className='font-bold text-white text-4xl capitalize'>akademi</h1>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <ArrowLeft/>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear ">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-2 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              <NavLink
                to="/"
                className={`group relative flex items-center gap-2.5 py-3 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-white dark:hover:bg-slate-700 rounded-lg  hover:text-purple ${
                  pathname===('/') || pathname.includes('/dashboard') &&
                  'bg-white text-purple dark:bg-slate-700'
                }`}
              >
                <Home />
                Dashboard
              </NavLink>
              {/* <!-- Dropdown Menu End --> */}
              {/* <!-- Menu Item Dashboard --> */}

              {/* <!-- Menu Item Calendar --> */}
              <li>
                <NavLink
                  to="/students"
                  className={`group relative flex items-center gap-2.5 py-3 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-white dark:hover:bg-slate-700 rounded-lg  hover:text-purple ${
                    pathname.includes('students') &&
                    'bg-white text-purple dark:bg-slate-700'
                  }`}
                >
                  <Users/>
                  Students
                </NavLink>
              </li>
              {/* <!-- Menu Item Calendar --> */}

              {/* <!-- Menu Item Profile --> */}
              <li>
                <NavLink
                  to="/teachers"
                  className={`group relative flex items-center gap-2.5 py-3 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-white dark:hover:bg-slate-700 rounded-lg  hover:text-purple ${
                    pathname.includes('teachers') && 'bg-white text-purple dark:bg-slate-700'
                  }`}
                >
                  <User/>
                  Teachers
                </NavLink>
              </li>
              {/* <!-- Menu Item Profile --> */}

              {/* <!-- Menu Item Forms --> */}
              <li>
                <NavLink to="/events" className={`group relative flex items-center gap-2.5 py-3 px-4 font-medium
                  text-bodydark1 duration-300 ease-in-out hover:bg-white dark:hover:bg-slate-700 rounded-lg hover:text-purple ${
                  pathname.includes('events') && 'bg-white text-purple dark:bg-slate-700' }`}>
                  <Calendar />
                  Events
                </NavLink>
              </li>
              {/* <!-- Menu Item Forms --> */}

              {/* <!-- Menu Item Tables --> */}
              <li>
                <NavLink
                  to="/finance"
                  className={`group relative flex items-center gap-2.5 py-3 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-white dark:hover:bg-slate-700 rounded-lg  hover:text-purple ${
                    pathname.includes('finance') && 'bg-white text-purple dark:bg-slate-700'
                  }`}
                >
                  <HandCoins/>
                  Finance
                </NavLink>
              </li>
              {/* <!-- Menu Item Tables --> */}

              {/* <!-- Menu Item Settings --> */}
              <li>
                <NavLink
                  to="/food"
                  className={`group relative flex items-center gap-2.5 py-3 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-white dark:hover:bg-slate-700 rounded-lg  hover:text-purple ${
                    pathname.includes('food') &&
                    'bg-white text-purple dark:bg-meta-4'
                  }`}
                >
                  <Utensils/>
                  Food
                </NavLink>
              </li>
              {/* <!-- Menu Item Settings --> */}

              {/* <!-- Menu Item Settings --> */}
              <li>
                <NavLink
                  to="/user"
                  className={`group relative flex items-center gap-2.5 py-3 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-white dark:hover:bg-slate-700 rounded-lg  hover:text-purple ${
                    pathname.includes('user') &&
                    'bg-white text-purple dark:bg-slate-700'
                  }`}
                >
                  <User2/>
                  User
                </NavLink>
              </li>
              {/* <!-- Menu Item Settings --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
