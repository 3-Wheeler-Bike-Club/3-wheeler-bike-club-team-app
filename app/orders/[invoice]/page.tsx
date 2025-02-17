import { Wrapper } from "@/components/orders/invoice/wrapper";
import { getFleetOrderAction } from "@/app/actions/offchain/getFleetOrderAction";
import { OffchainFleetOrder } from "@/hooks/offchain/useGetFleetOrders";

export default async function Invoice({ params }: { params: { invoice: string } }) {

  const order: OffchainFleetOrder = await getFleetOrderAction(params.invoice)
  console.log("order", order)


  return (
    <div className="flex w-screen h-screen">
      <Wrapper order={order} />
    </div>
  );
}