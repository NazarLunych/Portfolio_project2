import {menu} from '@/common/staticData/headerMenu';
import Link from 'next/link';
import styles from './Header.module.scss';
import Routes from '@/config/routes';
import AccountIcon from '../../../assets/icons/account-icon.svg';
import AccountIconWhite from '../../../assets/icons/account-icon-white.svg';
import ShopIcon from '../../../assets/icons/shop-icon.svg';
import ShopIconWhite from '../../../assets/icons/shop-icon-white.svg';
import ArrowBottom from '../../../assets/icons/arrow-bottom.svg';
import Image from 'next/image';
import clsx from 'clsx';
import {useEffect, useState} from 'react';
import MenuIcon from '../../../assets/icons/burger.svg';
import CloseIcon from '../../../assets/icons/close.svg';
import useResponsive from '../../../hooks/useResponsive';

type State = {
  isOpenMobMenu: boolean;
  isOpenSubMenu: boolean;
};

const accountBtns = (accountIcon: string, shopIcon: string) => (
  <>
    <button onClick={() => alert('Click')} className={styles.iconBtn}>
      <Image src={accountIcon} alt="Account icon" />
    </button>{' '}
    <button onClick={() => alert('Click')} className={styles.iconBtn}>
      <Image src={shopIcon} alt="Shop icon" />
    </button>
  </>
);

export default function Header(): JSX.Element {
  const {xl} = useResponsive();
  const [{isOpenMobMenu, isOpenSubMenu}, setState] = useState<State>({
    isOpenMobMenu: false,
    isOpenSubMenu: false,
  });

  useEffect(() => {
    if (isOpenMobMenu) {
      document.body.style.overflow = 'hidden';
      return;
    }

    document.body.style.overflow = 'scroll';
  }, [isOpenMobMenu]);

  const handleBtnClick = (propName: 'isOpenMobMenu' | 'isOpenSubMenu', value: boolean) => {
    setState((prevState) => ({...prevState, [propName]: value}));
  };

  return (
    <header className={clsx('container', isOpenMobMenu && styles.activeMenuHeader, styles.header)}>
      <Link href={Routes.Home}>
        <h4 className={styles.logo}>Logo Here</h4>
      </Link>

      {xl ? (
        <div className={styles.headerMenuWrapper}>
          <nav className={styles.nav}>
            {menu.map(({name, url, subMenu}) => {
              if (subMenu) {
                return (
                  <div className={styles.subMenuBtnWrapper} key={name}>
                    <button
                      className={styles.menuItem}
                      onClick={() => handleBtnClick('isOpenSubMenu', !isOpenSubMenu)}
                    >
                      {name}
                      <Image
                        src={ArrowBottom}
                        alt="Arrow bottom"
                        className={clsx(isOpenSubMenu && styles.arrowIconTop, styles.arrowIcon)}
                      />
                    </button>
                    {isOpenSubMenu && (
                      <div className={styles.subMenu}>
                        {subMenu.map((el, index) => (
                          <button
                            key={index}
                            onClick={(e) => alert((e.target as HTMLElement).textContent)}
                          >
                            {el}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link href={url} key={name} className={styles.menuItem}>
                  {name}
                </Link>
              );
            })}
          </nav>
          {accountBtns(AccountIcon, ShopIcon)}
        </div>
      ) : (
        <>
          <button onClick={() => handleBtnClick('isOpenMobMenu', !isOpenMobMenu)}>
            <Image src={isOpenMobMenu ? CloseIcon : MenuIcon} alt="Menu state icon" />
          </button>

          {isOpenMobMenu && (
            <aside className={styles.asideMenu}>
              <nav className={clsx('container', styles.asideMenuList)}>
                {menu.map(({name, url, subMenu}) => (
                  <Link href={url} key={name} className={styles.mobMenuItem}>
                    {name}
                  </Link>
                ))}
              </nav>

              <div className={styles.mobAccountBtns}>
                {accountBtns(AccountIconWhite, ShopIconWhite)}
              </div>
            </aside>
          )}
        </>
      )}
    </header>
  );
}
