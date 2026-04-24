import './box1.css';

export function Box11 ( { children, title, onClick } : { children : React.ReactNode, title?: string, onClick: () => void } ) {

    return (
        <div className='p-2 border-2 rounded-lg border-(--color1) hover:border-(--color3) cursor-pointer' onClick={onClick} >
            <div className="text-center rounded-lg p-2 h-30 border-2 border-gray-500 flex flex-col gap-4 text-(--color3) font-bold justify-center items-center w-full">

                {children}
                
            </div>
        </div>
    )

}