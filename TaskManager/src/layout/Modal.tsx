
type modalProps = {
    children : React.ReactNode,
    className?: string
}


const Modal = ({children , className}:modalProps) => {
    return (
        <div className={`modal opacity-100 visible z-50 pointer-events-auto ${className}`}>
            {children}
        </div>
    );
};


export default Modal;