import mongoose from "mongoose"

const MemberBadgeAttestationSchema = new mongoose.Schema(
    {
        address: {
            type: String,
            required: true,
        },
        memberBadgeAttestationID: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        driverID: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true, // Add timestamps
    }
)

const MemberBadgeAttestation = mongoose.models.MemberBadgeAttestation || mongoose.model("MemberBadgeAttestation", MemberBadgeAttestationSchema)

export default MemberBadgeAttestation