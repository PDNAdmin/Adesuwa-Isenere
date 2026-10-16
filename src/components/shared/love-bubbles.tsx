"use client";

import { useEffect, useRef } from "react";

interface PageBubble {
  pageX: number; // horizontal position across viewport (0 to width)
  pageY: number; // absolute vertical position on the webpage
  basePageY: number;
  radius: number;
  alpha: number;
  isHeart: boolean;
  isRose: boolean;
  phase: number;
  wobbleSpeed: number;
  repelX: number;
  repelY: number;
  repelVx: number;
  repelVy: number;
  currentScale: number;
  targetScale: number;
  currentAlphaBoost: number;
  targetAlphaBoost: number;
  rotation: number;
  rotSpeed: number;
}

interface CursorTrail {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  life: number;
  maxLife: number;
  isHeart: boolean;
  isRose: boolean;
  rotation: number;
  rotSpeed: number;
}

// Geometric 2D SVG path for a symmetrical heart centered at (12, 12)
const HEART_SVG_PATH =
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

export function LoveBubbles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let heartPath: Path2D | null = null;
    try {
      heartPath = new Path2D(HEART_SVG_PATH);
    } catch {
      heartPath = null;
    }

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const isMobile = width < 768;
    const dpr = isMobile ? 1.25 : Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const currentIsMobile = width < 768;
      const currentDpr = currentIsMobile ? 1.25 : Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * currentDpr);
      canvas.height = Math.floor(height * currentDpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(currentDpr, currentDpr);
    };
    resize();

    // Mouse & Touch tracking
    const mouse = {
      x: -9999,
      y: -9999,
      speed: 0,
      active: false,
      prevX: -9999,
      prevY: -9999,
    };

    let lastTrailTime = 0;
    const trailParticles: CursorTrail[] = [];
    const maxParticles = isMobile ? 10 : 16;

    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now();
      const dx = e.clientX - mouse.prevX;
      const dy = e.clientY - mouse.prevY;
      mouse.speed = Math.sqrt(dx * dx + dy * dy);
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;

      // Cursor & touch trail: spawn floating love hearts & micro-bubbles
      const interval = isMobile ? 120 : 100;
      if (now - lastTrailTime > interval && mouse.speed > 3) {
        lastTrailTime = now;
        if (trailParticles.length < maxParticles) {
          trailParticles.push({
            x: mouse.x + (Math.random() - 0.5) * 8,
            y: mouse.y + (Math.random() - 0.5) * 8,
            vx: (Math.random() - 0.5) * (isMobile ? 0.7 : 0.6),
            vy: -Math.random() * 0.7 - 0.4,
            radius: isMobile ? Math.random() * 4 + 4 : Math.random() * 3.5 + 3.5,
            alpha: isMobile ? 0.65 : 0.5,
            life: 0,
            maxLife: isMobile ? 28 : 30,
            isHeart: Math.random() > 0.3,
            isRose: Math.random() > 0.3,
            rotation: (Math.random() - 0.5) * 0.4,
            rotSpeed: (Math.random() - 0.5) * 0.025,
          });
        }
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      // 2 vibrant floating love hearts that burst gently on tap/click
      const burstCount = 2;
      for (let i = 0; i < burstCount; i++) {
        if (trailParticles.length >= maxParticles) {
          trailParticles.shift();
        }
        const angle = (Math.PI * 2 * i) / burstCount + (Math.random() - 0.5) * 0.45;
        const speed = Math.random() * 1.2 + 0.6;
        trailParticles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.55,
          radius: isMobile ? Math.random() * 4.5 + 4.5 : Math.random() * 4 + 4,
          alpha: isMobile ? 0.7 : 0.55,
          life: 0,
          maxLife: 30,
          isHeart: true,
          isRose: Math.random() > 0.35,
          rotation: (Math.random() - 0.5) * 0.4,
          rotSpeed: (Math.random() - 0.5) * 0.025,
        });
      }
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("resize", resize);

    // ------------------------------------------------------------------
    // AMBIENT BUBBLES THAT STICK TO THE PAGE (They do NOT follow scroll!)
    // ------------------------------------------------------------------
    const getDocHeight = () =>
      Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        window.innerHeight * 3
      );

    const docHeight = getDocHeight();
    const bubbleDensity = isMobile
      ? Math.min(Math.max(Math.floor(docHeight / 360), 9), 12)
      : Math.min(Math.max(Math.floor(docHeight / 240), 14), 20);
    const bubbles: PageBubble[] = [];

    for (let i = 0; i < bubbleDensity; i++) {
      const pageY = (docHeight / bubbleDensity) * i + Math.random() * 80;
      bubbles.push({
        pageX: Math.random() * (width - 80) + 40,
        pageY,
        basePageY: pageY,
        radius: isMobile ? Math.random() * 9 + 11 : Math.random() * 10 + 10,
        alpha: isMobile ? Math.random() * 0.07 + 0.18 : Math.random() * 0.06 + 0.14,
        isHeart: i % 2 === 0,
        isRose: i % 3 !== 0,
        phase: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.015 + 0.008,
        repelX: 0,
        repelY: 0,
        repelVx: 0,
        repelVy: 0,
        currentScale: 1.0,
        targetScale: 1.0,
        currentAlphaBoost: 0,
        targetAlphaBoost: 0,
        rotation: (Math.random() - 0.5) * 0.4,
        rotSpeed: (Math.random() - 0.5) * 0.005,
      });
    }

    let isDark = document.documentElement.classList.contains("dark");
    const observer = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains("dark");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Drawing helper for clean 2D heart (no 3D distortion)
    const draw2DHeart = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      radius: number,
      rotation: number,
      fillColor: string,
      strokeColor?: string
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      const scale = (radius * 1.8) / 24;
      ctx.scale(scale, scale);
      ctx.translate(-12, -12);

      if (heartPath) {
        ctx.fillStyle = fillColor;
        ctx.fill(heartPath);
        if (strokeColor) {
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = 1 / scale;
          ctx.stroke(heartPath);
        }
      } else {
        ctx.beginPath();
        const topH = radius * 0.3;
        ctx.moveTo(0, topH);
        ctx.bezierCurveTo(-radius / 2, -topH, -radius, topH / 2, 0, radius);
        ctx.bezierCurveTo(radius, topH / 2, radius / 2, -topH, 0, topH);
        ctx.closePath();
        ctx.fillStyle = fillColor;
        ctx.fill();
        if (strokeColor) {
          ctx.strokeStyle = strokeColor;
          ctx.stroke();
        }
      }
      ctx.restore();
    };

    // Drawing helper for clean 2D glass bubble (geometrically perfect circle, no deformation)
    const draw2DBubble = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      radius: number,
      alpha: number,
      isRose: boolean
    ) => {
      ctx.save();
      ctx.beginPath();
      // True 2D circle
      ctx.arc(x, y, radius, 0, Math.PI * 2);

      const grad = ctx.createRadialGradient(
        x - radius * 0.3,
        y - radius * 0.3,
        radius * 0.08,
        x,
        y,
        radius
      );

      if (isRose) {
        if (isDark) {
          grad.addColorStop(0, "rgba(255, 255, 255, 0.45)");
          grad.addColorStop(0.5, `rgba(226, 59, 150, ${alpha * 0.6})`);
          grad.addColorStop(1, `rgba(226, 59, 150, ${alpha * 1.1})`);
        } else {
          grad.addColorStop(0, "rgba(255, 255, 255, 0.55)");
          grad.addColorStop(0.5, `rgba(249, 238, 241, ${alpha * 0.85})`);
          grad.addColorStop(1, `rgba(198, 14, 128, ${alpha * 0.95})`);
        }
      } else {
        if (isDark) {
          grad.addColorStop(0, "rgba(255, 255, 255, 0.45)");
          grad.addColorStop(0.5, `rgba(212, 185, 104, ${alpha * 0.6})`);
          grad.addColorStop(1, `rgba(212, 185, 104, ${alpha * 1.1})`);
        } else {
          grad.addColorStop(0, "rgba(255, 255, 255, 0.55)");
          grad.addColorStop(0.5, `rgba(253, 243, 220, ${alpha * 0.85})`);
          grad.addColorStop(1, `rgba(201, 168, 76, ${alpha * 0.95})`);
        }
      }

      ctx.fillStyle = grad;
      ctx.fill();

      // Delicate circular rim
      const rimColor = isRose
        ? isDark
          ? `rgba(226, 59, 150, ${alpha * 1.3})`
          : `rgba(198, 14, 128, ${alpha * 1.1})`
        : isDark
        ? `rgba(212, 185, 104, ${alpha * 1.3})`
        : `rgba(201, 168, 76, ${alpha * 1.1})`;

      ctx.strokeStyle = rimColor;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Specular highlight gleam on top-left
      ctx.beginPath();
      ctx.arc(x - radius * 0.32, y - radius * 0.32, radius * 0.22, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.45)" : "rgba(255, 255, 255, 0.65)";
      ctx.fill();

      ctx.restore();
    };

    const render = () => {
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Current vertical scroll position
      const scrollY = window.scrollY || window.pageYOffset || 0;

      // --------------------------------------------------------------
      // 1. RENDER AMBIENT BUBBLES (STUCK TO PAGE, SCROLLS WITH PAGE)
      // --------------------------------------------------------------
      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];

        // Languid in-place breathing floating motion (±8px sway)
        b.phase += b.wobbleSpeed;
        const swayX = Math.sin(b.phase) * 6;
        const swayY = Math.cos(b.phase * 0.8) * 6;
        b.rotation += b.rotSpeed;

        // The bubble sticks to its page location:
        // Screen Y = (pageY + sway) - scrollY
        const screenX = b.pageX + swayX + b.repelX;
        const screenY = b.pageY + swayY + b.repelY - scrollY;

        // If outside current viewport, skip drawing for performance
        if (screenY < -b.radius * 2 || screenY > height + b.radius * 2) {
          continue;
        }

        // Mouse repulsion: clearly and smoothly glides away when cursor is near
        if (mouse.active) {
          const dx = screenX - mouse.x;
          const dy = screenY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const repelRadius = 140;

          if (dist < repelRadius && dist > 1) {
            const norm = 1 - dist / repelRadius; // 0 to 1
            const push = norm * norm * 4.5; // gentle, smooth spring push
            b.repelVx += (dx / dist) * push;
            b.repelVy += (dy / dist) * push;
            b.targetScale = 1 + norm * 0.16; // gentle 16% swell
            b.targetAlphaBoost = norm * 0.08; // subtle hover glow
            b.rotation += (dx > 0 ? 1 : -1) * norm * 0.02;
          } else {
            b.targetScale = 1.0;
            b.targetAlphaBoost = 0;
          }
        } else {
          b.targetScale = 1.0;
          b.targetAlphaBoost = 0;
        }

        // Damped velocity and spring return
        b.repelVx *= 0.86;
        b.repelVy *= 0.86;
        b.repelX = (b.repelX + b.repelVx) * 0.94;
        b.repelY = (b.repelY + b.repelVy) * 0.94;

        b.currentScale += (b.targetScale - b.currentScale) * 0.12;
        b.currentAlphaBoost += (b.targetAlphaBoost - b.currentAlphaBoost) * 0.12;

        const effectiveRadius = b.radius * b.currentScale;
        const effectiveAlpha = Math.min(b.alpha + b.currentAlphaBoost, 0.32);

        if (b.isHeart) {
          const heartFill = b.isRose
            ? isDark
              ? `rgba(226, 59, 150, ${effectiveAlpha * 1.1})`
              : `rgba(198, 14, 128, ${effectiveAlpha * 0.9})`
            : isDark
            ? `rgba(212, 185, 104, ${effectiveAlpha * 1.1})`
            : `rgba(201, 168, 76, ${effectiveAlpha * 0.9})`;

          const heartStroke = b.isRose
            ? isDark
              ? `rgba(226, 59, 150, ${effectiveAlpha * 1.4})`
              : `rgba(198, 14, 128, ${effectiveAlpha * 1.2})`
            : isDark
            ? `rgba(212, 185, 104, ${effectiveAlpha * 1.4})`
            : `rgba(201, 168, 76, ${effectiveAlpha * 1.2})`;

          draw2DHeart(ctx, screenX, screenY, effectiveRadius, b.rotation, heartFill, heartStroke);
        } else {
          draw2DBubble(ctx, screenX, screenY, effectiveRadius, effectiveAlpha, b.isRose);
        }
      }

      // --------------------------------------------------------------
      // 2. RENDER CURSOR LOVE TRAIL (FOLLOWS CURSOR DELICATELY)
      // --------------------------------------------------------------
      for (let i = trailParticles.length - 1; i >= 0; i--) {
        const p = trailParticles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.vx *= 0.96;
        p.vy *= 0.98;

        const progress = p.life / p.maxLife;
        const curAlpha = p.alpha * (1 - progress);

        if (p.life >= p.maxLife || curAlpha <= 0.01) {
          trailParticles.splice(i, 1);
          continue;
        }

        const col = p.isRose
          ? isDark
            ? `rgba(226, 59, 150, ${curAlpha})`
            : `rgba(198, 14, 128, ${curAlpha})`
          : isDark
          ? `rgba(212, 185, 104, ${curAlpha})`
          : `rgba(201, 168, 76, ${curAlpha})`;

        if (p.isHeart) {
          draw2DHeart(ctx, p.x, p.y, p.radius, p.rotation, col);
        } else {
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = col;
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full select-none"
    />
  );
}
