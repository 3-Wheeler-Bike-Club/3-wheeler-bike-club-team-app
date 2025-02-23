import { Wrapper } from "@/components/assign/address/wrapper";
import { getUsersFromPrivy } from "@/app/actions/privy/getUsersFromPrivy";

export default async function Address({ params }: { params: { address: string } }) {

  const users = await getUsersFromPrivy()
  console.log(users)

  const user = users?.find((user) => {
    const smartWallet = user.linkedAccounts.find(account => account.type === 'smart_wallet');
    return smartWallet?.address.toLowerCase() === params.address.toLowerCase();
  });

  


  return (
    <div className="flex w-screen h-screen">
      <Wrapper address={params.address} driver={user!}/>
    </div>
  );
}