# Discord Verification Function

When a user logs in for the first time, they have a "secret key" created. In order to gain access to the discord server, the hacker needs to run a command in #verify. This shows that A) they checked in, and B) they are who they say they are. 

Requried environment variables: (set these using `supabase secrets set`)

```env
DISCORD_BOT_TOKEN=
DISCORD_PUBLIC_KEY=
ROLE_ID=
```

Adapted from: https://supabase.com/docs/guides/functions/examples/discord-bot

Deploy using `supabase functions deploy discord --no-verify-jwt`