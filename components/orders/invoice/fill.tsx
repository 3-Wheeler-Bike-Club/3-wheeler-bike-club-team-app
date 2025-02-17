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
import { OffchainFleetOrder } from "@/hooks/offchain/useGetFleetOrders"
import { OwnerPinkSlipAttestations } from "./authorized"
import { Select, SelectContent, SelectValue, SelectTrigger, SelectGroup, SelectItem } from "@/components/ui/select"
import { Countries } from "@/utils/constants/countries"




interface FillProps {
    order: OffchainFleetOrder
    ownerPinkSlipAttestations: OwnerPinkSlipAttestations | null
    setOwnerPinkSlipAttestations: React.Dispatch<React.SetStateAction<OwnerPinkSlipAttestations | null>>
}

const FormSchema = z.object({
    vin: z.string(),
    make: z.string(),
    model: z.string(),
    year: z.string(),
    color: z.string(),
    country: z.string(),
})
  

export function Fill({ order, ownerPinkSlipAttestations, setOwnerPinkSlipAttestations }: FillProps) {

    const countries = Object.keys(Countries);

    //const [loading, setLoading] = useState(false)


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      vin: undefined,
      make: undefined,
      model: undefined,
      year: undefined,
      color: undefined,
      country: undefined,
    },
  })
  
  async function onOrderFilling() {
    try {
      const vin = form.watch("vin")
      const make = form.watch("make")
      const model = form.watch("model")
      const year = form.watch("year")
      const color = form.watch("color")
      const country = form.watch("country")

      if (!vin || !make || !model || !year || !color || !country) {
        return
      }

      if (ownerPinkSlipAttestations?.vins?.includes(vin)) {
        alert("This VIN has already been added")
        return
      }
      
      setOwnerPinkSlipAttestations((prev: OwnerPinkSlipAttestations | null) => ({
        addresses: [...(prev?.addresses || []), order.address],
        invoices: [...(prev?.invoices || []), order.invoice],
        hirePurchaseAttestationIDs: [...(prev?.hirePurchaseAttestationIDs || []), "0xDEAD"],
        ownerPinkSlipAttestationIDs: [...(prev?.ownerPinkSlipAttestationIDs || []), "0xDEAD"],
        vins: [...(prev?.vins || []), vin],
        makes: [...(prev?.makes || []), make],
        models: [...(prev?.models || []), model], 
        years: [...(prev?.years || []), year],
        colors: [...(prev?.colors || []), color],
        countries: [...(prev?.countries || []), country],
        licensePlates: [...(prev?.licensePlates || []), "0xDEAD"],
        visualProofs: [...(prev?.visualProofs || []), ["0xDEAD"]],
        ownerProofs: [...(prev?.ownerProofs || []), "0xDEAD"],
        transferProofs: [...(prev?.transferProofs || []), "0xDEAD"]
      }))

      form.reset({
        vin: "",
        make: "",
        model: "",
        year: "",
        color: "",
        country: ""
      }, {
        keepDefaultValues: true
      })


      

      
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
            <Plus className="h-4 w-4"/>
            Fill Order
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Fill Order</DialogTitle>
          <DialogDescription>
            {"Fill the order details here. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col p-4">
          <Form {...form}>
              <form onSubmit={form.handleSubmit(onOrderFilling)} className="space-y-6">
                  <FormField
                      control={form.control}
                      name="vin"
                      render={({ field }) => (
                          <FormItem>
                              <div className="flex w-full max-w-sm items-center space-x-2">
                                  <FormLabel className="text-right">VIN</FormLabel>
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
                                  <FormLabel className="text-right">Make</FormLabel>
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
                                  <FormLabel className="text-right">Model</FormLabel>
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
                  <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                          <FormItem>
                              <div className="flex w-full max-w-sm items-center space-x-2">
                                  <FormLabel className="text-right">Year</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value} {...field} >
                                    <FormControl>
                                    <SelectTrigger className='col-span-3'>
                                        <SelectValue placeholder='Select year' />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className='col-span-3'>
                                        <SelectGroup>
                                        <SelectItem value="2025">
                                                    2025
                                        </SelectItem> 
                                        <SelectItem value="2024">
                                                    2024
                                        </SelectItem> 
                                        <SelectItem value="2023">
                                                    2023
                                        </SelectItem> 
                                        <SelectItem value="2022">
                                                    2022
                                        </SelectItem> 
                                        <SelectItem value="2021">
                                                    2021
                                        </SelectItem>
                                        <SelectItem value="2020">
                                                    2020
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
                      name="color"
                      render={({ field }) => (
                          <FormItem>
                              <div className="flex w-full max-w-sm items-center space-x-2">
                                  <FormLabel className="text-right">Color</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value} {...field} >
                                    <FormControl>
                                    <SelectTrigger className='col-span-3'>
                                        <SelectValue placeholder='Choose color' />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className='col-span-3'>
                                        <SelectGroup>
                                        <SelectItem value="Green    ">
                                                    Green
                                        </SelectItem> 
                                        <SelectItem value="Yellow">
                                                    Yellow
                                        </SelectItem> 
                                        <SelectItem value="Red">
                                                    Red
                                        </SelectItem> 
                                        <SelectItem value="Blue">
                                                    Blue
                                        </SelectItem> 
                                        <SelectItem value="Black">
                                                    Black
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
                      name="country"
                      render={({ field }) => (
                          <FormItem>
                              <div className="flex w-full max-w-sm items-center space-x-2">
                                  <FormLabel className="text-right">Country</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value} {...field} >
                                    <FormControl>
                                    <SelectTrigger className='col-span-3'>
                                        <SelectValue placeholder='Select a Country' />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className='col-span-3'>
                                        <SelectGroup>
                                            {countries!.map((country) => (
                                                <SelectItem
                                                    key={country}
                                                    value={country}
                                                >
                                                    {country}
                                                </SelectItem> 
                                            ))}
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
                    disabled={ownerPinkSlipAttestations?.vins?.length === order.amount}
                    onClick={onOrderFilling}
                >
                    Save changes
                </Button>
            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
