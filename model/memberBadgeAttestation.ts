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
        driverNationalID: {
            type: String,
            required: true,
        },
        national: {
            type: Boolean,
            default: false,
            required: true,
        },
        driverLicenseID: {
            type: String,
            required: true,
        },
        driverHeadshot: {
            type: String,
            required: true,
        },
        driverAddress: {
            type: String,
            required: true,
        },
        driverPhone: {
            type: String,
            required: true,
        },
        driver: {
            type: Boolean,
            default: false,
            required: true, 
        },
        guarantorNationalID: {
            type: String,
            required: true,
        },
        guarantorHeadshot: {
            type: String,
            required: true,
        },
        guarantorAddress: {
            type: String,
            required: true,
        },
        guarantorPhone: {
            type: String, 
            required: true,
        },
        guarantor: {
            type: Boolean,
            default: false,
            required: true,
        },
        status: {
            type: Number,
            enum: [0, 1, 2, 3],
            default: 0,
            required: true,
        },
    },
    {
        timestamps: true, // Add timestamps
    }

)

const MemberBadgeAttestation = mongoose.models.MemberBadgeAttestation || mongoose.model("MemberBadgeAttestation", MemberBadgeAttestationSchema)

export default MemberBadgeAttestation