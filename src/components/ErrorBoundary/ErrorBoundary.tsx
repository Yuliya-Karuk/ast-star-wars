import errorImg from '@assets/error.png';
import { Component, ErrorInfo, ReactNode } from 'react';
import styles from './ErrorBoundary.module.scss';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('LOG: This error was caught by Error Boundary', error, errorInfo);
  }

  reload = () => {
    window.location.reload();
  };

  render(): ReactNode {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <div className={styles.errorPage}>
          <div className={styles.errorContainer}>
            <div className={styles.errorContent}>
              <h2 className={styles.errorHeading}>Something went wrong. Refresh the page, please.</h2>
              <button type="button" className={styles.errorButton} onClick={this.reload}>
                Reload
              </button>
            </div>
            <div className={styles.errorImgContainer}>
              <img className={styles.errorImg} src={errorImg} alt="Error" />
            </div>
          </div>
        </div>
      );
    }
    return children;
  }
}
