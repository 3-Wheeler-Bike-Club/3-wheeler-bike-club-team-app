import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Plus } from "lucide-react"
import { motion } from "framer-motion"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"
import { attest } from "@/utils/attestation/attest"
import { MemberBadgeAttestation } from "@/hooks/attestation/useGetMemberBadgeAttestation"
import { deconstructMemberBadgeAttestationData } from "@/utils/attestation/member/badge/deconstructMemberBadgeAttestationData"
import { updateMemberBadgeAttestationByStatusAction } from "@/app/actions/attestation/updateMemberBadgeAttestationByStatusAction"
import { OwnerPinkSlipAttestation } from "@/hooks/attestation/useGetOwnerPinkSlipAttestationByInvoice"
import { deconstructHirePurchaseAttestationData } from "@/utils/attestation/owner/hirePurchase/deconstructHirePurchaseAttestationData"
import { installments } from "@/utils/constants/misc"
import { weeklyInstallment } from "@/utils/constants/misc"
import { postHirePurchaseAttestationAction } from "@/app/actions/attestation/postHirePurchaseAttestationAction"
import { revoke } from "@/utils/attestation/revoke"
import { deconstructOwnerPinkSlipAttestationData } from "@/utils/attestation/owner/pinkSlip/deconstructOwnerPinkSlipAttestationData"
import { updateOwnerPinkSlipAttestationPostHirePurchaseAction } from "@/app/actions/attestation/updateOwnerPinkSlipAttestationPostHirePurchaseAction"
import { deconstructHirePurchaseInvoiceAttestationData } from "@/utils/attestation/owner/hirePurchase/deconstructHirePurchaseInvoiceAttestationData"
import { postHirePurchaseInvoiceAttestationsAction } from "@/app/actions/attestation/postHirePurchaseInvoiceAttestationsAction"
import { useGetHirePurchaseInvoiceAttestations } from "@/hooks/attestation/useGetHirePurchaseInvoiceAttestations"
import { useGetHirePurchaseAttestation } from "@/hooks/attestation/useGetHirePurchaseAttestation"
import { useGetOwnerPinkSlipAttestationByVin } from "@/hooks/attestation/useGetOwnerPinkSlipAttestationByVin"


interface FillProps {
    address: string
    memberBadgeAttestation: MemberBadgeAttestation
    ownerPinkSlipAttestation: OwnerPinkSlipAttestation
    getBackMemberBadgeAttestation: () => void
}


const FormSchema = z.object({
    hirePurchaseAgreement: z.string(),    
})
  

export function Fill({ address, memberBadgeAttestation, ownerPinkSlipAttestation, getBackMemberBadgeAttestation }: FillProps) {
    console.log(memberBadgeAttestation)

    const [loading, setLoading] = useState(false)
    const [weeklyDates, setWeeklyDates] = useState<Date[]>([])
    console.log(weeklyDates)

    const {hirePurchaseAttestation} = useGetHirePurchaseAttestation(address)
    console.log(hirePurchaseAttestation)

    const {hirePurchaseInvoiceAttestations, getBackHirePurchaseInvoiceAttestations} = useGetHirePurchaseInvoiceAttestations(address)
    console.log(hirePurchaseInvoiceAttestations)

    const {ownerPinkSlipAttestationByVin} = useGetOwnerPinkSlipAttestationByVin(hirePurchaseAttestation?.vin)
    console.log(ownerPinkSlipAttestationByVin)
    
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      hirePurchaseAgreement: undefined,
    },
  })
  const hirePurchaseAgreement = form.watch("hirePurchaseAgreement")


  useEffect(() => {
    async function getWeeklyDates() {
        if (hirePurchaseAgreement) {
            const gracePeriod = new Date()
            gracePeriod.setHours(gracePeriod.getHours() + 48)
            gracePeriod.setHours(23, 59, 59, 999) // Set to last millisecond of the day
            
            const weeklyDates = []
            const startDate = new Date(gracePeriod)
            startDate.setDate(startDate.getDate() + 7) // Add first week after grace period
            
            for (let i = 0; i < installments; i++) {
                const weekDate = new Date(startDate)
                weekDate.setDate(weekDate.getDate() + (i * 7))
                weekDate.setHours(23, 59, 59, 999) // Set each deadline to end of day
                weeklyDates.push(weekDate)
            }
            
            console.log("Weekly payment dates:", weeklyDates)
            setWeeklyDates(weeklyDates)
        }
    }
    getWeeklyDates()
  }, [hirePurchaseAgreement])

  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function onHirePurchaseAgreementFilling() {
    setLoading(true)
    try {
      
      if (!hirePurchaseAgreement) {
        setLoading(false)
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
         // update member badge attestation offchain
         await updateMemberBadgeAttestationByStatusAction(
            memberBadgeAttestation.address,
            memberBadgeAttested.attestationId,
            2
        )


        // attest hire purchase agreement & invoices
        const deconstructedHirePurchaseAttestationData = await deconstructHirePurchaseAttestationData(
            [memberBadgeAttestation.address],
            ownerPinkSlipAttestation.vin,
            weeklyInstallment * installments,
            installments,
            weeklyDates[0],
            weeklyDates[installments-1],
            hirePurchaseAgreement
        )

        const hirePurchaseAttested = await attest(deconstructedHirePurchaseAttestationData)

        if (hirePurchaseAttested) {
            // post hire purchase attestation offchain
            await postHirePurchaseAttestationAction(
                memberBadgeAttestation.address,
                memberBadgeAttested.attestationId,
                hirePurchaseAttested.attestationId,
                ownerPinkSlipAttestation.vin,
                weeklyInstallment * installments,
                installments,
                weeklyDates[0],
                weeklyDates[installments-1],
                hirePurchaseAgreement
            )

            // attest hire purchase agreement & invoices
            const deconstructedOwnerPinkSlipAttestationData = await deconstructOwnerPinkSlipAttestationData(
                [memberBadgeAttestation.address],
                hirePurchaseAttested.attestationId,
                ownerPinkSlipAttestation.vin,
                ownerPinkSlipAttestation.make,
                ownerPinkSlipAttestation.model,
                ownerPinkSlipAttestation.year,
                ownerPinkSlipAttestation.color,
                ownerPinkSlipAttestation.country,
                ownerPinkSlipAttestation.licensePlate,
                ownerPinkSlipAttestation.visualProof,
                ownerPinkSlipAttestation.ownerProof,
                ownerPinkSlipAttestation.transferProof
            )
            //reoke and reattest pink slip attestation
            const revokedOwnerPinkSlipAttestationData = await revoke(ownerPinkSlipAttestation.ownerPinkSlipAttestationID)
            if (revokedOwnerPinkSlipAttestationData) {
                const reAttestedOwnerPinkSlipAttestationData = await attest(deconstructedOwnerPinkSlipAttestationData)
                if (reAttestedOwnerPinkSlipAttestationData) {
                    // update owner pink slip attestation offchain
                    await updateOwnerPinkSlipAttestationPostHirePurchaseAction(
                        ownerPinkSlipAttestation.vin,
                        hirePurchaseAttested.attestationId,
                        reAttestedOwnerPinkSlipAttestationData.attestationId,
                    )
                    // send invoices to driver
                    const hirePurchaseInvoiceAttestationIDs = []
                    for (let i = 0; i < installments; i++) {
                        const deconstructedHirePurchaseInvoiceAttestationData = deconstructHirePurchaseInvoiceAttestationData(
                            [memberBadgeAttestation.address],
                            ownerPinkSlipAttestation.vin,
                            `${i+1}/${installments}`,
                            weeklyInstallment,
                            weeklyDates[i],
                            hirePurchaseAttested.attestationId
                        )
                        const hirePurchaseInvoiceAttested = await attest(deconstructedHirePurchaseInvoiceAttestationData)
                        if (hirePurchaseInvoiceAttested) {
                            hirePurchaseInvoiceAttestationIDs.push(hirePurchaseInvoiceAttested.attestationId)
                        }
                        await sleep(23000);
                        
                    }
                    // store invoices offchain
                    await postHirePurchaseInvoiceAttestationsAction(
                        memberBadgeAttestation.address,
                        hirePurchaseAttested.attestationId,
                        hirePurchaseInvoiceAttestationIDs,
                        ownerPinkSlipAttestation.vin,
                        weeklyDates
                    )
                    getBackHirePurchaseInvoiceAttestations()
                }

            }
            
        }
        
        
        

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
    
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
      
  }

  return (
    <div className="flex flex-col w-full max-w-[66rem] p-6 bg-white rounded-lg shadow-sm">
        <div className="flex justify-between">
            <div className="flex flex-col">
                <h3 className="text-2xl font-semibold mb-4">Upload Agreement & Assign 3-wheeler</h3>
                <p className="mb-6">Upload Signed Hire Purchase Agreement here. Click save when you are done to assign 3-wheeler.</p>
            </div>
            {
                hirePurchaseInvoiceAttestations?.length == 0 && (
                    <div className="flex justify-end mt-6">
                        <Button
                            className="w-40"
                            onClick={onHirePurchaseAgreementFilling}
                        >
                            {loading ? (
                                <motion.div
                                    initial={{ rotate: 0 }}
                                    animate={{ rotate: 360 }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                >
                                    <DotsHorizontalIcon/>
                                </motion.div>
                            ) : (
                                <div className="flex items-center">
                                    <Plus className="h-4 w-4 mr-2"/>
                                    Assign 3-wheeler
                                </div>
                            )}
                        </Button>
                    </div>
                )
            }
        </div>
        
        
        {ownerPinkSlipAttestation && !hirePurchaseAttestation && (
            <>
                <h3 className="text-lg font-semibold mb-4">3-Wheeler Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-500">VIN</span>
                        <span className="text-base">{ownerPinkSlipAttestation.vin}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-500">License Plate</span>
                        <span className="text-base">{ownerPinkSlipAttestation.licensePlate}</span>
                    </div>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onHirePurchaseAgreementFilling)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="hirePurchaseAgreement"
                                render={({ field }) => (
                                    <FormItem>
                                        <span className="text-sm text-gray-500 mb-2">Hire Purchase Agreement</span>
                                        <FormControl>
                                            <Input className="w-full" placeholder={"https://..."} {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            {weeklyDates.length > 0 && (
                                <div>
                                    <div>{weeklyDates[0].toLocaleString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}</div>
                                </div>
                            )}
                        </div>
                    </form>
                </Form>
            </>
        )}
        {hirePurchaseAttestation && ownerPinkSlipAttestationByVin && (
            <>
                <h3 className="text-lg font-semibold mb-4">3-Wheeler Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-500">VIN</span>
                        <span className="text-base">{hirePurchaseAttestation.vin}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-500">License Plate</span>
                        <span className="text-base">{ownerPinkSlipAttestationByVin?.licensePlate}</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Hire Purchase Agreement</span>
                        <span className="text-base">{hirePurchaseAttestation.contract}</span>
                    </div>
                </div>
            </>
        )}
        
       

        
    </div>
  )
}
