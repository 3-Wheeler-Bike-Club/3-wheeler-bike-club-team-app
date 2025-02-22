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
    
    const { address, memberBadgeAttestationID, country, status } = await req.json()

    try {
        await connectDB()
        const memberBadgeAttestation = await MemberBadgeAttestation.create({ 
            address: address, 
            memberBadgeAttestationID: memberBadgeAttestationID,
            country: country,
            driverNationalID: "https://...",
            national: false,
            driverLicenseID: "https://...",
            driverHeadshot: "https://...",
            driverAddress: "https://...",
            driverPhone: "https://...",
            driver: false,
            guarantorNationalID: "https://...",
            guarantorHeadshot: "https://...",
            guarantorAddress: "https://...",
            guarantorPhone: "https://...",
            guarantor: false,
            status: status
        })
        return new Response(JSON.stringify(memberBadgeAttestation))
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}