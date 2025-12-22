"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface ImageModalProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageModal({ isOpen, ...props }: ImageModalProps) {
  if (!isOpen) return null;
  return <ImageModalContent {...props} />;
}

function ImageModalContent({
  src,
  alt,
  width = 1200,
  height = 800,
  onClose,
}: Omit<ImageModalProps, "isOpen">) {
  const [isZoomed, setIsZoomed] = useState(false);

  const imageRef = useRef<HTMLDivElement>(null);
  const translate = useRef({ x: 0, y: 0 });
  const startPos = useRef({ x: 0, y: 0 });
  const pointerStart = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const hasMoved = useRef(false);

  const DRAG_THRESHOLD = 5;

  useEffect(() => {
    // Lock body scroll and standard touch actions
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Ignore multi-touch (secondary fingers)
    if (!e.isPrimary) return;

    if (!isZoomed || !imageRef.current) return;

    isDragging.current = true;
    hasMoved.current = false;

    try {
      imageRef.current.setPointerCapture(e.pointerId);
    } catch {}

    pointerStart.current = { x: e.clientX, y: e.clientY };

    startPos.current = {
      x: e.clientX - translate.current.x,
      y: e.clientY - translate.current.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!e.isPrimary) return;

    if (!isDragging.current || !imageRef.current || !isZoomed) return;
    e.preventDefault();

    const moveDistX = Math.abs(e.clientX - pointerStart.current.x);
    const moveDistY = Math.abs(e.clientY - pointerStart.current.y);

    // Threshold check to prevent jitter-clicks
    if (
      !hasMoved.current &&
      moveDistX < DRAG_THRESHOLD &&
      moveDistY < DRAG_THRESHOLD
    ) {
      return;
    }

    hasMoved.current = true;

    const newX = e.clientX - startPos.current.x;
    const newY = e.clientY - startPos.current.y;

    translate.current = { x: newX, y: newY };
    imageRef.current.style.transform = `scale(2.5) translate(${newX / 2.5}px, ${
      newY / 2.5
    }px)`;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!e.isPrimary) return;

    isDragging.current = false;
    if (imageRef.current && imageRef.current.hasPointerCapture(e.pointerId)) {
      try {
        imageRef.current.releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  useEffect(() => {
    if (imageRef.current) {
      if (isZoomed) {
        const { x, y } = translate.current;
        imageRef.current.style.transform = `scale(2.5) translate(${
          x / 2.5
        }px, ${y / 2.5}px)`;
        imageRef.current.style.cursor = "grab";
      } else {
        imageRef.current.style.transform = "scale(1) translate(0px, 0px)";
        imageRef.current.style.cursor = "zoom-in";
        translate.current = { x: 0, y: 0 };
      }
    }
  }, [isZoomed]);

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-md transition-all duration-300 animate-in fade-in zoom-in-95"
      onClick={onClose}
    >
      <div className="relative w-full h-full flex items-center justify-center p-4 overflow-hidden">
        <div
          ref={imageRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onClick={(e) => {
            e.stopPropagation();
            if (!hasMoved.current) setIsZoomed(!isZoomed);
          }}
          className={`
            relative transition-transform duration-200 ease-out touch-none select-none
            ${isZoomed ? "active:cursor-grabbing" : ""}
          `}
          style={{
            transformOrigin: "center center",
            willChange: "transform",
          }}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority
            className="pointer-events-none select-none rounded-sm shadow-2xl"
            style={{
              width: "auto",
              height: "auto",
              maxWidth: "90vw",
              maxHeight: "90vh",
              objectFit: "contain",
            }}
          />
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="fixed top-6 right-6 z-110 text-neutral-400 hover:text-white bg-black/50 hover:bg-red-500/20 rounded-full p-2 border border-white/10 transition-all backdrop-blur-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}