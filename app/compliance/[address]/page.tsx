import { Wrapper } from "@/components/compliance/address/wrapper";

export default async function Address({ params }: { params: { address: string } }) {
  


  return (
    <div className="flex w-screen h-screen">
      <Wrapper address={params.address} />
    </div>
  );
}