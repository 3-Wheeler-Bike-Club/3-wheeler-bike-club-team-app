interface AuthorizedProps {
    address: string
    user: string
}

export function Authorized({ address, user }: AuthorizedProps) {
    console.log(address)
    console.log(user)
    return <div>Authorized</div>
}