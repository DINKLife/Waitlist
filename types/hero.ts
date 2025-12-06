import { ReactNode } from "react";

export interface HeroSlideData {
    id: string;
    title: string;
    backgroundImage: string;
    overlay?: string;
    content: ReactNode;
}

