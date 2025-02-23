import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Plus } from "lucide-react"
import { motion } from "framer-motion"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import { attest } from "@/utils/attestation/attest"
import { MemberBadgeAttestation } from "@/hooks/attestation/useGetMemberBadgeAttestation"
import { deconstructMemberBadgeAttestationData } from "@/utils/attestation/member/badge/deconstructMemberBadgeAttestationData"
import { updateMemberBadgeAttestationByStatusAction } from "@/app/actions/attestation/updateMemberBadgeAttestationByStatusAction"
import { OwnerPinkSlipAttestation } from "@/hooks/attestation/useGetOwnerPinkSlipAttestationByInvoice"



interface FillProps {
    memberBadgeAttestation: MemberBadgeAttestation
    ownerPinkSlipAttestation: OwnerPinkSlipAttestation
    getBackMemberBadgeAttestation: () => void
}

const FormSchema = z.object({
    hirePurchaseAgreement: z.string()
    
    
})
  

export function Fill({ memberBadgeAttestation, ownerPinkSlipAttestation, getBackMemberBadgeAttestation }: FillProps) {
    console.log(memberBadgeAttestation)

    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      hirePurchaseAgreement: undefined
    },
  })
  
  async function onHirePurchaseAgreementFilling() {
    setLoading(true)
    try {
      const hirePurchaseAgreement = form.watch("hirePurchaseAgreement")

      if (!hirePurchaseAgreement) {
        return
      }

    const deconstructedMemberBadgeAttestationData = await deconstructMemberBadgeAttestationData(
        [memberBadgeAttestation.address], 
        memberBadgeAttestation.country,
        true,
        true,
        true,
        2,
    )
    const memberBadgeAttested = await attest(deconstructedMemberBadgeAttestationData)

    if (memberBadgeAttested) {
        // attest hire purchase agreement & invoices

        // update member badge attestation offchain
        await updateMemberBadgeAttestationByStatusAction(
            memberBadgeAttestation.address,
            memberBadgeAttested.attestationId,
            2
        )
        //alert("Member Badge Attested")
    } else {
        //alert("Member Badge Not Attested")
    }
      
      form.reset({
        hirePurchaseAgreement: "",
      }, {
        keepDefaultValues: true
      })
      getBackMemberBadgeAttestation()
      setLoading(false)
      setOpen(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
            <Plus className="h-4 w-4"/>
            Assign 3-wheeler
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Agreement & Assign 3-wheeler</DialogTitle>
          <DialogDescription>
            {"Upload Signed Hire Purchase Agreement here. Click save when you're done to assign 3-wheeler."}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col p-4">
          {ownerPinkSlipAttestation && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">VIN</span>
                <span className="text-base font-medium">{ownerPinkSlipAttestation.vin}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">License Plate</span>
                <span className="text-base font-medium">{ownerPinkSlipAttestation.licensePlate}</span>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col p-4">
          <Form {...form}>
              <form onSubmit={form.handleSubmit(onHirePurchaseAgreementFilling)} className="space-y-6">
                  <FormField
                      control={form.control}
                      name="hirePurchaseAgreement"
                      render={({ field }) => (
                          <FormItem>
                              <div className="flex w-full max-w-sm items-center space-x-2">
                                  <FormLabel className="text-right">Hire Purchase Agreement</FormLabel>
                                  <FormControl >
                                      <Input className="col-span-3" placeholder={"https://..."} {...field} />
                                  </FormControl>
                              </div>
                          </FormItem>
                      )}
                  />
              </form>
          </Form>
        </div>
        <DialogFooter>
            <div className="flex `justify`-between">
                <Button
                    className="w-36"
                    //disabled={ownerPinkSlipAttestations?.vins?.length === order.amount}
                    onClick={onHirePurchaseAgreementFilling}
                >
                    {
                        loading
                        ? (
                            <>
                                <motion.div
                                initial={{ rotate: 0 }} // Initial rotation value (0 degrees)
                                animate={{ rotate: 360 }} // Final rotation value (360 degrees)
                                transition={{
                                    duration: 1, // Animation duration in seconds
                                    repeat: Infinity, // Infinity will make it rotate indefinitely
                                    ease: "linear", // Animation easing function (linear makes it constant speed)
                                }}
                            >
                                    <DotsHorizontalIcon/>
                                </motion.div>
                            </>
                        )
                        : (
                            <>
                                Save changes
                            </>
                        )
                    }
                </Button>
            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
