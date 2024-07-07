document.addEventListener('DOMContentLoaded', function() {
    console.log("Mobile version loaded.");

    const buttons = document.querySelectorAll('.nav-button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    function setupSlider(sliderId, dotsSelector) {
        let slideIndex = 0;
        let previousIndex = 0;
        const slider = document.getElementById(sliderId);
        const dots = document.querySelectorAll(dotsSelector);

        function showSlides(direction) {
            const slides = slider.querySelectorAll('.slide');
            const slideItems = slides[slideIndex].querySelectorAll('.slide-item');
            const prevSlideItems = slides[previousIndex].querySelectorAll('.slide-item');

            // ابتدا آیتم‌های اسلاید قبلی را محو می‌کنیم
            prevSlideItems.forEach((item, index) => {
                item.classList.remove('show', 'show-right', 'show-left');
                if (direction === 'left') {
                    item.classList.add('hide-left');
                } else {
                    item.classList.add('hide-right');
                }
            });

            // سپس آیتم‌های اسلاید فعلی را نمایش می‌دهیم
            slideItems.forEach((item, index) => {
                item.classList.remove('hide-left', 'hide-right');
                if (direction === 'left') {
                    setTimeout(() => {
                        item.classList.add('show', 'show-right');
                    }, index * 100); // افزایش تاخیر با توجه به ایندکس
                } else {
                    setTimeout(() => {
                        item.classList.add('show', 'show-left');
                    }, index * 100); // افزایش تاخیر با توجه به ایندکس
                }
            });

            previousIndex = slideIndex;

            const slidesContainer = slider.querySelector('.slides');
            slidesContainer.style.transform = `translateX(-${slideIndex * 100}%)`;

            // به‌روزرسانی دایره‌ها
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === slideIndex);
            });
        }

        let startX;

        slider.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        });

        slider.addEventListener('touchmove', function(e) {
            if (!startX) return;

            let endX = e.touches[0].clientX;
            let diff = startX - endX;

            if (diff > 50) {
                moveSlide(1, 'left');
                startX = null;
            } else if (diff < -50) {
                moveSlide(-1, 'right');
                startX = null;
            }
        });

        function moveSlide(n, direction) {
            const slides = slider.querySelectorAll('.slide');
            if ((slideIndex === 0 && n === -1) || (slideIndex === slides.length - 1 && n === 1)) {
                return; // جلوگیری از حرکت به سمت چپ در اولین اسلاید و به سمت راست در آخرین اسلاید
            }
            previousIndex = slideIndex;
            slideIndex += n;
            showSlides(direction);
        }

        showSlides(); // نمایش اولین اسلاید

        return moveSlide;
    }

    const moveSlider = setupSlider('slider', '.pagination .dot');
    const moveSliderNew = setupSlider('slider-new', '.pagination-new .dot');

    window.moveSlide = moveSlider;
    window.moveSlideNew = moveSliderNew;

    // برای نمایش عکس‌ها با انیمیشن
    const overlay = document.getElementById('overlay');
    let currentImage = null;

    function showImage(img) {
        document.body.style.overflow = 'hidden';
        currentImage = img;
        currentImage.style.opacity = 0;
        overlay.innerHTML = `<img src="${img.src}" alt="Expanded Image">`;
        overlay.style.display = 'flex';
        overlay.classList.remove('zoom-out');
    }

    function hideImage() {
        document.body.style.overflow = '';
        if (currentImage) {
            currentImage.style.opacity = 1;
        }

        overlay.classList.add('zoom-out');

        // جلوگیری از کلیک برای 0.5 ثانیه
        document.body.style.pointerEvents = 'none';
        setTimeout(() => {
            overlay.style.display = 'none';
            overlay.innerHTML = '';
            document.body.style.pointerEvents = 'auto';
        }, 500);
    }

    const images = document.querySelectorAll('.music-image, .website-image, .logo-image, .book-image');
    images.forEach(image => {
        image.addEventListener('click', () => {
            showImage(image);
        });
    });

    overlay.addEventListener('click', hideImage);
});

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.nav-button');
    const sections = {
        home: ['.side-container', '.portfolio', '.side-container.new'],
        'music covers': ['.music-covers'],
        'web designs': ['.website-container'],
        logos: ['.logos-container'],
        'book designs': ['.books-container']
    };

    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.0)';
    overlay.style.zIndex = '1000';
    overlay.style.display = 'none';
    document.body.appendChild(overlay);

    function disableInteraction() {
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            overlay.style.display = 'none';
            document.body.style.overflow = '';
        }, 700);
    }

    function hideAllSections() {
        return new Promise(resolve => {
            let totalSections = 0;
            let hiddenSections = 0;

            for (let key in sections) {
                sections[key].forEach(selector => {
                    document.querySelectorAll(selector).forEach(el => {
                        totalSections++;
                        el.classList.add('hide');
                        el.classList.remove('show');
                        setTimeout(() => {
                            el.style.display = 'none';
                            hiddenSections++;
                            if (hiddenSections === totalSections) {
                                resolve();
                            }
                        }, 500); // duration of the animation
                    });
                });
            }

            if (totalSections === 0) {
                resolve();
            }
        });
    }

    function showSection(sectionName) {
        hideAllSections().then(() => {
            setTimeout(() => {
                sections[sectionName].forEach(selector => {
                    document.querySelectorAll(selector).forEach(el => {
                        if (sectionName === 'home') {
                            el.style.display = 'flex'; // استفاده از display: flex برای بخش‌های home
                        } else {
                            el.style.display = 'block'; // استفاده از display: block برای بخش‌های دیگر
                        }
                        setTimeout(() => {
                            el.classList.remove('hide');
                            el.classList.add('show');
                        }, 10); // slight delay to ensure the class change is detected
                    });
                });
            }, 100); // delay to ensure all sections are hidden before showing the new section
        });
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            disableInteraction();
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            showSection(button.textContent.toLowerCase());
        });
    });

    // Initial display
    showSection('home');
});
