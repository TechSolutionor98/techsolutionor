"use client";

import React, { useEffect, useRef } from "react";

/**
 * TechHeroConstellation
 * High-performance animated constellation graph network tailored for white backgrounds:
 * - Green (Brand Emerald #289E34 / #41B349) & Black / Deep Slate (#0D0F12) nodes and connecting lines
 * - Interactive cursor repulsion and dynamic connecting gradient tethers on hover
 * - High-DPI crisp rendering, breathing node pulses, and soft celestial halos
 * - IntersectionObserver lifecycle management for zero overhead when out of viewport
 */
const TechHeroConstellation = () => {
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
      radius: 160, // Interaction radius in px
    };

    // Color definitions optimized for white background
    const COLOR_GREEN = { r: 46, g: 130, b: 52 };   // #2E8234 rich brand emerald
    const COLOR_BLACK = { r: 13, g: 15, b: 18 };   // #0D0F12 deep obsidian/charcoal

    // Particle settings based on screen width
    const getParticleCount = (w) => {
      if (w < 640) return 26; // Mobile
      if (w < 1024) return 44; // Tablet
      return 62; // Desktop
    };

    const getMaxDistance = (w) => {
      if (w < 640) return 105;
      if (w < 1024) return 125;
      return 140;
    };

    let particles = [];

    class Particle {
      constructor(w, h) {
        // ~55% emerald green nodes, ~45% deep obsidian/black nodes
        this.isGreen = Math.random() < 0.55;
        this.color = this.isGreen ? COLOR_GREEN : COLOR_BLACK;
        this.reset(w, h, true);
      }

      reset(w, h, isInitial = false) {
        this.x = isInitial ? Math.random() * w : Math.random() < 0.5 ? 0 : w;
        this.y = Math.random() * h;
        // Smooth, gentle drift velocity
        this.vx = (Math.random() - 0.5) * 0.38;
        this.vy = (Math.random() - 0.5) * 0.38;
        // Node radius between 1.8px and 2.8px for clear visual definition on white
        this.radius = Math.random() * 1.0 + 1.8;
        // Breathing pulse
        this.pulseSpeed = Math.random() * 0.018 + 0.012;
        this.pulsePhase = Math.random() * Math.PI * 2;
        // Base opacity depending on color
        this.baseAlpha = this.isGreen ? 0.82 : 0.68;
      }

      getColor(alphaMultiplier = 1) {
        const pulse = Math.sin(this.pulsePhase) * 0.12;
        const finalAlpha = Math.max(0.04, Math.min(1, (this.baseAlpha + pulse) * alphaMultiplier));
        return {
          r: this.color.r,
          g: this.color.g,
          b: this.color.b,
          alpha: finalAlpha,
          rgba: `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${finalAlpha.toFixed(3)})`,
        };
      }

      update(w, h) {
        this.pulsePhase += this.pulseSpeed;

        // Interactive mouse repulsion on desktop
        if (!isTouchDevice && mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius && dist > 0) {
            const force = (1 - dist / mouse.radius) * 0.55;
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * force;
            this.y -= Math.sin(angle) * force;
          }
        }

        this.x += this.vx;
        this.y += this.vy;

        // Wrap around boundaries with soft margin
        const margin = 25;
        if (this.x < -margin) this.x = w + margin;
        else if (this.x > w + margin) this.x = -margin;
        if (this.y < -margin) this.y = h + margin;
        else if (this.y > h + margin) this.y = -margin;
      }

      draw(context) {
        const color = this.getColor(1.0);

        // Main node circle
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = color.rgba;
        context.fill();

        // Soft celestial glow halo for larger nodes
        if (this.radius > 2.2) {
          const haloColor = this.getColor(0.20);
          context.beginPath();
          context.arc(this.x, this.y, this.radius * 2.3, 0, Math.PI * 2);
          context.fillStyle = haloColor.rgba;
          context.fill();
        }
      }
    }

    // Set canvas dimensions and scale for retina / high-DPI
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

      // Reinitialize particles
      const targetCount = getParticleCount(width);
      particles = Array.from({ length: targetCount }, () => new Particle(width, height));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Mouse event handlers on parent container
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

    // IntersectionObserver to pause loop when out of viewport
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
            // Distance-based falloff
            const lineFactor = Math.pow(1 - dist / maxDist, 1.25);
            // Visibility multiplier tailored for clean white background
            const alphaMul = lineFactor * 0.40;
            const c1 = p1.getColor(alphaMul);
            const c2 = p2.getColor(alphaMul);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            // Two-color gradient if connecting different node types (Green <-> Black)
            if (p1.isGreen === p2.isGreen) {
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

        // 2. Interactive line connection to mouse cursor
        if (!isTouchDevice && mouse.x !== null && mouse.y !== null) {
          const mdx = p1.x - mouse.x;
          const mdy = p1.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < mouse.radius) {
            const mFactor = Math.pow(1 - mdist / mouse.radius, 1.15);
            const pColor = p1.getColor(mFactor * 0.50);
            const mColor = `rgba(46, 130, 52, ${(mFactor * 0.50).toFixed(3)})`;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);

            const mGrad = ctx.createLinearGradient(p1.x, p1.y, mouse.x, mouse.y);
            mGrad.addColorStop(0, pColor.rgba);
            mGrad.addColorStop(1, mColor);

            ctx.strokeStyle = mGrad;
            ctx.lineWidth = 1.25;
            ctx.stroke();
          }
        }

        // Update particle physics and draw node
        p1.update(width, height);
        p1.draw(ctx);
      }

      // 3. Draw subtle cursor node glow when mouse is over hero banner
      if (!isTouchDevice && mouse.x !== null && mouse.y !== null) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3.8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(46, 130, 52, 0.75)";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 11, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(13, 15, 18, 0.12)";
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
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default TechHeroConstellation;
