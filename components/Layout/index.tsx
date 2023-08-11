import Header from './Header/Header';
import Footer from './Footer/Footer';
import {ReactNode} from 'react';

export default function Layout({children}: {children: ReactNode}): JSX.Element {
  // <-------- a generic layout component that we can reuse elsewhere with the header and footer
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
