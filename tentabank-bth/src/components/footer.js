import React from "react";

const Footer = () => {
const link = "https://eggovich.github.io/"
return (
    <div className="footer-basic">
    <footer>
        <div className="social"><a href="#"><i className="icon ion-social-instagram"></i></a><a href="#"><i className="icon ion-social-snapchat"></i></a><a href="#"><i className="icon ion-social-twitter"></i></a><a href="#"><i className="icon ion-social-facebook"></i></a></div>
        <ul className="list-inline">
            <li className="list-inline-item"><a href={link+"tentabank"}>Hem</a></li>
            <li className="list-inline-item"><a href="/browse">Tentabank</a></li>
            <li className="list-inline-item"><a href={link+"upload"}>Ladda upp</a></li>
            <li className="list-inline-item"><a href="/about">Om oss</a></li>
            <li className="list-inline-item"><a href="/profile">Min sida</a></li>
        </ul>
        <p className="copyright">TentaBanken ©</p>
    </footer>
</div>
);
};

export default Footer;