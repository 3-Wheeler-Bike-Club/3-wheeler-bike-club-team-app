import { Wrapper } from "@/components/register/vin/wrapper";


export default async function Vin({ params }: { params: { vin: string } }) {

  return (
    <div className="flex w-screen h-screen">
      <Wrapper vin={params.vin} />
    </div>
  );
}