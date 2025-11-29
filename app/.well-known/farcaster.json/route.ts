import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // Redirect to Farcaster hosted manifest with 307 (Temporary Redirect)
  return Response.redirect(
    'https://api.farcaster.xyz/miniapps/hosted-manifest/019acd69-b469-e752-9fcf-90738e67e863',
    307
  );
}
