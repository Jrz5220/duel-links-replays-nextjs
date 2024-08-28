import styles from "./glow-btn.module.css";
import Link from "next/link";

export default function GlowingButton({ children, buttonLink }: { children: React.ReactNode, buttonLink: string }) {
    return (
        <Link href={buttonLink} className={`px-3 py-2 mb-3 me-3 ${styles.glowBtn}`} target="_blank">
            {children}
        </Link>
    );
}