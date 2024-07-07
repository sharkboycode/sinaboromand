window.onload = function() {
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.style.display = 'flex';
    
    setTimeout(function() {
        loadingScreen.style.opacity = '0';
        setTimeout(function() {
            loadingScreen.style.display = 'none';
        }, 1000); // Match transition duration
    }, 100);
};

document.addEventListener('DOMContentLoaded', function () {
    const sidebarLinks = document.querySelectorAll('.sidebar a');
    const topMenuLinks = document.querySelectorAll('.top-menu a');
    const homeLink = document.getElementById('homeLink');

    function activateLink(links, activeLink) {
        links.forEach(link => link.classList.remove('active'));
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function () {
            activateLink(sidebarLinks, this);
            activateLink(topMenuLinks, null);
        });
    });

    topMenuLinks.forEach(link => {
        link.addEventListener('click', function () {
            activateLink(topMenuLinks, this);
            activateLink(sidebarLinks, null);
        });
    });

    activateLink(topMenuLinks, homeLink);
});

document.addEventListener('DOMContentLoaded', function() {
    const title = document.querySelector('.my-title');

    function applyHoverStyles() {
        title.style.opacity = '1';
        title.style.color = 'white';
        title.style.textShadow = '0 0 8px white, 0 0 10px white, 0 0 12px white, 0 0 20px white';
        title.style.animation = 'none';
    }

    function revertStyles() {
        title.style.opacity = '';
        title.style.color = '';
        title.style.textShadow = '';
        title.style.animation = '';
    }

    title.addEventListener('mouseover', applyHoverStyles);
    title.addEventListener('mouseout', revertStyles);
});

document.addEventListener('DOMContentLoaded', function () {
    const rectangles = document.querySelectorAll('.rectangle');
    const container = document.querySelector('.rectangles');
    const button = document.querySelector('.programs-button');
    let originalX = 0;
    let initialOffset = window.innerWidth * 0.5;
    let isDragging = false;

    function adjustRectanglesForTablet() {
        if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
            initialOffset = 200;
        }
    }

    adjustRectanglesForTablet();
    container.style.left = initialOffset + 'px';

    window.addEventListener('resize', function () {
        adjustRectanglesForTablet();
        container.style.left = initialOffset + 'px';
    });

    button.addEventListener('click', function() {
        button.style.opacity = '0';
        button.style.transition = 'opacity 0.2s ease, visibility 0.2s';
        button.style.visibility = 'hidden';

        container.style.transition = 'left 0.5s ease-out';
        initialOffset = window.innerWidth * 0.13;
        container.style.left = initialOffset + 'px';

        setTimeout(() => {
            container.style.transition = '';
        }, 500);
    });

    function enableDragging() {
        function onDragStart(event) {
            isDragging = false;
            originalX = event.type === 'mousedown' ? event.clientX : event.touches[0].clientX;
            event.preventDefault();

            const onMouseMove = (event) => {
                isDragging = true;
                const clientX = event.type === 'mousemove' ? event.clientX : event.touches[0].clientX;
                let moveDifference = clientX - originalX;
                let currentLeft = parseInt(window.getComputedStyle(container).left, 10) || 0;
                let newLeft = currentLeft + moveDifference;

                let leftLimit = -(container.scrollWidth - window.innerWidth);
                let rightLimit = Math.max(initialOffset, window.innerWidth * 0.5);

                // محدودیت های جدید برای تبلت
                if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
                    rightLimit = 200;
                }

                if (newLeft < leftLimit) newLeft = leftLimit;
                if (newLeft > rightLimit) newLeft = rightLimit;

                container.style.left = newLeft + 'px';
                originalX = clientX;

                if (Math.abs(newLeft - window.innerWidth * 0.3) <= 100) {
                    button.style.opacity = '0';
                    button.style.transition = 'opacity 0.2s ease, visibility 0.2s';
                    button.style.visibility = 'hidden';
                } else if (Math.abs(newLeft - window.innerWidth * 0.5) <= 300) {
                    button.style.opacity = '1';
                    button.style.transition = 'opacity 0.2s ease, visibility 0.2s';
                    button.style.visibility = 'visible';
                }
            };

            document.addEventListener(event.type === 'mousedown' ? 'mousemove' : 'touchmove', onMouseMove);

            document.addEventListener(event.type === 'mousedown' ? 'mouseup' : 'touchend', function () {
                document.removeEventListener(event.type === 'mousedown' ? 'mousemove' : 'touchmove', onMouseMove);
                setTimeout(() => { isDragging = false; }, 100); // تنظیم تأخیر برای اطمینان از پایان کشیدن
            }, { once: true });
        }

        container.addEventListener('mousedown', onDragStart);
        container.addEventListener('touchstart', onDragStart);
    }

    function toggleClass(event) {
        if (isDragging) return;
        event.stopPropagation();
        rectangles.forEach(rectangle => rectangle.classList.remove('clicked'));
        this.classList.add('clicked');
    }

    rectangles.forEach(rectangle => {
        rectangle.addEventListener('click', function(event) {
            setTimeout(() => {
                if (!isDragging) toggleClass.call(this, event);
            }, 100); // تنظیم تأخیر برای اطمینان از پایان کشیدن
        });
        rectangle.addEventListener('touchend', function(event) {
            setTimeout(() => {
                if (!isDragging) toggleClass.call(this, event);
            }, 100); // تنظیم تأخیر برای اطمینان از پایان کشیدن
        });
    });

    document.addEventListener('click', function() {
        if (!isDragging) {
            rectangles.forEach(rectangle => rectangle.classList.remove('clicked'));
        }
    });

    document.addEventListener('touchend', function() {
        if (!isDragging) {
            rectangles.forEach(rectangle => rectangle.classList.remove('clicked'));
        }
    });

    enableDragging();
});


document.addEventListener('DOMContentLoaded', function () {
    const menuItems = document.querySelectorAll('.top-menu a, .sidebar');
    const myPic = document.getElementById('myPic');
    const myName = document.querySelector('.my-name');
    const myTitle = document.querySelector('.my-title');
    const rectangles = document.querySelector('.rectangles');
    const buttonContainer = document.querySelector('.button-container');
    const homeLink = document.getElementById('homeLink');

    function updatePicPosition() {
        if (homeLink.classList.contains('active')) {
            myPic.classList.remove('hidden');
            myName.classList.remove('hidden');
            myTitle.classList.remove('hidden');
            rectangles.classList.remove('hidden');
            buttonContainer.classList.remove('hidden');
        } else {
            myPic.classList.add('hidden');
            myName.classList.add('hidden');
            myTitle.classList.add('hidden');
            rectangles.classList.add('hidden');
            buttonContainer.classList.add('hidden');
        }
    }

    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            setTimeout(updatePicPosition, 10);
        });
    });

    updatePicPosition();
});

document.addEventListener('DOMContentLoaded', function () {
    const menuItems = document.querySelectorAll('.top-menu a, .sidebar');
    const aboutMePic = document.getElementById('aboutmePic');
    const aboutmesection = document.querySelector('.about-me-section');
    const aboutLink = document.getElementById('aboutLink');

    function updatePicPosition() {
        if (aboutLink.classList.contains('active')) {
            aboutMePic.classList.remove('hidden');
            aboutmesection.classList.remove('hidden');
        } else {
            aboutMePic.classList.add('hidden');
            aboutmesection.classList.add('hidden');
        }
    }

    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            setTimeout(updatePicPosition, 10);
        });
    });

    updatePicPosition();
});

document.addEventListener('DOMContentLoaded', function () {
    const menuItems = document.querySelectorAll('.top-menu a, .sidebar');
    const pdfPic = document.getElementById('pdfPic');
    const portfoliosection = document.querySelector('.portfolio-section');
    const imagestack = document.querySelector('.image-stack');
    const portfolioLink = document.getElementById('portfolioLink');

    function updatePicPosition() {
        if (portfolioLink.classList.contains('active')) {
            pdfPic.classList.remove('hidden');
            portfoliosection.classList.remove('hidden');
            imagestack.classList.remove('hidden');
        } else {
            pdfPic.classList.add('hidden');
            portfoliosection.classList.add('hidden');
            imagestack.classList.add('hidden');
        }
    }

    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            setTimeout(updatePicPosition, 10);
        });
    });

    updatePicPosition();
});

function openLink(url) {
    window.open(url, '_blank');
}

document.addEventListener('DOMContentLoaded', function () {
    const menuItems = document.querySelectorAll('.top-menu a, .sidebar');
    const socialmedia = document.querySelector('.socialmedia');
    const socialmedia2 = document.querySelector('.socialmedia2');
    const contactLink = document.getElementById('contactLink');

    function updatePicPosition() {
        if (contactLink.classList.contains('active')) {
            socialmedia.classList.remove('hidden');
            socialmedia2.classList.remove('hidden');
        } else {
            socialmedia.classList.add('hidden');
            socialmedia2.classList.add('hidden');
        }
    }

    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            setTimeout(updatePicPosition, 10);
        });
    });

    updatePicPosition();
});

document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.muscicover-container');
    const coverText = document.querySelector('.musiccover');
    let isDragging = false;
    let dragStartX;
    let dragStartTime;

    container.addEventListener('mousedown', function (e) {
        if (e.button === 0 && !e.ctrlKey) {
            e.preventDefault();
            isDragging = false;
            dragStartX = e.clientX - container.offsetLeft;
            dragStartTime = new Date().getTime();
            container.style.cursor = 'grabbing';
        }
    });

    container.addEventListener('touchstart', function (e) {
        if (e.touches.length === 1) {
            e.preventDefault();
            isDragging = false;
            dragStartX = e.touches[0].clientX - container.offsetLeft;
            dragStartTime = new Date().getTime();
            container.style.cursor = 'grabbing';
        }
    });

    document.addEventListener('mousemove', function (e) {
        if (e.buttons === 1) {
            const newX = e.clientX - dragStartX;
            const maxLeft = window.innerWidth - container.scrollWidth;
            const minLeft = 160;
            const adjustedLeft = Math.min(minLeft, Math.max(newX, maxLeft));
            container.style.left = `${adjustedLeft}px`;
            isDragging = true;
        }
    });

    document.addEventListener('touchmove', function (e) {
        if (e.touches.length === 1) {
            const newX = e.touches[0].clientX - dragStartX;
            const maxLeft = window.innerWidth - container.scrollWidth;
            const minLeft = 160;
            const adjustedLeft = Math.min(minLeft, Math.max(newX, maxLeft));
            container.style.left = `${adjustedLeft}px`;
            isDragging = true;
        }
    });

    document.addEventListener('mouseup', function () {
        container.style.cursor = 'grab';
        setTimeout(() => { isDragging = false; }, 50); // تأخیر کوتاه برای اطمینان از عدم تداخل
    });

    document.addEventListener('touchend', function () {
        container.style.cursor = 'grab';
        setTimeout(() => { isDragging = false; }, 50); // تأخیر کوتاه برای اطمینان از عدم تداخل
    });

    container.querySelectorAll('img').forEach(image => {
        image.addEventListener('click', (e) => {
            if (!isDragging && new Date().getTime() - dragStartTime < 200) { // بررسی اینکه کلیک واقعی بوده است
                if (image.classList.contains('clicked')) {
                    image.classList.remove('clicked');
                    coverText.style.opacity = '1';
                } else {
                    container.querySelectorAll('img').forEach(img => img.classList.remove('clicked'));
                    image.classList.add('clicked');
                    coverText.style.opacity = '0';
                }
            }
        });

        image.addEventListener('touchend', (e) => {
            if (!isDragging && new Date().getTime() - dragStartTime < 200) { // بررسی اینکه کلیک واقعی بوده است
                if (image.classList.contains('clicked')) {
                    image.classList.remove('clicked');
                    coverText.style.opacity = '1';
                } else {
                    container.querySelectorAll('img').forEach(img => img.classList.remove('clicked'));
                    image.classList.add('clicked');
                    coverText.style.opacity = '0';
                }
            }
        });
    });

    // برای مدیریت کلیک در خارج از کارت ها
    document.addEventListener('click', function (e) {
        if (!isDragging && !container.contains(e.target)) {
            container.querySelectorAll('img').forEach(img => img.classList.remove('clicked'));
            coverText.style.opacity = '1';
        }
    });

    document.addEventListener('touchend', function (e) {
        if (!isDragging && !container.contains(e.target)) {
            container.querySelectorAll('img').forEach(img => img.classList.remove('clicked'));
            coverText.style.opacity = '1';
        }
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const menuItems = document.querySelectorAll('.top-menu a, .sidebar');
    const musiccover = document.querySelector('.musiccover');
    const muscicovercontainer = document.querySelector('.muscicover-container');
    const musicLink = document.getElementById('musicLink');

    function updatePicPosition() {
        if (musicLink.classList.contains('active')) {
            musiccover.style.left = '170px';
            muscicovercontainer.style.margin = '0 0 0 0';
        } else {
            musiccover.style.left = '-100%';
            muscicovercontainer.style.margin = '0 0 0 200%';
        }
    }

    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            setTimeout(updatePicPosition, 10);
        });
    });

    updatePicPosition();
});

document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.web-container');
    const coverText = document.querySelector('.websites');
    let isDragging = false;
    let dragStartX;
    let dragStartTime;

    container.addEventListener('mousedown', function (e) {
        if (e.button === 0 && !e.ctrlKey) {
            e.preventDefault();
            isDragging = false;
            dragStartX = e.clientX - container.offsetLeft;
            dragStartTime = new Date().getTime();
            container.style.cursor = 'grabbing';
        }
    });

    container.addEventListener('touchstart', function (e) {
        if (e.touches.length === 1) {
            e.preventDefault();
            isDragging = false;
            dragStartX = e.touches[0].clientX - container.offsetLeft;
            dragStartTime = new Date().getTime();
            container.style.cursor = 'grabbing';
        }
    });

    document.addEventListener('mousemove', function (e) {
        if (e.buttons === 1) {
            const newX = e.clientX - dragStartX;
            const maxLeft = window.innerWidth - container.scrollWidth;
            const minLeft = 170;
            const adjustedLeft = Math.min(minLeft, Math.max(newX, maxLeft));
            container.style.left = `${adjustedLeft}px`;
            isDragging = true;
        }
    });

    document.addEventListener('touchmove', function (e) {
        if (e.touches.length === 1) {
            const newX = e.touches[0].clientX - dragStartX;
            const maxLeft = window.innerWidth - container.scrollWidth;
            const minLeft = 170;
            const adjustedLeft = Math.min(minLeft, Math.max(newX, maxLeft));
            container.style.left = `${adjustedLeft}px`;
            isDragging = true;
        }
    });

    document.addEventListener('mouseup', function () {
        container.style.cursor = 'grab';
        setTimeout(() => { isDragging = false; }, 50); // تأخیر کوتاه برای اطمینان از عدم تداخل
    });

    document.addEventListener('touchend', function () {
        container.style.cursor = 'grab';
        setTimeout(() => { isDragging = false; }, 50); // تأخیر کوتاه برای اطمینان از عدم تداخل
    });

    container.querySelectorAll('img').forEach(image => {
        image.addEventListener('click', (e) => {
            if (!isDragging && new Date().getTime() - dragStartTime < 200) { // بررسی اینکه کلیک واقعی بوده است
                if (image.classList.contains('clicked')) {
                    image.classList.remove('clicked');
                    coverText.style.opacity = '1';
                } else {
                    container.querySelectorAll('img').forEach(img => img.classList.remove('clicked'));
                    image.classList.add('clicked');
                    coverText.style.opacity = '0';
                }
            }
        });

        image.addEventListener('touchend', (e) => {
            if (!isDragging && new Date().getTime() - dragStartTime < 200) { // بررسی اینکه کلیک واقعی بوده است
                if (image.classList.contains('clicked')) {
                    image.classList.remove('clicked');
                    coverText.style.opacity = '1';
                } else {
                    container.querySelectorAll('img').forEach(img => img.classList.remove('clicked'));
                    image.classList.add('clicked');
                    coverText.style.opacity = '0';
                }
            }
        });
    });

    // برای مدیریت کلیک در خارج از کارت ها
    document.addEventListener('click', function (e) {
        if (!isDragging && !container.contains(e.target)) {
            container.querySelectorAll('img').forEach(img => img.classList.remove('clicked'));
            coverText.style.opacity = '1';
        }
    });

    document.addEventListener('touchend', function (e) {
        if (!isDragging && !container.contains(e.target)) {
            container.querySelectorAll('img').forEach(img => img.classList.remove('clicked'));
            coverText.style.opacity = '1';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const menuItems = document.querySelectorAll('.top-menu a, .sidebar');
    const websites = document.querySelector('.websites');
    const web = document.querySelector('.web-container');
    const webLink = document.getElementById('webLink');

    function updatePicPosition() {
        if (webLink.classList.contains('active')) {
            websites.style.left = '170px';
            web.style.margin = '0 0 0 0';
        } else {
            websites.style.left = '-100%';
            web.style.margin = '0 0 0 200%';
        }
    }

    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            setTimeout(updatePicPosition, 10);
        });
    });

    updatePicPosition();
});

document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.logo-container');
    const coverText = document.querySelector('.logos');
    let isDragging = false;
    let dragStartX;
    let dragStartTime;

    container.addEventListener('mousedown', function (e) {
        if (e.button === 0 && !e.ctrlKey) {
            e.preventDefault();
            isDragging = false;
            dragStartX = e.clientX - container.offsetLeft;
            dragStartTime = new Date().getTime();
            container.style.cursor = 'grabbing';
        }
    });

    container.addEventListener('touchstart', function (e) {
        if (e.touches.length === 1) {
            e.preventDefault();
            isDragging = false;
            dragStartX = e.touches[0].clientX - container.offsetLeft;
            dragStartTime = new Date().getTime();
            container.style.cursor = 'grabbing';
        }
    });

    document.addEventListener('mousemove', function (e) {
        if (e.buttons === 1) {
            const newX = e.clientX - dragStartX;
            const maxLeft = window.innerWidth - container.scrollWidth;
            const minLeft = 170;
            const adjustedLeft = Math.min(minLeft, Math.max(newX, maxLeft));
            container.style.left = `${adjustedLeft}px`;
            isDragging = true;
        }
    });

    document.addEventListener('touchmove', function (e) {
        if (e.touches.length === 1) {
            const newX = e.touches[0].clientX - dragStartX;
            const maxLeft = window.innerWidth - container.scrollWidth;
            const minLeft = 170;
            const adjustedLeft = Math.min(minLeft, Math.max(newX, maxLeft));
            container.style.left = `${adjustedLeft}px`;
            isDragging = true;
        }
    });

    document.addEventListener('mouseup', function () {
        container.style.cursor = 'grab';
        setTimeout(() => { isDragging = false; }, 50); // تأخیر کوتاه برای اطمینان از عدم تداخل
    });

    document.addEventListener('touchend', function () {
        container.style.cursor = 'grab';
        setTimeout(() => { isDragging = false; }, 50); // تأخیر کوتاه برای اطمینان از عدم تداخل
    });

    container.querySelectorAll('img').forEach(image => {
        image.addEventListener('click', (e) => {
            if (!isDragging && new Date().getTime() - dragStartTime < 200) { // بررسی اینکه کلیک واقعی بوده است
                if (image.classList.contains('clicked')) {
                    image.classList.remove('clicked');
                    coverText.style.opacity = '1';
                } else {
                    container.querySelectorAll('img').forEach(img => img.classList.remove('clicked'));
                    image.classList.add('clicked');
                    coverText.style.opacity = '0';
                }
            }
        });

        image.addEventListener('touchend', (e) => {
            if (!isDragging && new Date().getTime() - dragStartTime < 200) { // بررسی اینکه کلیک واقعی بوده است
                if (image.classList.contains('clicked')) {
                    image.classList.remove('clicked');
                    coverText.style.opacity = '1';
                } else {
                    container.querySelectorAll('img').forEach(img => img.classList.remove('clicked'));
                    image.classList.add('clicked');
                    coverText.style.opacity = '0';
                }
            }
        });
    });

    // برای مدیریت کلیک در خارج از کارت ها
    document.addEventListener('click', function (e) {
        if (!isDragging && !container.contains(e.target)) {
            container.querySelectorAll('img').forEach(img => img.classList.remove('clicked'));
            coverText.style.opacity = '1';
        }
    });

    document.addEventListener('touchend', function (e) {
        if (!isDragging && !container.contains(e.target)) {
            container.querySelectorAll('img').forEach(img => img.classList.remove('clicked'));
            coverText.style.opacity = '1';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const menuItems = document.querySelectorAll('.top-menu a, .sidebar');
    const logos = document.querySelector('.logos');
    const logo = document.querySelector('.logo-container');
    const logoLink = document.getElementById('logoLink');

    function updatePicPosition() {
        if (logoLink.classList.contains('active')) {
            logos.style.left = '170px';
            logo.style.margin = '0 0 0 0';
        } else {
            logos.style.left = '-100%';
            logo.style.margin = '0 0 0 200%';
        }
    }

    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            setTimeout(updatePicPosition, 10);
        });
    });

    updatePicPosition();
});

document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.book-container');
    const coverText = document.querySelector('.books');
    let isDragging = false;
    let dragStartX;
    let dragStartTime;

    container.addEventListener('mousedown', function (e) {
        if (e.button === 0 && !e.ctrlKey) {
            e.preventDefault();
            isDragging = false;
            dragStartX = e.clientX - container.offsetLeft;
            dragStartTime = new Date().getTime();
            container.style.cursor = 'grabbing';
        }
    });

    container.addEventListener('touchstart', function (e) {
        if (e.touches.length === 1) {
            e.preventDefault();
            isDragging = false;
            dragStartX = e.touches[0].clientX - container.offsetLeft;
            dragStartTime = new Date().getTime();
            container.style.cursor = 'grabbing';
        }
    });

    document.addEventListener('mousemove', function (e) {
        if (e.buttons === 1) {
            const newX = e.clientX - dragStartX;
            const maxLeft = window.innerWidth - container.scrollWidth;
            const minLeft = 170;
            const adjustedLeft = Math.min(minLeft, Math.max(newX, maxLeft));
            container.style.left = `${adjustedLeft}px`;
            isDragging = true;
        }
    });

    document.addEventListener('touchmove', function (e) {
        if (e.touches.length === 1) {
            const newX = e.touches[0].clientX - dragStartX;
            const maxLeft = window.innerWidth - container.scrollWidth;
            const minLeft = 170;
            const adjustedLeft = Math.min(minLeft, Math.max(newX, maxLeft));
            container.style.left = `${adjustedLeft}px`;
            isDragging = true;
        }
    });

    document.addEventListener('mouseup', function () {
        container.style.cursor = 'grab';
        setTimeout(() => { isDragging = false; }, 50); // تأخیر کوتاه برای اطمینان از عدم تداخل
    });

    document.addEventListener('touchend', function () {
        container.style.cursor = 'grab';
        setTimeout(() => { isDragging = false; }, 50); // تأخیر کوتاه برای اطمینان از عدم تداخل
    });

    container.querySelectorAll('img').forEach(image => {
        image.addEventListener('click', (e) => {
            if (!isDragging && new Date().getTime() - dragStartTime < 200) { // بررسی اینکه کلیک واقعی بوده است
                if (image.classList.contains('clicked')) {
                    image.classList.remove('clicked');
                    coverText.style.opacity = '1';
                } else {
                    container.querySelectorAll('img').forEach(img => img.classList.remove('clicked'));
                    image.classList.add('clicked');
                    coverText.style.opacity = '0';
                }
            }
        });

        image.addEventListener('touchend', (e) => {
            if (!isDragging && new Date().getTime() - dragStartTime < 200) { // بررسی اینکه کلیک واقعی بوده است
                if (image.classList.contains('clicked')) {
                    image.classList.remove('clicked');
                    coverText.style.opacity = '1';
                } else {
                    container.querySelectorAll('img').forEach(img => img.classList.remove('clicked'));
                    image.classList.add('clicked');
                    coverText.style.opacity = '0';
                }
            }
        });
    });

    // برای مدیریت کلیک در خارج از کارت ها
    document.addEventListener('click', function (e) {
        if (!isDragging && !container.contains(e.target)) {
            container.querySelectorAll('img').forEach(img => img.classList.remove('clicked'));
            coverText.style.opacity = '1';
        }
    });

    document.addEventListener('touchend', function (e) {
        if (!isDragging && !container.contains(e.target)) {
            container.querySelectorAll('img').forEach(img => img.classList.remove('clicked'));
            coverText.style.opacity = '1';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const menuItems = document.querySelectorAll('.top-menu a, .sidebar');
    const books = document.querySelector('.books');
    const book = document.querySelector('.book-container');
    const bookLink = document.getElementById('bookLink');

    function updatePicPosition() {
        if (bookLink.classList.contains('active')) {
            books.style.left = '170px';
            book.style.margin = '0 0 0 0';
        } else {
            books.style.left = '-100%';
            book.style.margin = '0 0 0 200%';
        }
    }

    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            setTimeout(updatePicPosition, 10);
        });
    });

    updatePicPosition();
});

document.addEventListener('DOMContentLoaded', function () {
    const menuItems = document.querySelectorAll('.top-menu a, .sidebar');
    const codes = document.querySelector('.codes');
    const codeLink = document.getElementById('codeLink');

    function updatePicPosition() {
        if (codeLink.classList.contains('active')) {
            codes.style.left = '170px';
        } else {
            codes.style.left = '-100%';
        }
    }

    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            setTimeout(updatePicPosition, 10);
        });
    });

    updatePicPosition();
});

document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth <= 767) {
        // اگر عرض صفحه کمتر از 768 پیکسل باشد، نسخه موبایل را بارگذاری کنید
        window.location.href = 'mobile.html';
    }
});
