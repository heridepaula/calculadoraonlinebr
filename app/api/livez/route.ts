import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Simple liveness check - just confirms the application is running
  const response = {
    status: 'alive',
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response, { 
    status: 200,
    headers: {
      'Cache-Control': 'no-cache',
    }
  });
}

export async function HEAD(request: NextRequest) {
  return new NextResponse(null, { status: 200 });
}