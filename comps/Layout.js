// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// Imports / Libraries
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
import Navbar from '../comps/Navbar';
import Footer from '../comps/Footer';

// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// App Layout
// HIGH LEVEL
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
const Layout = ({ children }) => {
  return (
    <div className="content">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
