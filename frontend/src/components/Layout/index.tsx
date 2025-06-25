import { createRef, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useMe } from '../../lib/ctx';
import {
  getAllIdeasRoute,
  getEditUserRoute,
  getNewIdeaRoute,
  getSignInRoute,
  getSignOutRoute,
  getSignUpRoute,
} from '../../lib/routes';
import css from './index.module.scss';

export const layoutContentRef = createRef<HTMLDivElement>();
const navRef = createRef<HTMLDivElement>();
export const Layout = () => {
  const me = useMe();
  const [navHeight, setNavHeight] = useState(150);
  useEffect(() => {
    const updateHeight = () => {
      if (navRef.current) {
        if (window.innerWidth < 900) {
          setNavHeight(navRef.current.offsetHeight);
        } else {
          setNavHeight(0);
        }
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  });

  return (
    <div className={css.layout}>
      <div className={css.navigation} ref={navRef}>
        <div className={css.logo}>IdeaNick</div>
        <ul className={css.menu}>
          <li className={css.item}>
            <Link className={css.link} to={getAllIdeasRoute()}>
              All Ideas
            </Link>
          </li>
          {me ? (
            <>
              <li className={css.item}>
                <Link className={css.link} to={getNewIdeaRoute()}>
                  Add Idea
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={getEditUserRoute()}>
                  Edit Profile
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={getSignOutRoute()}>
                  Log Out ({me.name})
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className={css.item}>
                <Link className={css.link} to={getSignUpRoute()}>
                  Sign Up
                </Link>
              </li>
              <li className={css.item}>
                <Link className={css.link} to={getSignInRoute()}>
                  Sign In
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className={css.content} ref={layoutContentRef}>
        <div aria-hidden="true" style={{ height: `${navHeight}px`, width: '1px' }} />
        <Outlet />
      </div>
    </div>
  );
};
