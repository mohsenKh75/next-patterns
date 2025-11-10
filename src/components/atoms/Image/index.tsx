import NextImage, { ImageProps } from "next/image";
import { ClientImage } from "./ClientImage";

//NOTE: switiching component between csr and ssr 

interface Props extends ImageProps {
    csr?: boolean;
}

export function SmartImage({ csr = false, ...props }: Props) {
    if (csr) {
        return <ClientImage {...props} smoothPlaceHolder />;
    }
    return <NextImage {...props} />;
}
