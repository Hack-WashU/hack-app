import {
  json,
  serve,
  validateRequest,
} from "https://deno.land/x/sift@0.6.0/mod.ts";
// TweetNaCl is a cryptography library that we use to verify requests
// from Discord.
import nacl from "https://cdn.skypack.dev/tweetnacl@v1.0.3?dts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

enum DiscordCommandType {
  Ping = 1,
  ApplicationCommand = 2,
}

// For all requests to "/" endpoint, we want to invoke home() handler.
serve({
  '/discord': home,
})

// The main logic of the Discord Slash Command is defined in this function.
async function home(request: Request) {
  // validateRequest() ensures that a request is of POST method and
  // has the following headers.
  const { error } = await validateRequest(request, {
    POST: {
      headers: ['X-Signature-Ed25519', 'X-Signature-Timestamp'],
    },
  })
  if (error) {
    return json({ error: error.message }, { status: error.status })
  }

  // verifySignature() verifies if the request is coming from Discord.
  // When the request's signature is not valid, we return a 401 and this is
  // important as Discord sends invalid requests to test our verification.
  const { valid, body } = await verifySignature(request)
  if (!valid) {
    return json(
      { error: 'Invalid request' },
      {
        status: 401,
      }
    )
  }

  const commandData = JSON.parse(body)
  // Discord performs Ping interactions to test our application.
  // Type 1 in a request implies a Ping interaction.
  if (commandData.type === DiscordCommandType.Ping) {
    return json({
      type: 1, // Type 1 in a response is a Pong interaction response type.
    })
  }

  // Type 2 in a request is an ApplicationCommand interaction.
  // It implies that a user has issued a command.
  if (commandData.type === DiscordCommandType.ApplicationCommand) {
    try {
      const supabase = createClient(
        // Supabase API URL - env var exported by default.
        Deno.env.get('SUPABASE_URL') ?? '',
        // Supabase API ANON KEY - env var exported by default.
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        // Create client with Auth context of the user that called the function.
        // This way your row-level-security (RLS) policies are applied.
        { global: { headers: { Authorization: request.headers.get('Authorization')! } } }
      )

      const user_email = commandData.data.options.find(
        (option: { name: string; value: string }) => option.name === 'email'
      ).value

      const user_key = commandData.data.options.find(
        (option: { name: string; value: string }) => option.name === 'secret_key'
      ).value

      let SBQuery = await supabase.from('profiles').select('email, secret_key').eq('email', user_email).single()

      if (SBQuery.data.secret_key === user_key) {
        // Make post request to update user role
        
        await DiscordRequest(`guilds/${commandData.guild_id}/members/${commandData.member.user.id}/roles/${Deno.env.get('ROLE_ID')}`, {method: "PUT"})

        return json({
          // Type 4 responds with the below message retaining the user's
          // input at the top.
          type: 4,
          data: {
            content: `Correct!!`,
          },
        })
      } else {
        return json({
          // Type 4 responds with the below message retaining the user's
          // input at the top.
          type: 4,
          data: {
            content: `Incorrect!`,
          },
        })
      }

    } catch (error) {
      return json({
        // Type 4 responds with the below message retaining the user's
        // input at the top.
        type: 4,
        data: {
          content: `Error: ${error.message}!`,
        },
      })
    }

    return json({
      // Type 4 responds with the below message retaining the user's
      // input at the top.
      type: 4,
      data: {
        content: `Error!`,
      },
    })
  }

  // We will return a bad request error as a valid Discord request
  // shouldn't reach here.
  return json({ error: 'bad request' }, { status: 400 })
}

/** Verify whether the request is coming from Discord. */
async function verifySignature(request: Request): Promise<{ valid: boolean; body: string }> {
  const PUBLIC_KEY = Deno.env.get('DISCORD_PUBLIC_KEY')!
  // Discord sends these headers with every request.
  const signature = request.headers.get('X-Signature-Ed25519')!
  const timestamp = request.headers.get('X-Signature-Timestamp')!
  const body = await request.text()
  const valid = nacl.sign.detached.verify(
    new TextEncoder().encode(timestamp + body),
    hexToUint8Array(signature),
    hexToUint8Array(PUBLIC_KEY)
  )

  return { valid, body }
}

/** Converts a hexadecimal string to Uint8Array. */
function hexToUint8Array(hex: string) {
  return new Uint8Array(hex.match(/.{1,2}/g)!.map((val) => parseInt(val, 16)))
}

async function DiscordRequest(endpoint, options) {
  // append endpoint to root API URL
  const url = 'https://discord.com/api/v10/' + endpoint;
  // Stringify payloads
  if (options.body) options.body = JSON.stringify(options.body);
  // Use node-fetch to make requests
  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${Deno.env.get('DISCORD_BOT_TOKEN')}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'User-Agent': 'Hack WashU Discord Bot',
    },
    ...options
  });
  // throw API errors
  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }
  // return original response
  return res;
}