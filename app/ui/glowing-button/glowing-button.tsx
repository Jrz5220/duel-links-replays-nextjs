import styles from "./glow-btn.module.css";
import Link from "next/link";

export default function GlowingButton({ children, buttonLink, additionalClassNames }: { children: React.ReactNode, buttonLink: string, additionalClassNames?: string }) {
    // children is a ReactNode object, which means it can be anything, from a string | number | ReactElement | Iterable | Promise, etc.
    // the only methods available to ReactNode objects are methods that exist in all of the types mentioned above.
    return (
        <Link href={buttonLink} className={`px-3 py-2 mb-3 me-3 ${additionalClassNames} ${styles.glowBtn}`} target="_blank">
            {children}
        </Link>
    );
}