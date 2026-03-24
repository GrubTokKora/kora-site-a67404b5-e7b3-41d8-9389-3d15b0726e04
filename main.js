        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, { passive: true });

        // Scroll reveal animation
        const revealElements = document.querySelectorAll('.reveal');

        const revealOnScroll = () => {
            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;

                if (elementTop < windowHeight - 100) {
                    element.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', revealOnScroll, { passive: true });
        window.addEventListener('load', revealOnScroll);

        // Logo click: smooth scroll to top without changing URL
        const logoLink = document.querySelector('.logo-link');
        if (logoLink) {
            logoLink.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // Smooth scroll for same-page anchor links (skip bare "#")
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (!href || href === '#' || href.length < 2) return;
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Mobile menu toggle (basic)
        const mobileMenu = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');

        mobileMenu.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.background = 'white';
                navLinks.style.flexDirection = 'column';
                navLinks.style.padding = '2rem';
                navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
            }
        });

        // Menu category switching
        const menuCategories = document.querySelector('.menu-categories');
        if (menuCategories) {
            const menuContents = document.querySelectorAll('.menu-category-content');
            menuCategories.addEventListener('click', (e) => {
                const link = e.target.closest('a');
                if (!link) return;
                
                e.preventDefault();
                const categoryItem = link.parentElement;
                if (categoryItem.classList.contains('active')) return;

                const targetCategory = categoryItem.dataset.category;

                // Update active link
                const currentActive = menuCategories.querySelector('li.active');
                if(currentActive) currentActive.classList.remove('active');
                categoryItem.classList.add('active');

                // Update active content
                menuContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === `menu-${targetCategory}`) {
                        content.classList.add('active');
                    }
                });
            });
        }
