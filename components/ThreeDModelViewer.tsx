/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeDModelViewerProps {
  modelType: 'cyber-cube' | 'hologram-torus' | 'neural-sphere' | 'spatial-prism' | 'quantum-core';
  accentColor?: string;
  className?: string;
}

const ThreeDModelViewer: React.FC<ThreeDModelViewerProps> = ({ 
  modelType, 
  accentColor = '#06b6d4',
  className = "w-full h-48"
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 200;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    meshRef.current = group;
    scene.add(group);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const pLight = new THREE.PointLight(new THREE.Color(accentColor), 20, 30);
    pLight.position.set(3, 3, 4);
    scene.add(pLight);

    const pLight2 = new THREE.PointLight(0xa855f7, 15, 30);
    pLight2.position.set(-3, -2, -2);
    scene.add(pLight2);

    // Construct procedural 3D model according to type
    if (modelType === 'cyber-cube') {
      // Voxel/Cube Grid
      const boxGeom = new THREE.BoxGeometry(1.5, 1.5, 1.5);
      const boxMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(accentColor),
        metalness: 0.8,
        roughness: 0.2,
        clearcoat: 0.9
      });
      const boxMesh = new THREE.Mesh(boxGeom, boxMat);
      group.add(boxMesh);

      const wireGeom = new THREE.BoxGeometry(1.7, 1.7, 1.7);
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.3
      });
      group.add(new THREE.Mesh(wireGeom, wireMat));
    } else if (modelType === 'hologram-torus') {
      const torusGeom = new THREE.TorusGeometry(1.2, 0.4, 24, 60);
      const torusMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(accentColor),
        wireframe: true,
        emissive: new THREE.Color(accentColor),
        emissiveIntensity: 0.4
      });
      group.add(new THREE.Mesh(torusGeom, torusMat));

      const innerSphere = new THREE.SphereGeometry(0.5, 16, 16);
      const innerMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.9,
        roughness: 0.1
      });
      group.add(new THREE.Mesh(innerSphere, innerMat));
    } else if (modelType === 'neural-sphere') {
      const sphereGeom = new THREE.IcosahedronGeometry(1.3, 2);
      const sphereMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(accentColor),
        wireframe: true,
        emissive: new THREE.Color(accentColor),
        emissiveIntensity: 0.3
      });
      group.add(new THREE.Mesh(sphereGeom, sphereMat));

      // Surrounding particle cloud
      const pCount = 80;
      const pGeom = new THREE.BufferGeometry();
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const r = 1.6 + Math.random() * 0.6;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pPos[i * 3 + 2] = r * Math.cos(phi);
      }
      pGeom.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 });
      group.add(new THREE.Points(pGeom, pMat));
    } else if (modelType === 'spatial-prism') {
      const prismGeom = new THREE.ConeGeometry(1.4, 2.2, 4);
      const prismMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(accentColor),
        metalness: 0.9,
        roughness: 0.1,
        clearcoat: 1
      });
      const prismMesh = new THREE.Mesh(prismGeom, prismMat);
      prismMesh.rotation.x = Math.PI / 4;
      group.add(prismMesh);
    } else {
      // Quantum Core default
      const octaGeom = new THREE.OctahedronGeometry(1.4, 1);
      const octaMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(accentColor),
        metalness: 0.85,
        roughness: 0.15
      });
      group.add(new THREE.Mesh(octaGeom, octaMat));

      const ringGeom = new THREE.RingGeometry(1.8, 1.9, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5
      });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.rotation.x = Math.PI / 2.5;
      group.add(ring);
    }

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.015;
        meshRef.current.rotation.x += 0.008;
      }
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [modelType, accentColor]);

  return <div ref={mountRef} className={className} />;
};

export default ThreeDModelViewer;
