interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}
// ButtonProps objects must have a 'children' field

// param:   an object of type ButtonProp
//          children field is required (due to the interface), but className and any additional fields (rest) are optional
export function Button({ children, className, ...rest }: ButtonProps) {
    return(
        <button {...rest} className={className}>
            {children}
        </button>
    );
}