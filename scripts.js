document.addEventListener('DOMContentLoaded', () => {
    const API = {
        fetchData: async () => {
            try {
                const response = await fetch('data/sections.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return await response.json();
            } catch (error) {
                console.error('Failed to fetch data:', error);
                return null;
            }
        }
    };

    const UI = {
        init: async () => {
            const data = await API.fetchData();
            if (!data) {
                document.body.innerHTML = '<p style="text-align:center; padding-top: 50px;">Failed to load portfolio data. Please try again later.</p>';
                return;
            }

            UI.renderNavbar();
            UI.renderHero(data.hero);
            UI.renderAbout(data.about);
            UI.renderSections(data.sections);
            UI.renderGallery(data.gallery);
            UI.renderAchievements(data.achievements);
            UI.renderCV(data.cv);
            UI.renderContact(data.contact);
            UI.renderFooter(data.contact);
            UI.initEventListeners();
            UI.initHeroCarousel();
            UI.initAnimations();
        },

        renderNavbar: () => {
            const navbar = document.getElementById('navbar');
            navbar.innerHTML = `
                <div class="nav-center">
                    <div class="nav-links">
                        <a href="#about" onclick="UI.scrollTo('about', event)">About</a>
                        <a href="#sections" onclick="UI.scrollTo('sections', event)">Skills</a>
                        <a href="#gallery" onclick="UI.scrollTo('gallery', event)">Gallery</a>
                        <a href="#contact" onclick="UI.scrollTo('contact', event)">Contact</a>
                    </div>
                    <div class="hamburger" onclick="UI.toggleMenu()">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            `;
        },

        renderHero: (heroData) => {
            const hero = document.getElementById('hero');
            hero.innerHTML = `
                <div class="hero-bg hero-bg1"></div>
                <div class="hero-bg hero-bg2"></div>
                <div class="overlay"></div>
                <img src="assets/images/ChatGPT Image Dec 6, 2025, 08_21_24 PM.png" alt="" class="profile-pic">
                <h1>Zachariah Nyatuga Manani</h1>
                <div class="typewriter-container">
                    <span id="typewriter"></span>
                </div>
            `;
            UI.initTypewriter(['Tech', 'Medicine', 'Humanities', 'Graphic Design']);
        },

        renderAbout: (aboutData) => {
            const about = document.getElementById('about');
            about.innerHTML = `
                <h2>${aboutData.title}</h2>
                <blockquote>
                    <p>"${aboutData.content}"</p>
                </blockquote>
            `;
        },

        renderSections: (sectionsData) => {
            const sectionsContainer = document.getElementById('sections');
            const getSkillIcon = (skill) => {
                const icons = {
                    'Python': 'fab fa-python',
                    'MATLAB': 'fas fa-chart-line',
                    'JavaScript': 'fab fa-js-square',
                    'C++': 'fas fa-code',
                    'MySQL': 'fas fa-database',
                    'Java': 'fab fa-java',
                    'PHP': 'fab fa-php',
                    'Arduino': 'fas fa-microchip',
                    'WordPress': 'fab fa-wordpress',
                    'Shopify': 'fas fa-shopping-cart',
                    'Django': 'fas fa-code',
                    'MongoDB': 'fas fa-database',
                    'Tailwind': 'fas fa-palette',
                    'Rust': 'fas fa-cogs',
                    'HTML5': 'fab fa-html5',
                    'CSS3': 'fab fa-css3',
                    'React': 'fab fa-react',
                    'Next.js': 'fab fa-react',
                    'Vue.js': 'fab fa-vuejs',
                    'Flask': 'fas fa-flask',
                    'Flutter': 'fas fa-mobile',
                    'Streamlit': 'fas fa-chart-line',
                    'TensorFlow': 'fas fa-brain',
                    'ICP': 'fas fa-link',
                    'Burn': 'fas fa-fire',
                    'Tauri': 'fas fa-window-restore',
                    'PostgreSQL': 'fas fa-database',
                    'Docker': 'fab fa-docker',
                    'Kubernetes': 'fas fa-server',
                    'AWS': 'fab fa-aws',
                    'Azure': 'fas fa-cloud',
                    'Google Cloud': 'fab fa-google',
                    'IBM Cloud': 'fas fa-cloud',
                    'Git': 'fab fa-git',
                    'GitHub': 'fab fa-github',
                    'VS Code': 'fas fa-code',
                    'Linux': 'fab fa-linux',
                    'JIRA': 'fas fa-tasks',
                    'Confluence': 'fas fa-file-alt',
                    'Apache Kafka': 'fas fa-stream',
                    'Apache Spark': 'fas fa-bolt',
                    'QGIS': 'fas fa-map',
                    'Pandas': 'fas fa-table',
                    'Figma': 'fab fa-figma',
                    'Excel': 'fas fa-file-excel'
                };
                return icons[skill] || 'fas fa-star';
            };
            sectionsData.forEach(section => {
                const sectionEl = document.createElement('div');
                sectionEl.id = section.id;
                sectionEl.className = 'container';
                let skillsHTML = section.skills.length > 0 ? `<ul>${section.skills.map(skill => `<li><i class="${getSkillIcon(skill)}"></i> ${skill}</li>`).join('')}</ul>` : '';
                let certHTML = section.certificates.length > 0 ? `<ul>${section.certificates.map(cert => `<li><a href="assets/certificates/${cert.file}" target="_blank">${cert.name}</a></li>`).join('')}</ul>` : '';
                let projHTML = section.projects.length > 0 ? `<ul>${section.projects.map(proj => `<li>${proj}</li>`).join('')}</ul>` : '';

                sectionEl.innerHTML = `
                    <h2>${section.title}</h2>
                    <div class="section-grid">
                        <div class="card">
                            <h3>Skills</h3>
                            ${skillsHTML}
                        </div>
                        <div class="card">
                            <h3>Certificates</h3>
                            ${certHTML}
                        </div>
                        <div class="card">
                            <h3>Projects</h3>
                            ${projHTML}
                        </div>
                    </div>
                `;
                sectionsContainer.appendChild(sectionEl);
            });
        },

        renderGallery: (galleryData) => {
            const gallery = document.getElementById('gallery');
            gallery.innerHTML = `
                <h2>Gallery</h2>
                <div class="gallery-grid">
                    ${galleryData.map(img => `<div class="gallery-item"><img src="assets/${img}" alt="Gallery image"></div>`).join('')}
                </div>
            `;
        },

        renderAchievements: (achievementsData) => {
            const achievements = document.getElementById('achievements');
            achievements.innerHTML = `
                <h2>Achievements & Awards</h2>
                <ul>
                    ${achievementsData.map(ach => `<li>🏆 ${ach}</li>`).join('')}
                </ul>
            `;
        },

        renderCV: (cvFile) => {
            const cv = document.getElementById('cv');
            cv.innerHTML = `
                <h2>My CV</h2>
                <div class="cv-card">
                    <i class="fas fa-file-pdf"></i>
                    <h3>Download My CV</h3>
                    <a href="assets/pdf/${cvFile}" download class="btn">Download CV</a>
                </div>
            `;
        },

        renderContact: (contactData) => {
            const contact = document.getElementById('contact');
            contact.innerHTML = `
                <h2>Contact Me</h2>
                <p><i class="fas fa-envelope"></i> <a href="mailto:${contactData.email}">${contactData.email}</a></p>
                <p><a href="https://wa.me/${contactData.phone.replace('+','')}" target="_blank"><i class="fab fa-whatsapp"></i> ${contactData.phone}</a></p>
                <form id="subscribeForm">
                    <input type="email" id="subEmail" placeholder="Your email" required />
                    <button type="submit" class="btn">Subscribe</button>
                </form>
                <div id="subscribeMsg"></div>
            `;
        },

        renderFooter: (contactData) => {
            const footer = document.getElementById('footer');
            footer.innerHTML = `
                <div class="social-links">
                    <a href="${contactData.social.linkedin}" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                    <a href="${contactData.social.github}" aria-label="GitHub"><i class="fab fa-github"></i></a>
                    <a href="${contactData.social.twitter}" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                </div>
                <p>© ${new Date().getFullYear()} Zachariah Manani. All rights reserved.</p>
            `;
        },

        initEventListeners: () => {
            // Gallery Lightbox
            const galleryItems = document.querySelectorAll('.gallery-item img');
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            const closeLightbox = document.querySelector('.close-lightbox');

            galleryItems.forEach(item => {
                item.addEventListener('click', () => {
                    lightbox.style.display = 'flex';
                    lightboxImg.src = item.src;
                });
            });

            closeLightbox.addEventListener('click', () => {
                lightbox.style.display = 'none';
            });

            lightbox.addEventListener('click', (e) => {
                if (e.target !== lightboxImg) {
                    lightbox.style.display = 'none';
                }
            });

            // Subscription Form
            const subscribeForm = document.getElementById('subscribeForm');
            subscribeForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = document.getElementById('subEmail').value;
                const msgDiv = document.getElementById('subscribeMsg');
                
                try {
                    const formData = new FormData();
                    formData.append('email', email);

                    const response = await fetch('/api/subscribe', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email })
                    });

                    const result = await response.json();
                    msgDiv.textContent = result.message;
                } catch (error) {
                    msgDiv.textContent = 'Subscription failed. Please try again.';
                }
            });
        },

        initThemeSwitcher: () => {
            const themeSwitcher = document.querySelector('.theme-switcher');
            themeSwitcher.addEventListener('click', () => {
                document.documentElement.classList.toggle('dark');
                themeSwitcher.innerHTML = document.documentElement.classList.contains('dark') ? '<i class="fas fa-sun" style="color: #003161;"></i>' : '<i class="fas fa-moon" style="color: #003161;"></i>';
            });
        },

        initTypewriter: (words) => {
            const typewriterEl = document.getElementById('typewriter');
            let wordIndex = 0;
            let charIndex = 0;
            let isDeleting = false;

            function type() {
                const currentWord = words[wordIndex];
                if (isDeleting) {
                    typewriterEl.textContent = currentWord.substring(0, charIndex--);
                } else {
                    typewriterEl.textContent = currentWord.substring(0, charIndex++);
                }

                if (!isDeleting && charIndex === currentWord.length) {
                    setTimeout(() => isDeleting = true, 2000);
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                }

                setTimeout(type, isDeleting ? 100 : 200);
            }
            type();
        },

        initHeroCarousel: () => {
            const heroBg1 = document.querySelector('.hero-bg1');
            const heroBg2 = document.querySelector('.hero-bg2');
            const media = [
                'assets/images/pexels-ivan-s-7621352.jpg',
                'assets/images/pexels-kevin-ku-92347-577585.jpg',
                'assets/images/pexels-pixabay-38519 (1).jpg',
                'assets/images/pexels-pixabay-270408.jpg',
                'assets/images/2278095-hd_1920_1080_30fps.mp4',
                'assets/images/4549682-hd_1920_1080_30fps.mp4'
            ];
            let currentMedia = 0;
            let activeBg = heroBg1;
            let inactiveBg = heroBg2;

            function setMedia(bg, mediaUrl) {
                if (mediaUrl.endsWith('.mp4')) {
                    bg.innerHTML = `<video autoplay muted loop class="bg-video"><source src="${mediaUrl}" type="video/mp4"></video>`;
                    bg.style.backgroundImage = '';
                } else {
                    bg.innerHTML = '';
                    bg.style.backgroundImage = `url(${mediaUrl})`;
                }
            }

            function changeMedia() {
                // Set the inactive bg with next media
                setMedia(inactiveBg, media[currentMedia]);
                inactiveBg.style.opacity = '0';
                inactiveBg.classList.add('active');

                // Fade out active, fade in inactive
                activeBg.style.transition = 'opacity 1s ease';
                inactiveBg.style.transition = 'opacity 1s ease';
                activeBg.style.opacity = '0';
                inactiveBg.style.opacity = '1';

                // Swap after transition
                setTimeout(() => {
                    activeBg.classList.remove('active');
                    activeBg.style.opacity = '1';
                    [activeBg, inactiveBg] = [inactiveBg, activeBg];
                    currentMedia = (currentMedia + 1) % media.length;
                }, 1000);
            }

            // Initial setup
            setMedia(activeBg, media[0]);
            activeBg.style.opacity = '1';
            activeBg.classList.add('active');
            inactiveBg.style.opacity = '0';

            setInterval(changeMedia, 5000);
        },

        toggleMenu: () => {
            const navLinks = document.querySelector('.nav-links');
            const hamburger = document.querySelector('.hamburger');
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        },

        initAnimations: () => {
            setTimeout(() => {
                document.querySelectorAll('.container').forEach((el, index) => {
                    setTimeout(() => el.classList.add('fade-in'), index * 200);
                });
            }, 100);
        },

        scrollTo: (id, event) => {
            if (event) event.preventDefault();
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    UI.init();
});