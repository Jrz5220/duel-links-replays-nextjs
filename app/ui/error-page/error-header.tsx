import styles from './error-page.module.css';
import Image from 'next/image';
import alienPic from '../../../public/images/alien.png';

export default function ErrorHeader({ errorCode }: { errorCode: number }) {
    return (
        <header className={`position-relative ${styles.errorHeader}`}>
            <h1>Error {errorCode}!</h1>
            <picture className={`d-block position-absolute ${styles.alienPicContainer}`}>
                {/* prioritize fetching this image over other images */}
                <Image src={alienPic} alt="Alien" className={`img-fluid ${styles.alienPic}`} width={512} height={512} priority />
            </picture>
        </header>
    );
}