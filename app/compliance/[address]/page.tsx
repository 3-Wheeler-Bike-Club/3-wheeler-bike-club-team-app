import { getProfileByAddressAction } from "@/app/actions/kyc/getProfileByAddressAction";
import { Wrapper } from "@/components/compliance/address/wrapper";

export default async function Address({ params }: { params: { address: string } }) {

  const user = await getProfileByAddressAction(params.address)
  console.log(user)



  


  return (
    <div className="flex w-screen h-screen">
      <Wrapper address={params.address} user={user!}/>
    </div>
  );
}