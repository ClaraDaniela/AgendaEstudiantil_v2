const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <img 
          src="https://edunpaz.unpaz.edu.ar/OMP/public/site/images/userbiblio/unpaz_horizontal-transparente_(400X139px).png" 
          alt="UNPAZ Logo" 
          className="footer-logo"
        />
        <p>Trabajo de Campo 2025</p>
        <div className="footer-team">
          <span>Equipo:</span>
          <ul>
            <li>Barbara Carrizo</li>
            <li>Omar Brondo</li>
            <li>Karen Micaela Pelozo</li>
            <li>Pamela Chaparro</li>
            <li>Clara Cantarino</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;