import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Container } from '../Container/Container';

import classes from './Header.module.css';

export const Header = () => {
  const currentPath = usePathname();
  return (
    <header className={classes.header}>
      <Container className={classes.container}>
        <div className={classes.logoContainer}>
          <Link href='/'>
            <img
              src='img/logo.svg'
              alt=''
            />
          </Link>
          <div className={classes.tag}>Beta</div>
        </div>
        <div className={classes.links}>
          <Link
            className={currentPath === '/' ? classes.active : ''}
            href='/'
          >
            Fargevelger
          </Link>
          <Link
            className={currentPath === '/testside' ? classes.active : ''}
            href='/testside'
          >
            Testside
          </Link>
          <Link
            className={currentPath === '/om-verktoyet' ? classes.active : ''}
            href='/om-verktoyet'
          >
            Om verktøyet
          </Link>
        </div>
      </Container>
    </header>
  );
};
