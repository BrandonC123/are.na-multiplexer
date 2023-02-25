import NextAuth from 'next-auth'

const options = {
  providers: [
    {
      id: 'arena',
      name: 'Are.na',
      type: 'oauth',
      authorization: {
        url: 'https://dev.are.na/oauth/authorize',
        params: {
          scope: null
        }
      },
      token: 'https://dev.are.na/oauth/token',
      userinfo: 'https://api.are.na/v2/me',
      clientId: process.env.ARENA_APP_ID,
      clientSecret: process.env.ARENA_APP_SECRET,

      profile: profile => {
        const data = {
          id: profile.id,
          email: profile.email,
          username: profile.username,
          avatar: profile.avatar,
          initials: profile.initials
        }
        return data
      }
    }
  ],
  jwt: {
    secret: process.env.ARENA_APP_SECRET
  },
  callbacks: {
    async jwt ({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.id = profile.id
        token.username = profile.username
        token.avatar = profile.avatar
        token.initials = profile.initials
      }

      return token
    },
    async session ({ session, token }) {
      const data = {
        id: token.id,
        accessToken: token.accessToken,
        name: token.username,
        avatar: token.avatar,
        intitals: token.initials
      }

      return Promise.resolve({
        ...session,
        user: data
      })
    }
  }
}

export default NextAuth(options)
