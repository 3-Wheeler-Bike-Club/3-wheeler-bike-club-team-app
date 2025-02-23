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
import { updateMemberBadgeAttestationByPaticularsAction } from "@/app/actions/attestation/updateMemberBadgeAttestationByPaticularsAction"
import { MemberBadgeAttestation } from "@/hooks/attestation/useGetMemberBadgeAttestation"
import { deconstructMemberBadgeAttestationData } from "@/utils/attestation/member/badge/deconstructMemberBadgeAttestationData"




interface FillProps {
    memberBadgeAttestation: MemberBadgeAttestation
    getBackMemberBadgeAttestation: () => void
}

const FormSchema = z.object({
    driverNationalID: z.string(),
    driverLicenseID: z.string(),
    driverHeadshot: z.string(),
    driverAddress: z.string(),
    driverPhone: z.string(),
    guarantorNationalID: z.string(),
    guarantorHeadshot: z.string(),
    guarantorAddress: z.string(),
    guarantorPhone: z.string(),
    
    
})
  

export function Fill({ memberBadgeAttestation, getBackMemberBadgeAttestation }: FillProps) {
    console.log(memberBadgeAttestation)

    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      driverNationalID: undefined,
      driverLicenseID: undefined,
      driverHeadshot: undefined,
      driverAddress: undefined,
      driverPhone: undefined,
      guarantorNationalID: undefined,
      guarantorHeadshot: undefined,
      guarantorAddress: undefined,
    },
  })
  
  async function onDriverFilling() {
    setLoading(true)
    try {
      const driverNationalID = form.watch("driverNationalID")
      const driverLicenseID = form.watch("driverLicenseID")
      const driverHeadshot = form.watch("driverHeadshot")
      const driverAddress = form.watch("driverAddress")
      const driverPhone = form.watch("driverPhone")
      const guarantorNationalID = form.watch("guarantorNationalID")
      const guarantorHeadshot = form.watch("guarantorHeadshot")
      const guarantorAddress = form.watch("guarantorAddress")
      const guarantorPhone = form.watch("guarantorPhone")
      

      if (!driverNationalID || !driverLicenseID || !driverHeadshot || !driverAddress || !driverPhone || !guarantorNationalID || !guarantorHeadshot || !guarantorAddress || !guarantorPhone) {
        return
      }


    const deconstructedMemberBadgeAttestationData = await deconstructMemberBadgeAttestationData(
        [memberBadgeAttestation.address], 
        memberBadgeAttestation.country,
        true,
        true,
        true,
        1,
    )
    const memberBadgeAttested = await attest(deconstructedMemberBadgeAttestationData)

    if (memberBadgeAttested) {
        // Post member badge attestation offchain
        await updateMemberBadgeAttestationByPaticularsAction(
            memberBadgeAttestation.address,
            memberBadgeAttested.attestationId,
            driverNationalID,
            driverLicenseID,
            driverHeadshot,
            driverAddress,
            driverPhone,
            guarantorNationalID,
            guarantorHeadshot,
            guarantorAddress,
            guarantorPhone
        )
        //alert("Member Badge Attested")
    } else {
        //alert("Member Badge Not Attested")
    }
      
      form.reset({
        driverNationalID: "",
        driverLicenseID: "",
        driverHeadshot: "",
        driverAddress: "",
        driverPhone: "",
        guarantorNationalID: "",
        guarantorHeadshot: "",
        guarantorAddress: "",
        guarantorPhone: ""
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
            Upload KYC
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload  KYC</DialogTitle>
          <DialogDescription>
            {"Upload Driver & Guarantor Documents here. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col p-4">
          <Form {...form}>
              <form onSubmit={form.handleSubmit(onDriverFilling)} className="space-y-6">
                  <FormField
                      control={form.control}
                      name="driverNationalID"
                      render={({ field }) => (
                          <FormItem>
                              <div className="flex w-full max-w-sm items-center space-x-2">
                                  <FormLabel className="text-right">Driver National ID</FormLabel>
                                  <FormControl >
                                      <Input className="col-span-3" placeholder={"https://..."} {...field} />
                                  </FormControl>
                              </div>
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="driverLicenseID"
                      render={({ field }) => (
                          <FormItem>
                              <div className="flex w-full max-w-sm items-center space-x-2">
                                  <FormLabel className="text-right">Driver License ID</FormLabel>
                                  <FormControl >
                                      <Input className="col-span-3" placeholder={"https://..."} {...field} />
                                  </FormControl>
                              </div>
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="driverHeadshot"
                      render={({ field }) => (
                          <FormItem>
                              <div className="flex w-full max-w-sm items-center space-x-2">
                                  <FormLabel className="text-right">Driver Headshot</FormLabel>
                                  <FormControl >
                                      <Input className="col-span-3" placeholder={"https://..."} {...field} />
                                  </FormControl>
                              </div>
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="driverAddress"
                      render={({ field }) => (
                          <FormItem>
                              <div className="flex w-full max-w-sm items-center space-x-2">
                                  <FormLabel className="text-right">Driver Address</FormLabel>
                                  <FormControl >
                                      <Input className="col-span-3" placeholder={"https://..."} {...field} />
                                  </FormControl>
                              </div>
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="driverPhone"
                      render={({ field }) => (
                          <FormItem>
                              <div className="flex w-full max-w-sm items-center space-x-2">
                                  <FormLabel className="text-right">Driver Phone</FormLabel>
                                  <FormControl >
                                      <Input className="col-span-3" placeholder={"07777777777"} {...field} />
                                  </FormControl>
                              </div>
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="guarantorNationalID"
                      render={({ field }) => (
                          <FormItem>
                              <div className="flex w-full max-w-sm items-center space-x-2">
                                  <FormLabel className="text-right">Guarantor National ID</FormLabel>
                                  <FormControl >
                                      <Input className="col-span-3" placeholder={"https://..."} {...field} />
                                  </FormControl>
                              </div>
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="guarantorHeadshot"
                      render={({ field }) => (
                          <FormItem>
                              <div className="flex w-full max-w-sm items-center space-x-2">
                                  <FormLabel className="text-right">Guarantor Headshot</FormLabel>
                                  <FormControl >
                                      <Input className="col-span-3" placeholder={"https://..."} {...field} />
                                  </FormControl>
                              </div>
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="guarantorAddress"
                      render={({ field }) => (
                          <FormItem>
                              <div className="flex w-full max-w-sm items-center space-x-2">
                                  <FormLabel className="text-right">Guarantor Address</FormLabel>
                                  <FormControl >
                                      <Input className="col-span-3" placeholder={"https://..."} {...field} />
                                  </FormControl>
                              </div>
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="guarantorPhone"
                      render={({ field }) => (
                          <FormItem>
                              <div className="flex w-full max-w-sm items-center space-x-2">
                                  <FormLabel className="text-right">Guarantor Phone</FormLabel>
                                  <FormControl >
                                      <Input className="col-span-3" placeholder={"07777777777"} {...field} />
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
                    onClick={onDriverFilling}
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
