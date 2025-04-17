import React from 'react';
import ErrorHeader from './error-header';
import ErrorBody from './error-body';
import styles from './error-page.module.css';

// `React.FC` expects the props to be passed directly as a single object,
// so you need to define the props type separately and pass it to `React.FC`.
interface MyErrorPageProps {
    errorCode: number;
    errorMsg: string;
}

const MyErrorPage: React.FC<MyErrorPageProps> = ({ errorCode, errorMsg }) => {
    return (
        <main className={styles.errorPageContainer}>
            <ErrorHeader errorCode={errorCode} />
            <ErrorBody errorMsg={errorMsg} />
        </main>
    );
};

export default MyErrorPage;