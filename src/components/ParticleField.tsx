"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

const vertexShader = `
precision highp float;
varying vec2 vUv;
varying float vFrontShadow;
varying vec3 vColor;
uniform float uTime;
uniform float uSpeed;
uniform float uDepth;
uniform float uCamber;
uniform vec2 uMouse;

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main() {
  vUv = uv;
  vec3 new_position = position;
  float width = 150.0;
  float height = 150.0;
  float time = uTime * uSpeed;
  float distanceFromCenter = distance(position, vec3(0.0, 0.0, 0.0));
  float depth = map(distanceFromCenter, 0.0, sqrt((width*width) + (height*height)), uDepth, -uDepth);
  vFrontShadow = depth;
  float angle = (position.y + position.x) * 0.001;
  float offset = sin(angle) * cos(angle);
  new_position.z += (sin(time + offset) + cos(time * 0.5)) * uCamber;
  new_position.y += sin(time + angle) * (uCamber * 10.0);
  float newDepth = depth;
  new_position.z += newDepth;
  float viewZ = newDepth * 0.001;
  float x = (new_position.x - width/2.0) * viewZ + width/2.0;
  float y = (new_position.y - height/2.0) * viewZ + height/2.0;
  new_position.xy = vec2(x, y);
  float d = distance(uMouse, new_position.xy);
  float c = 100.0;
  if (d < c) {
    vec2 dir = normalize(new_position.xy - uMouse);
    float force = cos(d / c * 3.1415926 / 2.0) * -100.0 * viewZ;
    new_position.xy += dir * force;
  }
  vec4 modelViewPosition = modelViewMatrix * vec4(new_position, 1.0);
  gl_Position = projectionMatrix * modelViewPosition;
  vColor = mix(vec3(0.75, 0.65, 0.6), vec3(1.0, 0.36, 0.11), depth);
}
`;

const fragmentShader = `
precision highp float;
varying vec3 vColor;
varying float vFrontShadow;

void main() {
  vec3 color = vColor;
  color *= (vFrontShadow + 0.5);
  gl_FragColor = vec4(color, 1.0);
}
`;

export default function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const cols = isMobile ? 24 : 48;
    const rows = isMobile ? 16 : 32;
    const linesPerCol = isMobile ? 15 : 30;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfafafa);

    const camera = new THREE.PerspectiveCamera(
      75,
      container.offsetWidth / container.offsetHeight,
      0.1,
      1000
    );
    camera.position.z = 120;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const uniforms = {
      uTime: { value: 0 },
      uSpeed: { value: 0.3 },
      uDepth: { value: 40.0 },
      uCamber: { value: 0.5 },
      uMouse: { value: new THREE.Vector2(9999, 9999) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
    });

    const gridWidth = 150;
    const gridHeight = 150;
    const totalPoints = cols * rows * linesPerCol;
    const positions = new Float32Array(totalPoints * 3);

    let index = 0;
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const startX = (c / cols) * gridWidth - gridWidth / 2;
        const startY = (r / rows) * gridHeight - gridHeight / 2;
        for (let l = 0; l < linesPerCol; l++) {
          const x = startX + (Math.random() - 0.5) * 0.5;
          const y = startY + (Math.random() - 0.5) * 0.5;
          const z = (l / linesPerCol) * 20 - 10;
          positions[index++] = x;
          positions[index++] = y;
          positions[index++] = z;
        }
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * gridWidth;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height - 0.5) * gridHeight;
    };

    const onMouseLeave = () => {
      mouseRef.current.x = 9999;
      mouseRef.current.y = 9999;
    };

    container.addEventListener("mousemove", onMouseMove, { passive: true });
    container.addEventListener("mouseleave", onMouseLeave);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const startTime = Date.now();
    let isActive = true;

    const animate = () => {
      if (!isActive) return;
      uniforms.uTime.value = (Date.now() - startTime) * 0.001;
      uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
      renderer.render(scene, camera);
      if (!prefersReducedMotion) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    const onResize = () => {
      if (!container) return;
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", onResize);

    return () => {
      isActive = false;
      cancelAnimationFrame(frameRef.current);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
      }}
    />
  );
}
