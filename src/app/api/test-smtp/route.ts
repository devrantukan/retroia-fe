import { NextRequest, NextResponse } from "next/server";
import net from "net";
import tls from "tls";

export async function GET() {
  try {
    console.log("Testing SMTP connection...");

    // First try regular TCP connection
    const tcpSocket = new net.Socket();
    const tcpPromise = new Promise((resolve, reject) => {
      tcpSocket.setTimeout(5000);

      tcpSocket.on("connect", () => {
        console.log("TCP Connection successful");
        tcpSocket.destroy();
        resolve(true);
      });

      tcpSocket.on("error", (error) => {
        console.error("TCP Connection error:", error);
        reject(error);
      });

      tcpSocket.on("timeout", () => {
        console.error("TCP Connection timeout");
        tcpSocket.destroy();
        reject(new Error("Connection timeout"));
      });

      tcpSocket.connect(465, "mail.retroia.com");
    });

    // Then try TLS connection
    const tlsSocket = tls.connect({
      host: "mail.retroia.com",
      port: 465,
      rejectUnauthorized: false,
      timeout: 5000,
    });

    const tlsPromise = new Promise((resolve, reject) => {
      tlsSocket.on("secureConnect", () => {
        console.log("TLS Connection successful");
        console.log("TLS Protocol:", tlsSocket.getProtocol());
        console.log("TLS Cipher:", tlsSocket.getCipher());
        tlsSocket.destroy();
        resolve(true);
      });

      tlsSocket.on("error", (error) => {
        console.error("TLS Connection error:", error);
        reject(error);
      });

      tlsSocket.on("timeout", () => {
        console.error("TLS Connection timeout");
        tlsSocket.destroy();
        reject(new Error("Connection timeout"));
      });
    });

    // Try both connections
    try {
      await Promise.race([tcpPromise, tlsPromise]);
      return NextResponse.json({
        status: "success",
        message: "Connection test completed",
        details: {
          tcp: "Connection attempt made",
          tls: "Connection attempt made",
        },
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          status: "error",
          message: "Connection test failed",
          error: {
            message: error.message,
            code: error.code,
            stack: error.stack,
          },
        },
        { status: 500 }
      );
    }
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
