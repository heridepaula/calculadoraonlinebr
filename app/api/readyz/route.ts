import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Check if the application is ready to serve traffic
    const checks = [];
    
    // Check if essential environment is configured
    const nodeEnv = process.env.NODE_ENV;
    if (!nodeEnv) {
      checks.push('NODE_ENV not set');
    }
    
    // Check memory usage - if too high, not ready for more traffic
    const memoryUsage = process.memoryUsage();
    const memoryUsagePercent = (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100;
    
    if (memoryUsagePercent > 85) {
      checks.push(`Memory usage too high: ${memoryUsagePercent.toFixed(1)}%`);
    }
    
    // Check if we've been running for at least a few seconds (startup time)
    const uptime = process.uptime();
    if (uptime < 2) {
      checks.push('Application still starting up');
    }
    
    if (checks.length > 0) {
      return NextResponse.json({
        status: 'not_ready',
        timestamp: new Date().toISOString(),
        checks: checks,
      }, { status: 503 });
    }
    
    return NextResponse.json({
      status: 'ready',
      timestamp: new Date().toISOString(),
      uptime: uptime,
    }, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-cache',
      }
    });
    
  } catch (error) {
    return NextResponse.json({
      status: 'not_ready',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 503 });
  }
}

export async function HEAD(request: NextRequest) {
  try {
    const memoryUsage = process.memoryUsage();
    const memoryUsagePercent = (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100;
    
    if (memoryUsagePercent > 85 || process.uptime() < 2) {
      return new NextResponse(null, { status: 503 });
    }
    
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    return new NextResponse(null, { status: 503 });
  }
}