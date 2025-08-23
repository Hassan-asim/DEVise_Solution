import React from 'react';

const logos = [
	// Core web / frontend
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-plain-wordmark.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/flutter/flutter-original.svg',
	// Backend / APIs
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/fastapi/fastapi-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-plain.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/openapi/openapi-original-wordmark.svg',
	// Languages & tooling
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg',
	// Data / ML / AI
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/tensorflow/tensorflow-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/pytorch/pytorch-original-wordmark.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/numpy/numpy-original-wordmark.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/pandas/pandas-original-wordmark.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/opencv/opencv-original-wordmark.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/jupyter/jupyter-original-wordmark.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/keras/keras-original-wordmark.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/matplotlib/matplotlib-original-wordmark.svg',
	// Mobile / IDEs
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/androidstudio/androidstudio-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/pycharm/pycharm-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/intellij/intellij-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/eclipse/eclipse-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original-wordmark.svg',
	// Design / creative
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/photoshop/photoshop-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/illustrator/illustrator-line.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/canva/canva-original.svg',
	// Platforms / OS
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/ubuntu/ubuntu-original.svg',
	// Other
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/arduino/arduino-original.svg',
	'https://raw.githubusercontent.com/devicons/devicon/master/icons/xml/xml-original.svg',
];

const random = (min: number, max: number) => Math.random() * (max - min) + min;

const TechLogosBackground: React.FC = () => {
	return (
		<div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
			<div className="absolute inset-0" style={{ transform: 'translateZ(0)' }}>
				{Array.from({ length: 36 }).map((_, i) => {
					const logo = logos[i % logos.length];
					const left = random(0, 90);
					const top = random(0, 90);
					const size = random(28, 56);
					const duration = random(14, 28);
					const delay = random(0, 12);
					const driftX = random(-20, 20);
					const rotate = random(-10, 10);
					return (
						<img
							key={i}
							src={logo}
							alt="tech"
							style={{
								position: 'absolute',
								left: `${left}%`,
								top: `${top}%`,
								width: size,
								height: size,
								animation: `floatDrift ${duration}s ease-in-out ${delay}s infinite alternate`,
								filter: 'grayscale(100%)',
								transform: `rotate(${rotate}deg)`
							}}
						/>
					);
				})}
			</div>
			<style>{`
			@keyframes floatDrift {
				0% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
				100% { transform: translate(${random(-20, 20)}px, -24px) scale(1.05) rotate(${random(-8, 8)}deg); }
			}
			`}</style>
		</div>
	);
};

export default TechLogosBackground;
