import React, { useEffect, useMemo, useRef } from 'react';

const logos = [
	// AI / Data stack
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/tensorflow/tensorflow-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/pytorch/pytorch-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/anaconda/anaconda-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/jupyter/jupyter-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/numpy/numpy-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/pandas/pandas-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/opencv/opencv-original.svg',
	// Web frontend
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/angularjs/angularjs-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-original.svg',
	// Backend / frameworks
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-plain.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/flask/flask-original.svg',
	// Languages
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/go/go-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/ruby/ruby-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/r/r-original.svg',
	// DevOps / tools
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/gitlab/gitlab-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/kubernetes/kubernetes-plain.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/bash/bash-original.svg',
	// Additional common tools
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/photoshop/photoshop-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/illustrator/illustrator-line.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/canva/canva-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original-wordmark.svg',
];

interface Bubble {
	el: HTMLImageElement;
	x: number;
	y: number;
	vx: number;
	vy: number;
	r: number;
}

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

const TechLogosBackground: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const imgRefs = useRef<Array<HTMLImageElement | null>>([]);
	const bubblesRef = useRef<Bubble[]>([]);
	const rafRef = useRef<number | null>(null);
	const boundsRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

	const items = useMemo(() => {
		// render up to 36 items for performance
		const count = Math.min(36, logos.length);
		return Array.from({ length: count }, (_, i) => logos[i % logos.length]);
	}, []);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const measure = () => {
			const rect = container.getBoundingClientRect();
			boundsRef.current = { w: rect.width, h: rect.height };
		};
		measure();
		const onResize = () => measure();
		window.addEventListener('resize', onResize);

		// seed bubbles with no initial overlap (simple attempts)
		const bubbles: Bubble[] = [];
		const maxAttempts = 1000;
		imgRefs.current.forEach((el) => {
			if (!el) return;
			const r = rand(14, 28);
			let attempts = 0;
			let x = 0, y = 0;
			while (attempts++ < maxAttempts) {
				x = rand(r, boundsRef.current.w - r);
				y = rand(r, boundsRef.current.h - r);
				let ok = true;
				for (const b of bubbles) {
					const dx = x - b.x, dy = y - b.y;
					if (Math.hypot(dx, dy) < r + b.r + 6) { ok = false; break; }
				}
				if (ok) break;
			}
			const speed = rand(40, 90); // px/sec (faster)
			const angle = rand(0, Math.PI * 2);
			const vx = Math.cos(angle) * speed;
			const vy = Math.sin(angle) * speed;
			el.style.width = `${r * 2}px`;
			el.style.height = `${r * 2}px`;
			el.style.left = `${x - r}px`;
			el.style.top = `${y - r}px`;
			el.style.transform = `translate3d(0,0,0)`;
			el.style.filter = 'grayscale(100%)';
			bubbles.push({ el, x, y, vx, vy, r });
		});
		bubblesRef.current = bubbles;

		let last = performance.now();
		const step = (now: number) => {
			const dt = Math.min(0.05, (now - last) / 1000); // cap dt
			last = now;
			const { w, h } = boundsRef.current;
			const arr = bubblesRef.current;

			// integrate
			for (let i = 0; i < arr.length; i++) {
				const b = arr[i];
				b.x += b.vx * dt;
				b.y += b.vy * dt;
				// wall bounce
				if (b.x - b.r < 0) { b.x = b.r; b.vx *= -1; }
				if (b.x + b.r > w) { b.x = w - b.r; b.vx *= -1; }
				if (b.y - b.r < 0) { b.y = b.r; b.vy *= -1; }
				if (b.y + b.r > h) { b.y = h - b.r; b.vy *= -1; }
			}
			// simple pairwise collision resolve (repel & swap velocity components)
			for (let i = 0; i < arr.length; i++) {
				for (let j = i + 1; j < arr.length; j++) {
					const a = arr[i], c = arr[j];
					const dx = c.x - a.x, dy = c.y - a.y;
					const dist = Math.hypot(dx, dy);
					const minDist = a.r + c.r + 2;
					if (dist > 0 && dist < minDist) {
						// push apart
						const overlap = (minDist - dist) / 2;
						const nx = dx / dist, ny = dy / dist;
						a.x -= nx * overlap; a.y -= ny * overlap;
						c.x += nx * overlap; c.y += ny * overlap;
						// bounce (swap normal components)
						const vaN = a.vx * nx + a.vy * ny;
						const vcN = c.vx * nx + c.vy * ny;
						const diff = vcN - vaN;
						a.vx += diff * nx; a.vy += diff * ny;
						c.vx -= diff * nx; c.vy -= diff * ny;
					}
				}
			}
			// draw
			for (const b of arr) {
				b.el.style.transform = `translate3d(${b.x - b.r}px, ${b.y - b.r}px, 0)`;
			}
			rafRef.current = requestAnimationFrame(step);
		};
		rafRef.current = requestAnimationFrame(step);

		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
			window.removeEventListener('resize', onResize);
		};
	}, [items.length]);

	return (
		<div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden opacity-25">
			{items.map((src, i) => (
				<img
					key={i}
					src={src}
					alt="tech"
					ref={(el) => (imgRefs.current[i] = el)}
					style={{ position: 'absolute', willChange: 'transform' }}
				/>
			))}
		</div>
	);
};

export default TechLogosBackground;
