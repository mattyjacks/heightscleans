function loadHeader() {
    const headerHTML = `
        <nav class="navbar">
            <div class="container">
                <div class="nav-wrapper">
                    <a href="index.html" class="logo">
                        <span class="logo-icon">✨</span>
                        <span class="logo-text">Heights Cleans</span>
                    </a>
                    <button class="mobile-menu-toggle" aria-label="Toggle menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <ul class="nav-links">
                        <li><a href="index.html" data-page="index">Home</a></li>
                        <li><a href="contact.html" data-page="contact">Contact</a></li>
                        <li><a href="tel:8152179898" class="nav-phone"><span class="phone-icon">📞</span> (815) 217-9898</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    `;
    
    document.getElementById('header-placeholder').innerHTML = headerHTML;
    
    const currentPage = document.body.getAttribute('data-page');
    if (currentPage) {
        const links = document.querySelectorAll('.nav-links a[data-page]');
        links.forEach(link => {
            if (link.getAttribute('data-page') === currentPage) {
                link.classList.add('active');
            }
        });
    }
}

function loadFooter() {
    const footerHTML = `
        <footer>
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>Heights Cleans</h3>
                        <p>Professional cleaning services for Arlington Heights and surrounding areas.</p>
                        <div class="footer-social">
                            <p><strong>Licensed & Insured</strong></p>
                        </div>
                    </div>
                    <div class="footer-section">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li><a href="contact.html">Contact Us</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h3>Services</h3>
                        <ul>
                            <li>Residential Cleaning</li>
                            <li>Commercial Cleaning</li>
                            <li>Deep Cleaning</li>
                            <li>Move In/Out Cleaning</li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h3>Contact</h3>
                        <p>1514 W Lillian Ave<br>Arlington Heights, IL 60004</p>
                        <p>Email: <a href="mailto:heightscleans54@gmail.com">heightscleans54@gmail.com</a></p>
                        <p>Phone: <a href="tel:8152179898">(815) 217-9898</a></p>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; ${new Date().getFullYear()} Heights Cleans. All rights reserved.</p>
                </div>
            </div>
        </footer>
    `;
    
    document.getElementById('footer-placeholder').innerHTML = footerHTML;
}

document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();
});
