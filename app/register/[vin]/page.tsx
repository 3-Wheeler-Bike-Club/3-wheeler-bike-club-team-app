import { Wrapper } from "@/components/register/vin/wrapper";
import { getOwnerPinkSlipAttestationByVinAction } from "@/app/actions/attestation/getOwnerPinkSlipAttestationByVinAction";
import { OwnerPinkSlipAttestation } from "@/hooks/attestation/useGetOwnerPinkSlipAttestationByInvoice";

export default async function Vin({ params }: { params: { vin: string } }) {

  const ownerPinkSlipAttestation: OwnerPinkSlipAttestation = await getOwnerPinkSlipAttestationByVinAction(params.vin)
  console.log("ownerPinkSlipAttestation", ownerPinkSlipAttestation)


  return (
    <div className="flex w-screen h-screen">
      <Wrapper ownerPinkSlipAttestation={ownerPinkSlipAttestation} />
    </div>
  );
}