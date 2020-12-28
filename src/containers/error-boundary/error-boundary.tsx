export interface IState {
    isErrorOccurred: boolean;
}

/**
 * Комнонент служит для перехвата и обработки ошибок рендера дочерних компонентов
 */
export default class ErrorBoundary extends React.Component<{}, IState> {
    state = {
        isErrorOccurred: false,
    };

    componentDidCatch() {
        this.setState(() => ({ isErrorOccurred: true }));
    }

    render() {
        const { isErrorOccurred } = this.state;
        if (isErrorOccurred) {
            return <div className="error-boundary">ERROR OCCURED</div>;
        }
        return this.props.children;
    }
}
