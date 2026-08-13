"use client";

import { useEffect, useRef } from "react";

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const points: {
    x: number;
    y: number;
    life: number;
    }[] = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();

    const move = (e: MouseEvent) => {
      points.push({
        x: e.clientX,
        y: e.clientY,
        life: 1,
    });

      if (points.length > 35) {
        points.shift();
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", move);

    let animFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.lineCap = "round";
      for (let i = points.length - 1; i >= 0; i--) {
        points[i].life -= 0.03;

        if (points[i].life <= 0) {
          points.splice(i, 1);
        }
      }

      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const current = points[i];

        const alpha = points[i].life;
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(current.x, current.y);

        ctx.strokeStyle = `rgba(234,179,8,${alpha})`;
        ctx.lineWidth = alpha * 8;

        ctx.stroke();
      }

      animFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", move);
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  );
}