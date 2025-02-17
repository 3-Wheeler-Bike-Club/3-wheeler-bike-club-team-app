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
import { Select, SelectContent, SelectValue, SelectTrigger, SelectGroup, SelectItem } from "@/components/ui/select"
import { OwnerPinkSlipAttestation } from "@/hooks/attestation/useGetOwnerPinkSlipAttestationByInvoice"




interface FillProps {
    ownerPinkSlipAttestation: OwnerPinkSlipAttestation
}

const FormSchema = z.object({
    licensePlate: z.string(),
    make: z.string(),
    model: z.string(),
    year: z.string(),
})
  

export function Fill({ ownerPinkSlipAttestation }: FillProps) {
    console.log(ownerPinkSlipAttestation)

    const [loading, setLoading] = useState(false)


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      licensePlate: undefined,
      make: undefined,
      model: undefined,
      year: undefined,
    },
  })
  
  async function onOrderFilling() {
    setLoading(true)
    try {
      const licensePlate = form.watch("licensePlate")
      const make = form.watch("make")
      const model = form.watch("model")
      const year = form.watch("year")

      if (!licensePlate || !make || !model || !year) {
        return
      }
/*
      if (ownerPinkSlipAttestations?.vins?.includes(vin)) {
        alert("This VIN has already been added")
        return
      }
*/     
      
      form.reset({
        licensePlate: "",
        make: "",
        model: "",
        year: ""
      }, {
        keepDefaultValues: true
      })
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  return (
    <Dialog>
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
                      name="make"
                      render={({ field }) => (
                          <FormItem>
                              <div className="flex w-full max-w-sm items-center space-x-2">
                                  <FormLabel className="text-right">Visual Proof</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value} {...field} >
                                    <FormControl>
                                    <SelectTrigger className='col-span-3'>
                                        <SelectValue placeholder='Select make' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className='col-span-3'>
                                        <SelectGroup>
                                            <SelectItem value="TVS">
                                                TVS
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                  </Select>
                              </div>
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="model"
                      render={({ field }) => (
                          <FormItem>
                              <div className="flex w-full max-w-sm items-center space-x-2">
                                  <FormLabel className="text-right">Owner Proof</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value} {...field} >
                                    <FormControl>
                                    <SelectTrigger className='col-span-3'>
                                        <SelectValue placeholder='Select model' />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className='col-span-3'>
                                        <SelectGroup>
                                            <SelectItem value="King Deluxe Plus">
                                                King Deluxe Plus
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
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
