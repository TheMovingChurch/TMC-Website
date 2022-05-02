import Alert from './alert';
import Header from './header';
import Footer from './footer';
import Meta from './meta';

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <Header />
      <div className="min-h-[70vh]">
        <Alert preview={preview} />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
