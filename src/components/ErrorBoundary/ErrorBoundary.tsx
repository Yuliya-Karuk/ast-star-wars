import errorImg from '@assets/error.png';
import { Component, ErrorInfo, ReactNode } from 'react';
import s from './ErrorBoundary.module.scss';

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
        <div className={s.errorPage}>
          <div className={s.errorContainer}>
            <div className={s.errorContent}>
              <h2 className={s.errorHeading}>Something went wrong. Refresh the page, please.</h2>
              <button type="button" className={s.errorButton} onClick={this.reload}>
                Reload
              </button>
            </div>
            <div className={s.errorImgContainer}>
              <img className={s.errorImg} src={errorImg} alt="Error" />
            </div>
          </div>
        </div>
      );
    }
    return children;
  }
}
