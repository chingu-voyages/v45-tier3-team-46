// Any route you put in the matcher array will be protected and take
// unauthorized users to the sign in page

export { default } from "next-auth/middleware"

export const config = { matcher: ["/protectedpage", "/secondprotectedpage"] }