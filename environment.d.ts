declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_PROJECT_ID: string
            MONGO: string
            WHEELER_API_KEY: string
            BASE_URL: string
            NEXT_PUBLIC_PRIVY_APP_ID: string
            PRIVY_APP_SECRET: string
            PRIVATE_KEY: `0x${string}`
            ATTEST_PRIVATE_KEY: `0x${string}`
            PRIVY_MEMBERS_APP_ID: string
            PRIVY_MEMBERS_APP_SECRET: string
            ATTESTER: `0x${string}`
            NEXT_PUBLIC_OWNER_PINK_SLIP_SCHEMA_ID: `0x${string}`
            NEXT_PUBLIC_HIRE_PURCHASE_SCHEMA_ID: `0x${string}`
            NEXT_PUBLIC_HIRE_PURCHASE_INVOICE_SCHEMA_ID: `0x${string}`
            NEXT_PUBLIC_MEMBER_BADGE_SCHEMA_ID: `0x${string}`
            NEXT_PUBLIC_HIRE_PURCHASE_CREDIT_SCORE_SCHEMA_ID: `0x${string}`
        }
    }
}
  
// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}