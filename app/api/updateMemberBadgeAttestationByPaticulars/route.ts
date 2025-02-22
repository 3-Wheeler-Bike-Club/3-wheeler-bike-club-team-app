// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import MemberBadgeAttestation from "@/model/memberBadgeAttestation";
import connectDB from "@/utils/db/mongodb";
import { middleware } from "@/utils/middleware";


export  async function POST(
    req: Request,
) {
    
    const authResponse = middleware(req);
    if (authResponse.status !== 200) {
        return authResponse;
    }
    
    const { address, memberBadgeAttestationID, driverNationalID, driverLicenseID, driverHeadshot, driverAddress, driverPhone, guarantorNationalID, guarantorHeadshot, guarantorAddress, guarantorPhone } = await req.json()

    try {
        await connectDB()
        const memberBadgeAttestation = await MemberBadgeAttestation.findOneAndUpdate({ 
            address: address, 
        }, {
            memberBadgeAttestationID: memberBadgeAttestationID,
            driverNationalID: driverNationalID,
            national: true,
            driverLicenseID: driverLicenseID,
            driverHeadshot: driverHeadshot,
            driverAddress: driverAddress,
            driverPhone: driverPhone,
            driver: true,
            guarantorNationalID: guarantorNationalID,
            guarantorHeadshot: guarantorHeadshot,
            guarantorAddress: guarantorAddress,
            guarantorPhone: guarantorPhone,
            guarantor: true,
        }, {
            new: true
        })
        return new Response(JSON.stringify(memberBadgeAttestation))
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}