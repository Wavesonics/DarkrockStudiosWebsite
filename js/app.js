// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', function() {
  // Add indentation after line breaks within paragraphs
  function indentAfterLineBreaks() {
    // Find all paragraphs
    const paragraphs = document.querySelectorAll('p');

    paragraphs.forEach(paragraph => {
      // Get the HTML content of the paragraph
      let content = paragraph.innerHTML;

      // Replace <br /> tags with a special span that has indentation
      content = content.replace(/<br\s*\/?>/gi, '<br /><span class="line-break-indent"></span>');

      // Update the paragraph content
      paragraph.innerHTML = content;
    });
  }

  // Call the function to indent after line breaks
  indentAfterLineBreaks();
  // Add smooth scrolling to all links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 50,
          behavior: 'smooth'
        });
      }
    });
  });

  // Initialize screenshot carousels
  const carousels = document.querySelectorAll('.screenshot-carousel');

  carousels.forEach(carousel => {
    const slides = carousel.querySelector('.carousel-slides');
    const screenshots = slides.querySelectorAll('.screenshot');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');

    // Set initial state
    let currentIndex = 0;
    updateCarousel();

    // Add event listeners to buttons
    prevBtn.addEventListener('click', showPrevSlide);
    nextBtn.addEventListener('click', showNextSlide);

    function showPrevSlide() {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : screenshots.length - 1;
      updateCarousel();
    }

    function showNextSlide() {
      currentIndex = (currentIndex < screenshots.length - 1) ? currentIndex + 1 : 0;
      updateCarousel();
    }

    function updateCarousel() {
      // Hide all screenshots initially
      screenshots.forEach((screenshot, index) => {
        if (index === currentIndex) {
          screenshot.style.display = 'block';
        } else {
          screenshot.style.display = 'none';
        }
      });
    }
  });

  // Simple lightbox for screenshots
  const screenshots = document.querySelectorAll('.screenshot');

  screenshots.forEach(screenshot => {
    screenshot.addEventListener('click', function() {
      // Create lightbox elements
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';

      const lightboxContent = document.createElement('div');
      lightboxContent.className = 'lightbox-content';

      const lightboxImage = document.createElement('img');
      lightboxImage.src = this.src;

      const closeButton = document.createElement('span');
      closeButton.className = 'close-button';
      closeButton.innerHTML = '&times;';

      // Append elements
      lightboxContent.appendChild(lightboxImage);
      lightboxContent.appendChild(closeButton);
      lightbox.appendChild(lightboxContent);
      document.body.appendChild(lightbox);

      // Add lightbox styles
      lightbox.style.display = 'flex';
      lightbox.style.position = 'fixed';
      lightbox.style.top = '0';
      lightbox.style.left = '0';
      lightbox.style.width = '100%';
      lightbox.style.height = '100%';
      lightbox.style.backgroundColor = 'rgba(0,0,0,0.8)';
      lightbox.style.zIndex = '1000';
      lightbox.style.justifyContent = 'center';
      lightbox.style.alignItems = 'center';

      lightboxContent.style.position = 'relative';
      lightboxContent.style.maxWidth = '90%';
      lightboxContent.style.maxHeight = '90%';

      lightboxImage.style.maxWidth = '100%';
      lightboxImage.style.maxHeight = '90vh';
      lightboxImage.style.display = 'block';
      lightboxImage.style.borderRadius = '4px';

      closeButton.style.position = 'absolute';
      closeButton.style.top = '-40px';
      closeButton.style.right = '0';
      closeButton.style.fontSize = '30px';
      closeButton.style.color = 'white';
      closeButton.style.cursor = 'pointer';

      // Close lightbox on click
      closeButton.addEventListener('click', function() {
        document.body.removeChild(lightbox);
      });

      // Close lightbox when clicking outside the image
      lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
          document.body.removeChild(lightbox);
        }
      });
    });
  });
});
