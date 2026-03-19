import { NextRequest, NextResponse } from 'next/server';

const BACKEND_BASE_URL = process.env.BACKEND_INTERNAL_URL || 'http://16.171.0.139:8000';

export async function handleRequest(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('path') || '';
  const target = `${BACKEND_BASE_URL}${url.startsWith('/') ? url : `/${url}`}`;

  try {
    const init: RequestInit = {
      method: req.method,
      headers: {},
    };

    if (req.method !== 'GET' && req.method !== 'HEAD') {
      const body = await req.text();
      init.body = body;
      (init.headers as Record<string, string>)['Content-Type'] = req.headers.get('content-type') || 'application/json';
    }

    const res = await fetch(target, init);
    const data = await res.text();

    return new NextResponse(data, {
      status: res.status,
      headers: { 'Content-Type': res.headers.get('content-type') || 'application/json' },
    });
  } catch (err) {
    console.error('Proxy error:', err);
    return NextResponse.json({ error: 'Proxy failed to reach backend' }, { status: 502 });
  }
}

export async function GET(req: NextRequest) {
  return handleRequest(req);
}

export async function POST(req: NextRequest) {
  return handleRequest(req);
}

export async function PUT(req: NextRequest) {
  return handleRequest(req);
}

export async function DELETE(req: NextRequest) {
  return handleRequest(req);
}
