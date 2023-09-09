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

Uses the following supabase function:

```
create or replace function verifykey(user_email text, user_key text)
returns boolean
language plpgsql
security definer
as $$
declare
  found_key text;
begin
  select secret_key into found_key from profiles where user_email = email;
  return (found_key = user_key);
EXCEPTION
  WHEN NO_DATA_FOUND THEN
    -- Handle the case when no data is found for the provided email
    RETURN FALSE;
  WHEN TOO_MANY_ROWS THEN
    -- Handle the case when multiple rows match the provided email (shouldn't happen in this context)
    RETURN FALSE;
end
$$;
```
