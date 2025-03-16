import React from "react";
import "../style/footer.css";
import { OtherLink, PageLink, SocialLinks } from "./FooterList";

const Footer: React.FC = () => {
  return (
    <div className="text-center text-lg-start bg-body-tertiary text-muted">
      {/* Social Media Links */}
      <div className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom align-items-center">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>
        <div>
          <ul className="navbar-nav d-flex flex-row list-unstyled m-0">
            {SocialLinks.map((item, index) => (
              <li key={index} className="me-3">
                <a className="nav-link p-0" href={item.link}>
                  {item.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Main Content */}
      <div className="container text-center text-md-start mt-5">
        <div className="row d-flex justify-content-between align-items-start">
          {/* Company Info */}
          <div className="col-md-2 col-lg-2 col-xl-2 mb-4">
            <h6 className="text-uppercase fw-bold mb-4">
              <i className="fas fa-gem me-2"></i>Company Name
            </h6>
            <p>
              Organize your content using rows and columns. Lorem ipsum dolor
              sit amet, consectetur.
            </p>
          </div>

          {/* Pages Links */}
          <div className="col-md-2 col-lg-2 col-xl-2 mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Pages</h6>
            <ul className="navbar-nav icon-link-hover me-auto px-0">
              {PageLink.map((item, index) => (
                <li className="nav-item" key={index}>
                  <a className="nav-link px-0" href={item.link}>
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div className="col-md-2 col-lg-2 col-xl-2 mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Useful Links</h6>
            <ul className="navbar-nav icon-link-hover me-auto px-0">
              {OtherLink.map((item, index) => (
                <li className="nav-item" key={index}>
                  <a className="nav-link px-0" href={item.link}>
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-2 col-lg-2 col-xl-2 mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
            <p>
              <i className="fa fa-home me-2"></i> New York, NY 10012
            </p>
            <p>
              <i className="fa fa-envelope me-2"></i> info@example.com
            </p>
            <p>
              <i className="fa fa-phone me-2"></i> +01 234 567 88
            </p>
            <p>
              <i className="fa fa-print me-2"></i> +01 234 567 89
            </p>
          </div>

          {/* Newsletter Subscription */}
          <div className="col-md-3 col-lg-3 col-xl-3 mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Newsletter</h6>
            <p>Subscribe for weekly news, updates, and exclusive offers.</p>
            <form action="#" className="d-flex">
              <input
                type="email"
                className="form-control me-2"
                placeholder="Your email"
                required
              />
              <button type="submit" className="btn btn-primary">
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
