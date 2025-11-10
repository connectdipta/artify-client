const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-200 text-base-content p-6 mt-10">
      <aside>
        <p className="font-semibold">Artify © {new Date().getFullYear()} — All rights reserved.</p>
        <div className="flex gap-3">
          <a className="link link-hover" href="#">Contact</a>
          <a className="link link-hover" href="#">Instagram</a>
          <a className="link link-hover" href="#">X</a>
        </div>
      </aside>
    </footer>
  );
};

export default Footer;
