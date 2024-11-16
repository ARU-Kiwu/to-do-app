import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

// Slide up animation
export function slideUp(selector, gsap, onCompleteCallback) {
    gsap.fromTo(selector, 
      {
        y: 0
      },
      {
        y: -20,         // Move up slightly
        opacity: 0,
        duration: 0.5,  // Slightly longer duration for smoothness
        stagger: 0.1,
        ease: "power2.out", // Smooth ease-out effect
        onComplete: onCompleteCallback // Trigger the callback after animation
    });
}

  // Slide down animation
export function slideDown(selector, gsap, onCompleteCallback) {
    gsap.fromTo(selector, 
      {
        y: -20
      },
      {
        y: 0,         // Move up slightly
        opacity: 1,
        duration: 0.5,  // Slightly longer duration for smoothness
        ease: "power2.out", // Smooth ease-out effect
        onComplete: onCompleteCallback // Trigger the callback after animation
    });
  }

  export function slideLeft(selector, gsap, onCompleteCallback) {
    gsap.fromTo(selector, 
      {
        x: 0
      },
      {
        x: -20,         // Move up slightly
        opacity: 0,
        duration: 0.5,  // Slightly longer duration for smoothness
        ease: "power2.out", // Smooth ease-out effect
        onComplete: onCompleteCallback // Trigger the callback after animation
    });
}


export function slideRight(selector, gsap, onCompleteCallback) {
  gsap.fromTo(selector, 
    {
      x: 0
    },
    {
      x: 20,         // Move up slightly
      opacity: 0,
      duration: 0.5,  // Slightly longer duration for smoothness
      ease: "power2.out", // Smooth ease-out effect
      onComplete: onCompleteCallback // Trigger the callback after animation
  });
}

  // Expanding animation for container
export function expandFromTopLeft(selector, gsap, onCompleteCallback) {
    
    // Set the transform origin to top-left
    gsap.set(selector, { transformOrigin: "top left" });

    // Animate scaleX and scaleY from 0 to 1 for expansion effect
    gsap.fromTo(selector, 
      { scaleX: 0, scaleY: 0 },  // Start scale (collapsed)
      { scaleX: 1, scaleY: 1, duration: 0.8, ease: "power3.out", onComplete: onCompleteCallback  }  // End scale (expanded)
     
    );
}

// Collapsing animation for container (invert of expandFromTopLeft)
export function collapseToTopLeft(selector, gsap, onCompleteCallback) {
    // Set the transform origin to top-left
    gsap.set(selector, { transformOrigin: "top left" });

    // Animate scaleX and scaleY from 1 to 0 for collapse effect
    gsap.fromTo(selector, 
      { scaleX: 1, scaleY: 1 },  // Start scale (expanded)
      { scaleX: 0, scaleY: 0, duration: 0.6, ease: "power3.in", onComplete: onCompleteCallback }  // End scale (collapsed)
    );
}

// Icon reveal animation
export function revealIcon(selector, gsap, onCompleteCallback) {
  // Set the initial scale and opacity for a hidden effect
  gsap.set(selector, { scale: 0, opacity: 0, transformOrigin: "center" });

  // Animate scale and opacity for a smooth reveal
  gsap.to(selector, {
      scale: 1,          // Scale to full size
      opacity: 1,        // Fade to full opacity
      duration: 0.5,     // Animation duration
      ease: "power3.out", // Smooth ease-out for natural motion
      onComplete: onCompleteCallback // Callback when animation completes
  });
}


export function revealAnimation(element, gsap) {
  gsap.fromTo(element, 
      { opacity: 0, y: 20, scale: 0.9 }, // Start state
      { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.6, 
          stagger: 0.1,   // Apply the incremental delay
          ease: "power2.out" 
      }
  );
}

export function hideAnimation(element, gsap, onCompleteCallback) {
  gsap.fromTo(element, 
      { opacity: 1, y: 0, scale: 1 }, // Start state (visible, original size, in place)
      { 
          opacity: 0,     // Fade out
          y: 20,          // Move slightly down
          scale: 0.9,     // Shrink slightly
          duration: 0.6, 
          stagger: 0.1,   // Apply the incremental delay
          ease: "power2.in", // Ease in for a smoother, slower effect
          onComplete: onCompleteCallback
      }
  );
}


// Function to apply a subtle slide-down animation to two containers
export function slideDownContainers(container1, container2, gsap) {
  const containers = [container1, container2];

  gsap.fromTo(containers, 
      {
          opacity: 0,       // Start with zero opacity
          y: -10            // Start slightly above
      },
      {
          opacity: 1,       // Fade in
          y: 0,             // Move to original position
          duration: 0.6,    // Adjust duration for smoothness
          ease: "power3.out", // Smooth ease-out effect
          stagger: 0.2     // Small stagger between animations
      }
  );
}



// Function to animate todos with a slide-to-right effect and stagger
export function slideTodosToRight(gsap) {
  const todos = document.querySelectorAll('.todo');
  gsap.fromTo(todos,
    {
        opacity: 0,
        x: -10       // Start slightly to the left
    },
    {
        delay: 0.6,
        opacity: 1,       // Fade in
        x: 0,             // Move to original position
        duration: 0.5,    // Adjust duration for smoothness
        ease: "power3.out", // Smooth ease-out effect
        stagger: 0.1      // Apply a small stagger between todos
    }
);
}

export function typewriterAnimation(selector, text, duration) {
   
    
    gsap.to(selector, {
        text: text,           // GSAP text plugin will type out the content of 'text'
        duration: text.length * duration, // Adjust duration based on text length
        ease: "power1.inOut",
        onStart: () => {
           selector.style.display = 'inline-block'; // Ensure element is visible
        }
    });
}




   

  

