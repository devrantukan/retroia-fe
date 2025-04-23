import { NextRequest, NextResponse } from "next/server";
import net from "net";
import tls from "tls";

export async function GET() {
  try {
    console.log("Testing SMTP connection...");

    // Test multiple ports
    const ports = [25, 465, 587];
    const results = [];

    for (const port of ports) {
      try {
        // Try TCP connection
        const tcpSocket = new net.Socket();
        const tcpResult = await new Promise((resolve, reject) => {
          tcpSocket.setTimeout(5000);

          tcpSocket.on("connect", () => {
            console.log(`TCP Connection successful on port ${port}`);
            tcpSocket.destroy();
            resolve({ port, type: "tcp", success: true });
          });

          tcpSocket.on("error", (error) => {
            console.error(`TCP Connection error on port ${port}:`, error);
            resolve({
              port,
              type: "tcp",
              success: false,
              error: error.message,
            });
          });

          tcpSocket.on("timeout", () => {
            console.error(`TCP Connection timeout on port ${port}`);
            tcpSocket.destroy();
            resolve({ port, type: "tcp", success: false, error: "timeout" });
          });

          tcpSocket.connect(port, "mail.retroia.com");
        });

        results.push(tcpResult);

        // Try TLS connection
        const tlsSocket = tls.connect({
          host: "mail.retroia.com",
          port: port,
          rejectUnauthorized: false,
          timeout: 5000,
        });

        const tlsResult = await new Promise((resolve, reject) => {
          tlsSocket.on("secureConnect", () => {
            console.log(`TLS Connection successful on port ${port}`);
            console.log("TLS Protocol:", tlsSocket.getProtocol());
            console.log("TLS Cipher:", tlsSocket.getCipher());
            tlsSocket.destroy();
            resolve({
              port,
              type: "tls",
              success: true,
              protocol: tlsSocket.getProtocol(),
              cipher: tlsSocket.getCipher(),
            });
          });

          tlsSocket.on("error", (error) => {
            console.error(`TLS Connection error on port ${port}:`, error);
            resolve({
              port,
              type: "tls",
              success: false,
              error: error.message,
            });
          });

          tlsSocket.on("timeout", () => {
            console.error(`TLS Connection timeout on port ${port}`);
            tlsSocket.destroy();
            resolve({ port, type: "tls", success: false, error: "timeout" });
          });
        });

        results.push(tlsResult);
      } catch (error: any) {
        console.error(`Test failed for port ${port}:`, error);
        results.push({ port, error: error.message });
      }
    }

    return NextResponse.json({
      status: "completed",
      message: "Connection tests completed",
      results: results,
    });
  } catch (error: any) {
    console.error("Test failed:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Test failed",
        error: {
          message: error.message,
          code: error.code,
          stack: error.stack,
        },
      },
      { status: 500 }
    );
  }
}
