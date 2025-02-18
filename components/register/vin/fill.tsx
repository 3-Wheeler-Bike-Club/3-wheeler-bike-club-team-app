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
import { OwnerPinkSlipAttestation } from "@/hooks/attestation/useGetOwnerPinkSlipAttestationByInvoice"
import { deconstructOwnerPinkSlipAttestationData } from "@/utils/attestation/owner/pinkSlip/deconstructOwnerPinkSlipAttestationData"
import { attest } from "@/utils/attestation/attest"
import { updateOwnerPinkSlipAttestationPostRegisterAction } from "@/app/actions/attestation/updateOwnerPinkSlipAttestationPostRegisterAction"




interface FillProps {
    ownerPinkSlipAttestationByVin: OwnerPinkSlipAttestation
    getBackOwnerPinkSlipAttestationByVin: () => void
}

const FormSchema = z.object({
    licensePlate: z.string(),
    visualProofOne: z.string(),
    visualProofTwo: z.string(),
    visualProofThree: z.string(),
    visualProofFour: z.string(),
    ownerProof: z.string(),
    
})
  

export function Fill({ ownerPinkSlipAttestationByVin, getBackOwnerPinkSlipAttestationByVin }: FillProps) {
    console.log(ownerPinkSlipAttestationByVin)

    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      licensePlate: undefined,
      visualProofOne: undefined,
    },
  })
  
  async function onOrderFilling() {
    setLoading(true)
    try {
      const licensePlate = form.watch("licensePlate")
      const visualProofOne = form.watch("visualProofOne")
      const visualProofTwo = form.watch("visualProofTwo")
      const visualProofThree = form.watch("visualProofThree")
      const visualProofFour = form.watch("visualProofFour")
      const ownerProof = form.watch("ownerProof") 

      if (!licensePlate || !visualProofOne || !visualProofTwo || !visualProofThree || !visualProofFour || !ownerProof) {
        return
      }
/*
      if (ownerPinkSlipAttestations?.vins?.includes(vin)) {
        alert("This VIN has already been added")
        return
      }
*/     

    const deconstructedOwnerPinkSlipAttestationData = await deconstructOwnerPinkSlipAttestationData(
        [ownerPinkSlipAttestationByVin.address], 
        ownerPinkSlipAttestationByVin.vin,
        ownerPinkSlipAttestationByVin.make,
        ownerPinkSlipAttestationByVin.model,
        ownerPinkSlipAttestationByVin.year,
        ownerPinkSlipAttestationByVin.color,
        ownerPinkSlipAttestationByVin.country,
        licensePlate,
        [
            visualProofOne,
            visualProofTwo,
            visualProofThree,
            visualProofFour
        ],
        ownerProof,
        "0xPending"
    )
    const ownerPinkSlipAttested = await attest(deconstructedOwnerPinkSlipAttestationData)

    if (ownerPinkSlipAttested) {
        // Post owner pink slip attestation offchain
        await updateOwnerPinkSlipAttestationPostRegisterAction(
            ownerPinkSlipAttested.attestationId,
            ownerPinkSlipAttestationByVin.vin,
            licensePlate,
            [
                visualProofOne,
                visualProofTwo,
                visualProofThree,
                visualProofFour
            ],
            ownerProof,
        )
        //alert("Owner Pink Slip Attested")
    } else {
        //alert("Owner Pink Slip Not Attested")
    }
      
      form.reset({
        licensePlate: "",
        visualProofOne: "",
        visualProofTwo: "",
        visualProofThree: "",
        visualProofFour: "",
        ownerProof: ""
      }, {
        keepDefaultValues: true
      })
      getBackOwnerPinkSlipAttestationByVin()
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
            Fill Register
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Fill Register</DialogTitle>
          <DialogDescription>
            {"Register DVLA information and upload docs here. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col p-4">
          <Form {...form}>
              <form onSubmit={form.handleSubmit(onOrderFilling)} className="space-y-6">
                  <FormField
                      control={form.control}
                      name="licensePlate"
                      render={({ field }) => (
                          <FormItem>
                              <div className="flex w-full max-w-sm items-center space-x-2">
                                  <FormLabel className="text-right">License No.</FormLabel>
                                  <FormControl >
                                      <Input className="col-span-3" placeholder={"AS7854"} {...field} />
                                  </FormControl>
                              </div>
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="visualProofOne"
                      render={({ field }) => (
                          <FormItem>
                              <div className="flex w-full max-w-sm items-center space-x-2">
                                  <FormLabel className="text-right">Visual Proof #1</FormLabel>
                                  <FormControl >
                                      <Input className="col-span-3" placeholder={"AS7854"} {...field} />
                                  </FormControl>
                              </div>
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="visualProofTwo"
                      render={({ field }) => (
                          <FormItem>
                              <div className="flex w-full max-w-sm items-center space-x-2">
                                  <FormLabel className="text-right">Visual Proof #2</FormLabel>
                                  <FormControl >
                                      <Input className="col-span-3" placeholder={"https://..."} {...field} />
                                  </FormControl>
                              </div>
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="visualProofThree"
                      render={({ field }) => (
                          <FormItem>
                              <div className="flex w-full max-w-sm items-center space-x-2">
                                  <FormLabel className="text-right">Visual Proof #3</FormLabel>
                                  <FormControl >
                                      <Input className="col-span-3" placeholder={"https://..."} {...field} />
                                  </FormControl>
                              </div>
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="visualProofFour"
                      render={({ field }) => (
                          <FormItem>
                              <div className="flex w-full max-w-sm items-center space-x-2">
                                  <FormLabel className="text-right">Visual Proof #4</FormLabel>
                                  <FormControl >
                                      <Input className="col-span-3" placeholder={"https://..."} {...field} />
                                  </FormControl>
                              </div>
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="ownerProof"
                      render={({ field }) => (
                          <FormItem>
                              <div className="flex w-full max-w-sm items-center space-x-2">
                                  <FormLabel className="text-right">Owner Proof</FormLabel>
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
                    onClick={onOrderFilling}
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
