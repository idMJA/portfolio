"use client";
import { useEffect, useRef } from "react";

interface Petal {
	x: number;
	y: number;
	radius: number;
	speedX: number;
	speedY: number;
	angle: number;
	rotationSpeed: number;
}

const Sakura = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const petalsRef = useRef<Petal[]>([]);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const resize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		resize();
		window.addEventListener("resize", resize);

		// Init petals
		const createPetals = (count: number) => {
			const petals = petalsRef.current;
			petals.length = 0;
			for (let i = 0; i < count; i++) {
				petals.push({
					x: Math.random() * canvas.width,
					y: Math.random() * canvas.height,
					radius: 5 + Math.random() * 5,
					speedX: (-0.2 + Math.random() * 0.4) * 0.7,
					speedY: (0.5 + Math.random() * 1.2) * 0.7,
					angle: Math.random() * 360,
					rotationSpeed: (-0.1 + Math.random() * 0.2) * 0.7,
				});
			}
		};

		createPetals(40); // You can increase this number

		const draw = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = "#ffb6c1"; // Set the exact color #ffb6c1

			for (const petal of petalsRef.current) {
				ctx.save();
				ctx.translate(petal.x, petal.y);
				ctx.rotate((petal.angle * Math.PI) / 180);
				ctx.beginPath();
				ctx.ellipse(0, 0, petal.radius, petal.radius * 0.6, 0, 0, 2 * Math.PI);
				ctx.fill();
				ctx.restore();

				petal.x += petal.speedX;
				petal.y += petal.speedY;
				petal.angle += petal.rotationSpeed;

				if (
					petal.y > canvas.height + 10 ||
					petal.x < -10 ||
					petal.x > canvas.width + 10
				) {
					petal.x = Math.random() * canvas.width;
					petal.y = -10;
				}
			}

			requestAnimationFrame(draw);
		};

		const animationId = requestAnimationFrame(draw);

		return () => {
			window.removeEventListener("resize", resize);
			cancelAnimationFrame(animationId);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
		/>
	);
};

export default Sakura;
