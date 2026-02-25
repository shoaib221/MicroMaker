import './button1.css';

export function Button1({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) {
    return (
        <button onClick={onClick} className="button-1">
            {children}
        </button>
    );
}

