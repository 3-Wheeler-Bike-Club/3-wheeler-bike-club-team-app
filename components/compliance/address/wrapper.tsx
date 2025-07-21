interface WrapperProps {    
    address: string
    user: any
}

export function Wrapper({ address, user }: WrapperProps) {
    console.log(user)
    console.log(address)
    return <div>Wrapper</div>
}