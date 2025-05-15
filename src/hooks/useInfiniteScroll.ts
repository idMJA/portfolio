"use client";

import { useEffect, useRef, useState } from "react";

export function useInfiniteScroll(callback: () => void, threshold = 100) {
	const [isFetching, setIsFetching] = useState(false);
	const observerRef = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		const handleIntersect: IntersectionObserverCallback = (entries) => {
			const firstEntry = entries[0];
			if (firstEntry.isIntersecting && !isFetching) {
				setIsFetching(true);
				callback();
			}
		};

		observerRef.current = new IntersectionObserver(handleIntersect, {
			rootMargin: `0px 0px ${threshold}px 0px`,
		});

		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
		};
	}, [callback, threshold, isFetching]);

	const observe = (element: HTMLElement | null) => {
		if (element && observerRef.current) {
			observerRef.current.observe(element);
		}
	};

	const unobserve = (element: HTMLElement | null) => {
		if (element && observerRef.current) {
			observerRef.current.unobserve(element);
		}
	};

	return { observe, unobserve, isFetching, setIsFetching };
}
