export interface IState {
    isErrorOccurred: boolean;
}

/**
 * Комнонент служит для перехвата и обработки ошибок рендера дочерних компонентов
 */
export default class ErrorBoundary extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            isErrorOccurred: false,
        };
    }

    componentDidCatch() {
        this.setState(() => ({ isErrorOccurred: true }));
    }

    render() {
        const { isErrorOccurred } = this.state;
        const { children } = this.props;
        if (isErrorOccurred) {
            return <div className="error-boundary">ERROR OCCURED</div>;
        }
        return children;
    }
}
