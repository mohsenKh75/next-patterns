"use client";

import NextImage, { ImageProps } from "next/image";
import { useState } from "react";
import clsx from "clsx";

interface Props extends ImageProps {
    smoothPlaceHolder?: boolean;
}

export function ClientImage({ className, smoothPlaceHolder, ...props }: Props) {
    //NOTE: blure placeholder with transition
    const [isLoaded, setIsLoaded] = useState(false);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    return (<NextImage
        {...props}
        src={props.src}
        className={clsx(
            className,
            smoothPlaceHolder &&
            `transition-all ease-in-out duration-700 ${isLoaded
                ? "scale-100 blur-0 opacity-100"
                : "scale-105 blur-lg opacity-60"
            }`
        )}
        onLoadingComplete={handleLoad}
    />)
}