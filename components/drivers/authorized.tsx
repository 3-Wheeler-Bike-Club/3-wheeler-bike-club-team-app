import { Menu } from "../topnav/menu";


export function Authorized() {

    

    return (
        <main className="flex h-full w-full">
            <div className="flex flex-col h-full p-4 md:p-6 lg:p-8 w-full gap-6">
                <Menu/>
            </div>
        </main>
    )
}

