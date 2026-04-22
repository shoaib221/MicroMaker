import './box1.css';

export function Box11 ( { children, title, onClick } : { children : React.ReactNode, title?: string, onClick: () => void } ) {

    return (
        <div className="box11" onClick={onClick} >
            <div className="box11a aspect-square p-4">

                {children}
                
            </div>
        </div>
    )

}