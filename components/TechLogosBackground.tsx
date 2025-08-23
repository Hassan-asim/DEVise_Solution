import React from 'react';

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

const random = (min: number, max: number) => Math.random() * (max - min) + min;

const TechLogosBackground: React.FC = () => {
	return (
		<div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
			<div className="absolute inset-0" style={{ transform: 'translateZ(0)' }}>
				{Array.from({ length: 42 }).map((_, i) => {
					const logo = logos[i % logos.length];
					const left = random(0, 90);
					const top = random(0, 90);
					const size = random(28, 56);
					const duration = random(16, 32);
					const delay = random(0, 14);
					const rotate = random(-12, 12);
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
				100% { transform: translate(24px, -28px) scale(1.06) rotate(6deg); }
			}
			`}</style>
		</div>
	);
};

export default TechLogosBackground;
