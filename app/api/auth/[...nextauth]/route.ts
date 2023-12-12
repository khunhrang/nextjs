import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentails',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password"},
      },
      async authorize(credentials){
        const res = await fetch('http://localhost:8081/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: {'Content-Type': 'application/json'},    
        });

        const response = await res.json();
        if (response.status === 'OK'){
          return response.user; 
      }
      return null;
    }  
    })
  ],
  pages: {
    signIn: '/auth/signin'
  }
})

export { handler as GET, handler as POST}