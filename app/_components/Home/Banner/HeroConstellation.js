"use client";

import React, { useEffect, useRef } from "react";

/**
 * Premium Constellation / Network Canvas animation with dynamic contrast:
 * - Green/dark background side: white dots & white connecting lines
 * - White/light background side: green dots & green connecting lines
 * - Smooth gradient interpolation in transition zone
 * - Mouse follow interaction with dynamic color adaptation
 * - Performance optimized with IntersectionObserver and high-DPI canvas
 */
const HeroConstellation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let animationFrameId;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Detect touch / mobile device
    const isTouchDevice =
      typeof window !== "undefined" &&
      ("ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches);

    // Mouse coordinates relative to canvas
    const mouse = {
      x: null,
      y: null,
      radius: 155, // Interaction radius in px
    };

    // Dynamic contrast color calculator based on the 135° diagonal background gradient:
    // Top-left is deep green -> White particles & lines
    // Bottom-right is light/white -> Green particles & lines
    const getThemeColor = (x, y, alphaMultiplier = 1) => {
      if (width === 0 || height === 0) {
        return { r: 255, g: 255, b: 255, alpha: 0.8, rgba: "rgba(255, 255, 255, 0.8)" };
      }

      // Progress along 135deg diagonal (0 = top-left green, 1 = bottom-right white)
      const progress = Math.max(0, Math.min(1, (x / width + y / height) * 0.5));

      // Brand green color on white side: vibrant, clean emerald (#289E34)
      const greenR = 40, greenG = 158, greenB = 52;
      // Crisp white color on green side
      const whiteR = 255, whiteG = 255, whiteB = 255;

      // Transition smoothly between 0.38 and 0.58
      const t = Math.max(0, Math.min(1, (progress - 0.38) / 0.20));
      // Smooth cubic ease curve for seamless color transition
      const easeT = t * t * (3 - 2 * t);

      const r = Math.round(whiteR + (greenR - whiteR) * easeT);
      const g = Math.round(whiteG + (greenG - whiteG) * easeT);
      const b = Math.round(whiteB + (greenB - whiteB) * easeT);

      // Higher base alpha on green side so white stands out crisply; rich alpha on white side
      const baseAlpha = (1 - easeT) * 0.88 + easeT * 0.78;
      const finalAlpha = Math.max(0.05, Math.min(1, baseAlpha * alphaMultiplier));

      return {
        r,
        g,
        b,
        alpha: finalAlpha,
        rgba: `rgba(${r}, ${g}, ${b}, ${finalAlpha.toFixed(3)})`,
      };
    };

    // Particle settings based on screen size
    const getParticleCount = (w) => {
      if (w < 640) return 26; // Mobile
      if (w < 1024) return 42; // Tablet
      return 60; // Desktop
    };

    const getMaxDistance = (w) => {
      if (w < 640) return 100;
      if (w < 1024) return 120;
      return 135;
    };

    let particles = [];

    class Particle {
      constructor(w, h) {
        this.reset(w, h, true);
      }

      reset(w, h, isInitial = false) {
        this.x = isInitial ? Math.random() * w : Math.random() < 0.5 ? 0 : w;
        this.y = Math.random() * h;
        // Smooth, slow, gentle floating speed
        this.vx = (Math.random() - 0.5) * 0.38;
        this.vy = (Math.random() - 0.5) * 0.38;
        // Radius between 1.8px and 2.8px for clear visibility
        this.radius = Math.random() * 1.0 + 1.8;
        // Gentle breathing pulse
        this.pulseSpeed = Math.random() * 0.018 + 0.01;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update(w, h) {
        this.pulsePhase += this.pulseSpeed;

        // Subtle reaction to mouse cursor on desktop
        if (!isTouchDevice && mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius && dist > 0) {
            // Gentle cushioned repulsion so particles react naturally
            const force = (1 - dist / mouse.radius) * 0.55;
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * force;
            this.y -= Math.sin(angle) * force;
          }
        }

        this.x += this.vx;
        this.y += this.vy;

        // Wrap around edges smoothly with a safety margin
        const margin = 20;
        if (this.x < -margin) this.x = w + margin;
        else if (this.x > w + margin) this.x = -margin;
        if (this.y < -margin) this.y = h + margin;
        else if (this.y > h + margin) this.y = -margin;
      }

      draw(context) {
        const pulse = Math.sin(this.pulsePhase) * 0.12;
        const color = getThemeColor(this.x, this.y, 1.0 + pulse);

        // Main dot
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = color.rgba;
        context.fill();

        // Delicate celestial outer halo for larger nodes
        if (this.radius > 2.2) {
          const haloColor = getThemeColor(this.x, this.y, 0.22);
          context.beginPath();
          context.arc(this.x, this.y, this.radius * 2.3, 0, Math.PI * 2);
          context.fillStyle = haloColor.rgba;
          context.fill();
        }
      }
    }

    // Set canvas dimensions and scale for high-DPI displays
    const handleResize = () => {
      if (!canvas || !parent) return;
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // Reinitialize particles to fit new dimensions
      const targetCount = getParticleCount(width);
      particles = Array.from({ length: targetCount }, () => new Particle(width, height));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Mouse event handlers on parent container (so clicks pass through canvas)
    const handleMouseMove = (e) => {
      if (isTouchDevice) return;
      const rect = parent.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    parent.addEventListener("mousemove", handleMouseMove, { passive: true });
    parent.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    // Pause rendering loop when Hero section is out of viewport to save CPU
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          render();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(parent);

    // Main animation loop
    const render = () => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const maxDist = getMaxDistance(width);
      const count = particles.length;

      // 1. Draw connecting constellation lines between nearby particles
      for (let i = 0; i < count; i++) {
        const p1 = particles[i];

        for (let j = i + 1; j < count; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            // Smooth distance-based opacity falloff
            const lineFactor = Math.pow(1 - dist / maxDist, 1.25);
            // Increased line opacity for clear visibility (0.42 max multiplier)
            const c1 = getThemeColor(p1.x, p1.y, lineFactor * 0.44);
            const c2 = getThemeColor(p2.x, p2.y, lineFactor * 0.44);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            // Use gradient if particles cross the color boundary, or solid if same
            if (c1.r === c2.r && c1.g === c2.g && c1.b === c2.b) {
              ctx.strokeStyle = c1.rgba;
            } else {
              const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
              grad.addColorStop(0, c1.rgba);
              grad.addColorStop(1, c2.rgba);
              ctx.strokeStyle = grad;
            }
            ctx.lineWidth = 1.05;
            ctx.stroke();
          }
        }

        // 2. Draw connecting lines from particle to mouse cursor if nearby
        if (!isTouchDevice && mouse.x !== null && mouse.y !== null) {
          const mdx = p1.x - mouse.x;
          const mdy = p1.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < mouse.radius) {
            const mFactor = Math.pow(1 - mdist / mouse.radius, 1.15);
            const pColor = getThemeColor(p1.x, p1.y, mFactor * 0.52);
            const mColor = getThemeColor(mouse.x, mouse.y, mFactor * 0.52);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);

            const mGrad = ctx.createLinearGradient(p1.x, p1.y, mouse.x, mouse.y);
            mGrad.addColorStop(0, pColor.rgba);
            mGrad.addColorStop(1, mColor.rgba);

            ctx.strokeStyle = mGrad;
            ctx.lineWidth = 1.25;
            ctx.stroke();
          }
        }

        // Update movement and draw particle
        p1.update(width, height);
        p1.draw(ctx);
      }

      // 3. Draw subtle cursor node glow when mouse is over hero banner
      if (!isTouchDevice && mouse.x !== null && mouse.y !== null) {
        const cursorDot = getThemeColor(mouse.x, mouse.y, 0.75);
        const cursorHalo = getThemeColor(mouse.x, mouse.y, 0.22);

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3.8, 0, Math.PI * 2);
        ctx.fillStyle = cursorDot.rgba;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = cursorHalo.rgba;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      parent.removeEventListener("mousemove", handleMouseMove);
      parent.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-0 select-none"
    />
  );
};

export default HeroConstellation;
