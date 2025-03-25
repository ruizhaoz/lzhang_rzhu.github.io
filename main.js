const parallax = document.getElementById("home-img-lg");
const parallax1 = document.getElementById("parallax1");
const parallax2 = document.getElementById("parallax2");

window.addEventListener("scroll", function()
{
    let offset = window.pageYOffset;
    parallax.style.backgroundPositionX = offset*(-0.3)-100 + "px";
})


window.addEventListener("scroll", function()
{
    let offset = window.pageYOffset;
    offset-=3100;
    parallax1.style.backgroundPositionY = offset*(0.1) + "px";
})

window.addEventListener("scroll", function()
{
    let offset = window.pageYOffset;
    offset-=4800;
    parallax2.style.backgroundPositionY = offset*(-0.1) + "px";
})

function myFunction() {
    document.getElementById("check").checked = false;
  }


  
function reveal() {
var reveals = document.querySelectorAll(".reveal");
  
for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
}
  
window.addEventListener("scroll", reveal);


// Gallery Slider
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.gallery-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.right-arrow');
    const prevButton = document.querySelector('.left-arrow');
    
    // Set initial position
    let currentIndex = 0;
    let startX, moveX;
    let isSwiping = false;

    // Get proper slide width based on screen size
    function getSlideWidth() {
        return slides[0].getBoundingClientRect().width + 20; // width + margin
    }

    let slideWidth = getSlideWidth();
    
    // Move to slide function
    function moveToSlide(targetIndex) {
        currentIndex = targetIndex;
        track.style.transform = 'translateX(-' + slideWidth * currentIndex + 'px)';
        
        // If we reach the end, reset to beginning
        if (currentIndex >= slides.length - 3) {
            setTimeout(() => {
                track.style.transition = 'none';
                currentIndex = 0;
                track.style.transform = 'translateX(0)';
                setTimeout(() => {
                    track.style.transition = 'transform 0.5s ease-in-out';
                }, 10);
            }, 500);
        }
    }
    
    // Auto slide function
    function autoSlide() {
        moveToSlide(currentIndex + 1);
    }
    
    // Start auto sliding
    let slideInterval = setInterval(autoSlide, 3000);
    
    // Touch events for mobile swipe
    track.addEventListener('touchstart', (e) => {
        clearInterval(slideInterval); // Pause auto-sliding on touch
        startX = e.touches[0].clientX;
        isSwiping = true;
        track.style.transition = 'none';
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;
        moveX = e.touches[0].clientX;
        const diff = moveX - startX;
        const currentTransform = -(currentIndex * slideWidth);
        track.style.transform = `translateX(\${currentTransform + diff}px)`;
    }, { passive: true });

    track.addEventListener('touchend', () => {
        if (!isSwiping) return;
        isSwiping = false;
        track.style.transition = 'transform 0.5s ease-in-out';
        
        const diff = moveX - startX;
        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0 && currentIndex > 0) {
                // Swipe right
                moveToSlide(currentIndex - 1);
            } else if (diff < 0 && currentIndex < slides.length - 3) {
                // Swipe left
                moveToSlide(currentIndex + 1);
            } else {
                // Return to current slide if at the end
                moveToSlide(currentIndex);
            }
        } else {
            // Return to current slide if swipe wasn't long enough
            moveToSlide(currentIndex);
        }

        // Resume auto-sliding after touch
        slideInterval = setInterval(autoSlide, 3000);
    });
    
    // Mouse events (for desktop)
    track.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    track.addEventListener('mouseleave', () => {
        slideInterval = setInterval(autoSlide, 3000);
    });
    
    // Click handlers for arrows
    nextButton.addEventListener('click', () => {
        clearInterval(slideInterval);
        moveToSlide(currentIndex + 1);
    });
    
    prevButton.addEventListener('click', () => {
        clearInterval(slideInterval);
        if (currentIndex > 0) {
            moveToSlide(currentIndex - 1);
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        slideWidth = getSlideWidth(); // Update slide width on resize
        track.style.transition = 'none';
        track.style.transform = 'translateX(-' + slideWidth * currentIndex + 'px)';
        setTimeout(() => {
            track.style.transition = 'transform 0.5s ease-in-out';
        }, 10);
    });

    // Prevent default touch move behavior (page scroll) when swiping gallery
    track.addEventListener('touchmove', (e) => {
        if (isSwiping) {
            e.preventDefault();
        }
    }, { passive: false });
});