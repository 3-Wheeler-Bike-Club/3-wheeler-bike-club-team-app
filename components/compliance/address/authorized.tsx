interface AuthorizedProps {
    address: string
    user: string
}

export function Authorized({ address, user }: AuthorizedProps) {
    return <div>Authorized</div>
}