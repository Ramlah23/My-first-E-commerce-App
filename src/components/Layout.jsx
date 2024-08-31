
import Header from './Layout/Header/Header';
import Footer from './Layout/footer/Footer';
import Main from './Layout/Main/Main';

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Main>
        {children}
      </Main>
      <Footer />
    </>
  );
};

export default Layout;