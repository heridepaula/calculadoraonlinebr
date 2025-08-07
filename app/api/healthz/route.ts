import { NextRequest, NextResponse } from 'next/server';

interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  checks: {
    [key: string]: {
      status: 'pass' | 'fail' | 'warn';
      time: string;
      output?: string;
    };
  };
  uptime: number;
  version: string;
}

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  const checks: HealthCheckResult['checks'] = {};
  let overallStatus: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';

  try {
    // Check 1: Basic Node.js process health
    checks.process = {
      status: 'pass',
      time: `${Date.now() - startTime}ms`,
      output: `Node.js ${process.version} running`,
    };

    // Check 2: Memory usage
    const memoryUsage = process.memoryUsage();
    const memoryUsedMB = Math.round((memoryUsage.heapUsed / 1024 / 1024) * 100) / 100;
    const memoryTotalMB = Math.round((memoryUsage.heapTotal / 1024 / 1024) * 100) / 100;
    const memoryUsagePercent = (memoryUsedMB / memoryTotalMB) * 100;

    if (memoryUsagePercent > 90) {
      checks.memory = {
        status: 'fail',
        time: `${Date.now() - startTime}ms`,
        output: `Memory usage critical: ${memoryUsedMB}MB / ${memoryTotalMB}MB (${memoryUsagePercent.toFixed(1)}%)`,
      };
      overallStatus = 'unhealthy';
    } else if (memoryUsagePercent > 75) {
      checks.memory = {
        status: 'warn',
        time: `${Date.now() - startTime}ms`,
        output: `Memory usage high: ${memoryUsedMB}MB / ${memoryTotalMB}MB (${memoryUsagePercent.toFixed(1)}%)`,
      };
      if (overallStatus === 'healthy') overallStatus = 'degraded';
    } else {
      checks.memory = {
        status: 'pass',
        time: `${Date.now() - startTime}ms`,
        output: `Memory usage normal: ${memoryUsedMB}MB / ${memoryTotalMB}MB (${memoryUsagePercent.toFixed(1)}%)`,
      };
    }

    // Check 3: Environment variables
    const requiredEnvVars = ['NODE_ENV'];
    const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
    
    if (missingEnvVars.length > 0) {
      checks.environment = {
        status: 'warn',
        time: `${Date.now() - startTime}ms`,
        output: `Missing environment variables: ${missingEnvVars.join(', ')}`,
      };
      if (overallStatus === 'healthy') overallStatus = 'degraded';
    } else {
      checks.environment = {
        status: 'pass',
        time: `${Date.now() - startTime}ms`,
        output: 'All required environment variables present',
      };
    }

    // Check 4: File system access (test write to temp directory)
    try {
      const testFile = '/tmp/healthcheck-test.txt';
      const fs = require('fs');
      fs.writeFileSync(testFile, 'health check test');
      fs.unlinkSync(testFile);
      
      checks.filesystem = {
        status: 'pass',
        time: `${Date.now() - startTime}ms`,
        output: 'File system read/write access working',
      };
    } catch (fsError) {
      checks.filesystem = {
        status: 'fail',
        time: `${Date.now() - startTime}ms`,
        output: `File system access failed: ${fsError instanceof Error ? fsError.message : 'Unknown error'}`,
      };
      overallStatus = 'unhealthy';
    }

    // Prepare response
    const healthCheckResult: HealthCheckResult = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      checks,
      uptime: process.uptime(),
      version: process.env.npm_package_version || '1.0.0',
    };

    // Return appropriate HTTP status
    const httpStatus = overallStatus === 'healthy' ? 200 : overallStatus === 'degraded' ? 200 : 503;

    return NextResponse.json(healthCheckResult, { 
      status: httpStatus,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });

  } catch (error) {
    const errorResponse: HealthCheckResult = {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      checks: {
        error: {
          status: 'fail',
          time: `${Date.now() - startTime}ms`,
          output: error instanceof Error ? error.message : 'Unknown error during health check',
        }
      },
      uptime: process.uptime(),
      version: process.env.npm_package_version || '1.0.0',
    };

    return NextResponse.json(errorResponse, { 
      status: 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
  }
}

export async function HEAD(request: NextRequest) {
  // Simplified health check for load balancers
  try {
    const memoryUsage = process.memoryUsage();
    const memoryUsagePercent = (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100;
    
    // Return 503 if memory usage is critical
    if (memoryUsagePercent > 90) {
      return new NextResponse(null, { status: 503 });
    }
    
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    return new NextResponse(null, { status: 503 });
  }
}