document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggler Logic
    const mobileMenuToggler = document.getElementById('mobileMenuToggler');
    const megaMenu = document.getElementById('megaMenu');
    const overlay = document.getElementById('overlay');

    if(mobileMenuToggler) {
        mobileMenuToggler.addEventListener('click', () => {
             // Basic mobile toggle (will expand upon in later phases)
             document.querySelector('.mega-menu-wrapper').style.display = 
                  document.querySelector('.mega-menu-wrapper').style.display === 'block' ? 'none' : 'block';
        });
    }

    // Sticky Header
    const mainHeader = document.getElementById('mainHeader');
    const stickyOffset = mainHeader.offsetTop;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > stickyOffset) {
            mainHeader.classList.add('sticky');
        } else {
            mainHeader.classList.remove('sticky');
        }
    });
});
