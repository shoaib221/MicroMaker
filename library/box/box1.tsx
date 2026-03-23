import './box1.css';

export function Box11 ( { children, title } : { children : React.ReactNode, title?: string } ) {

    return (
        <div className="box11">
            <div className="box11a aspect-square p-4">

                {children}
                
            </div>
        </div>
    )

}