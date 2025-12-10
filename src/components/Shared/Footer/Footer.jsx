import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Logo from '../Logo';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const platformName = "eTuitionBd";

    const quickLinks = [
        { name: "Home", href: "/" },
        { name: "Tuitions", href: "/tuitions" },
        { name: "Tutors", href: "/tutors" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    const socialLinks = [
        { icon: FaFacebookF, href: "#", label: "Facebook" },
        { icon: FaXTwitter, href: "#", label: "Twitter/X" },
        { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
        { icon: FaGithub, href: "#", label: "GitHub" },
    ];

    return (
        <>
            <footer className="footer p-10 bg-base-200 text-base-content border-t border-base-300 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                <aside className="lg:col-span-2">
                    <Logo className="h-10" />
                    <p className="max-w-md mt-4 text-sm">
                        A complete platform connecting students with qualified tutors, enabling seamless tuition management and communication.
                    </p>
                </aside>

                <nav>
                    <h6 className="footer-title">Quick Links</h6>
                    {quickLinks.map((link, idx) => (
                        <a key={idx} href={link.href} className="link link-hover block">
                            {link.name}
                        </a>
                    ))}
                </nav>

                <nav>
                    <h6 className="footer-title">Contact Us</h6>
                    <p className="text-sm">Email: nahidali.dev@gmail.com</p>
                    <p className="text-sm">Phone: +8801314441473</p>
                    <p className="text-sm mb-4">Address: Dhaka, Bangladesh</p>

                    <h6 className="text-sm font-bold opacity-70 mb-2">Connect:</h6>
                    <div className="grid grid-flow-col gap-4">
                        {socialLinks.map((item, idx) => (
                            <a
                                key={idx}
                                href={item.href}
                                aria-label={item.label}
                                className="text-2xl hover:text-primary transition-colors"
                            >
                                <item.icon />
                            </a>
                        ))}
                    </div>
                </nav>
            </footer>

            <div className="footer footer-center p-4 bg-base-300 text-base-content text-sm">
                <p>
                    © {currentYear} {platformName} — All rights reserved.
                </p>
            </div>
        </>
    );
};

export default Footer;
