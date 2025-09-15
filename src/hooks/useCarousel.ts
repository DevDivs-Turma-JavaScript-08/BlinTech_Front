import { useRef, useState, useCallback, useEffect } from "react";
import { type CarouselOptions, type CarouselInstance, Carousel } from "@fancyapps/ui/dist/carousel/";
import "@fancyapps/ui/dist/carousel/carousel.css";
import { canUseDOM } from "@fancyapps/ui/dist/utils/canUseDOM.js";
import { isEqual } from "@fancyapps/ui/dist/utils/isEqual.js";

type Plugins = { [key: string]: object };

export type CarouselContainerRefType = <ContainerElement extends HTMLElement>(el: ContainerElement | null) => void;
export type useCarousel = [CarouselContainerRefType, CarouselInstance | undefined];

export default function useCarousel(options: Partial<CarouselOptions> = {}, plugins?: Plugins): useCarousel {
	const storedOptions = useRef(options);
	const storedPlugins = useRef(plugins);

	const [container, setContainer] = useState<HTMLElement | null>(null);
	const [carouselInstance, setCarouselInstance] = useState<CarouselInstance | undefined>(undefined);

	const reInit = useCallback(() => {
		if (carouselInstance) {
			carouselInstance.destroy().init();
		}
	}, [carouselInstance]);

	useEffect(() => {
		// A linha corrigida
		if (!isEqual(options, storedOptions.current) || !isEqual(plugins || {}, storedPlugins.current || {})) {
			storedOptions.current = options;
			storedPlugins.current = plugins;
			reInit();
		}
	}, [options, plugins, reInit]);

	useEffect(() => {
		if (canUseDOM() && container) {
			const newCarouselInstance = Carousel(container, storedOptions.current, storedPlugins.current as any).init();
			setCarouselInstance(newCarouselInstance);

			return () => {
				newCarouselInstance.destroy();
			};
		} else {
			setCarouselInstance(undefined);
		}
	}, [container]);

	return [setContainer, carouselInstance];
}
