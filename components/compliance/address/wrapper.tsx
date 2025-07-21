interface WrapperProps {    
    address: string
    user: string
}

export function Wrapper({ address, user }: WrapperProps) {
    console.log(user)
    console.log(address)
    return <div>Wrapper</div>
}