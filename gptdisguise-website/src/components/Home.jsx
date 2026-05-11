import React, { useState, useEffect } from "react";
import { FaChrome, FaLock, FaEye, FaMagic } from "react-icons/fa";
import "../App.css";

const Home = () => {
  const [scrollProgress, setScrollProgress] = useState(0); // 0 → 1
  const [typedText, setTypedText] = useState("");
  const [scrollingUp, setScrollingUp] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const message = "Have no shame in using AI.";

  // Scroll phases:
  // 0.0 - 0.25: Header visible, nothing else
  // 0.25 - 0.5: Header fades out, typing starts
  // 0.5 - 0.75: Typing completes, coffee button appears
  // 0.75 - 1.0: Laptop appears and transforms

  // Capture scroll and normalize progress with smooth inertia
  useEffect(() => {
    let targetProgress = 0;
    let currentProgress = 0;
    let velocity = 0;
    let animationFrameId;

    const lerp = (start, end, factor) => start + (end - start) * factor;
    
    const animate = () => {
      // Smooth interpolation with velocity-based easing
      const diff = targetProgress - currentProgress;
      velocity += diff * 0.02; // Acceleration
      velocity *= 0.85; // Friction/damping
      
      currentProgress += velocity;
      
      // Clamp
      currentProgress = Math.min(Math.max(currentProgress, 0), 1);
      
      setScrollProgress(currentProgress);
      
      // Continue animation if still moving
      if (Math.abs(velocity) > 0.0001 || Math.abs(diff) > 0.0001) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const handleWheel = (e) => {
      e.preventDefault();
      
      // Much slower sensitivity (reduced from 0.0008 to 0.0002)
      const sensitivity = 0.0002;
      targetProgress += e.deltaY * sensitivity;
      
      // Clamp target
      targetProgress = Math.min(Math.max(targetProgress, 0), 1);
      
      // Detect scroll direction
      const isScrollingUp = e.deltaY < 0;
      setScrollingUp(isScrollingUp);
      
      // Show navbar when scrolling up and progress > 0
      if (isScrollingUp && targetProgress > 0.05) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
      
      // Start animation
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Typing effect based on scroll phase
  useEffect(() => {
    const typingStart = 0.25;
    const typingEnd = 0.65;

    if (scrollProgress < typingStart) {
      setTypedText("");
    } else if (scrollProgress >= typingStart && scrollProgress <= typingEnd) {
      const phaseProgress = (scrollProgress - typingStart) / (typingEnd - typingStart);
      const charsToShow = Math.floor(phaseProgress * message.length);
      setTypedText(message.slice(0, charsToShow));
    } else {
      setTypedText(message);
    }
  }, [scrollProgress]);

  // Calculate opacities for different phases
  const getHeaderOpacity = () => {
    if (scrollProgress < 0.15) return 1;
    if (scrollProgress > 0.4) return 0;
    return 1 - ((scrollProgress - 0.15) / 0.25);
  };

  const getTypingOpacity = () => {
    if (scrollProgress < 0.25) return 0;
    if (scrollProgress < 0.35) return (scrollProgress - 0.25) / 0.1;
    if (scrollProgress < 0.7) return 1;
    if (scrollProgress < 0.8) return 1 - ((scrollProgress - 0.7) / 0.1);
    return 0;
  };

  const getLaptopOpacity = () => {
    if (scrollProgress < 0.7) return 0;
    if (scrollProgress < 0.8) return (scrollProgress - 0.7) / 0.1;
    return 1;
  };

  const getLaptopTransform = () => {
    if (scrollProgress < 0.7) {
      return {
        rotateX: 90, // Flat on ground (90deg)
        opacity: 0
      };
    }

    const laptopProgress = (scrollProgress - 0.7) / 0.3;
    
    // Flip up from 90deg (flat) to 0deg (upright)
    return {
      rotateX: 90 - (laptopProgress * 90),
      opacity: 1
    };
  };

  const laptopTransform = getLaptopTransform();

  return (
    <div className="app">
    <div className="animation-container">
      {/* Navbar - appears on scroll up */}
      <nav 
        className="navbar"
        style={{
          opacity: showNavbar ? 1 : 0,
          pointerEvents: showNavbar ? 'auto' : 'none'
        }}
      >
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#download">Download</a></li>
        </ul>
      </nav>

      {/* Phase 1: Header (fades out 0.15 → 0.4) */}
      <div
        className="header-section"
        style={{
          opacity: getHeaderOpacity(),
          transform: `translateY(${scrollProgress * 30}px)`,
          pointerEvents: getHeaderOpacity() > 0 ? 'auto' : 'none'
        }}
      >
        <h1>GPTDisguise</h1>
        <a
          className="download-btn"
          href="https://chromewebstore.google.com/detail/gptdisguise/bccghhjlejbkimijdkdfoboamcjgpefg?hl=en-GB"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaChrome className="chrome-icon" /> Download Extension
        </a>
      </div>

      {/* Phase 2: Typing effect (appears 0.25 → 0.35, stays until 0.7, fades 0.7 → 0.8) */}
      <div
        className="typing-section"
        style={{
          opacity: getTypingOpacity(),
          pointerEvents: getTypingOpacity() > 0 ? 'auto' : 'none'
        }}
      >
        <div className="typing">
          {typedText}
          {scrollProgress >= 0.25 && scrollProgress < 0.7 && (
            <span className="cursor">|</span>
          )}
        </div>
        {scrollProgress > 0.5 && (
          <a
            href="https://www.buymeacoffee.com/gptdisguise"
            target="_blank"
            rel="noopener noreferrer"
            className="coffee-btn"
            style={{
              opacity: Math.min((scrollProgress - 0.5) / 0.1, 1)
            }}
          >
            ☕ Buy me a coffee
          </a>
        )}
      </div>

      {/* Phase 3: Laptop (appears 0.7 → 0.8, transforms 0.7 → 1.0) */}
      <div
        className="laptop-container"
        style={{
          opacity: laptopTransform.opacity,
          transform: `
            translateX(-50%)
            rotateX(${laptopTransform.rotateX}deg)
          `,
          pointerEvents: getLaptopOpacity() > 0 ? 'auto' : 'none'
        }}
      >
        <div className="laptop">
          <div className="laptop-screen">
            <div className="screen-content">
              <div className="demo-content">
                <div className="demo-title">
                  Use AI Without Detection
                </div>
                <div className="demo-description">
                  GPTDisguise lets you seamlessly integrate AI assistance into your workflow
                  while maintaining the appearance of native document editing.
                </div>
                <div className="demo-features">
                  <div className="feature-item">
                    <FaLock className="feature-icon" />
                    <span className="feature-text">Secure</span>
                  </div>
                  <div className="feature-item">
                    <FaEye className="feature-icon" />
                    <span className="feature-text">Invisible</span>
                  </div>
                  <div className="feature-item">
                    <FaMagic className="feature-icon" />
                    <span className="feature-text">Seamless</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Debug info (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          position: 'fixed',
          bottom: 10,
          right: 10,
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          fontFamily: 'monospace',
          fontSize: '12px',
          zIndex: 1000
        }}>
          Progress: {(scrollProgress * 100).toFixed(1)}%
        </div>
      )}
    </div>
    </div>
  );
};

export default Home;
