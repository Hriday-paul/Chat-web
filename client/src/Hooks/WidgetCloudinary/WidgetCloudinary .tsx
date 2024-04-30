import { FC, useEffect, useRef } from "react";

interface WidgetCloudinaryProps {
    updatePhoto: (url: string) => void;
    children: React.ReactNode;
}

const cloudName: string = import.meta.env.VITE_cloudName;
const unsignedUploadPreset: string = import.meta.env.VITE_unsignedUploadPreset;

const WidgetCloudinary: FC<WidgetCloudinaryProps> = ({ updatePhoto, children }) => {
    const cloudinaryRef = useRef<any>(null);
    const WidgetRef = useRef<any>(null);

    useEffect(() => {
        cloudinaryRef.current = (window as any).cloudinary;
        WidgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: cloudName,
            uploadPreset: unsignedUploadPreset,
            cropping: true,
            multiple: false,
            styles: {
                palette: {
                    window: "#000000",
                    sourceBg: "#000000",
                    windowBorder: "#8E9FBF",
                    tabIcon: "#FFFFFF",
                    inactiveTabIcon: "#8E9FBF",
                    menuIcons: "#2AD9FF",
                    link: "#08C0FF",
                    action: "#336BFF",
                    inProgress: "#00BFFF",
                    complete: "#33ff00",
                    error: "#EA2727",
                    textDark: "#000000",
                    textLight: "#FFFFFF"
                },
                fonts: {
                    default: null,
                    "'IBM Plex Sans', sans-serif": {
                        url: "https://fonts.googleapis.com/css?family=IBM+Plex+Sans",
                        active: true
                    }
                }
            }
        }, (error: any, result: any) => {
            try {
                if (!error && result && result.event === "success") {
                    updatePhoto(result.info.secure_url);
                }
            } catch {
                //console.log(err)
            }
        });
    }, []);

    return <div onClick={() => WidgetRef.current.open()}>{children}</div>;
};

export default WidgetCloudinary;
