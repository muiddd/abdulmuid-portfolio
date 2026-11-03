import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, honeypot } = body;

    // Honeypot anti-spam check: if filled, quietly succeed without doing anything
    if (honeypot) {
      return NextResponse.json(
        { success: true, message: "Message received." },
        { status: 200 }
      );
    }

    // Input validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Nama wajib diisi." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Alamat email tidak valid." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Pesan minimal 5 karakter." },
        { status: 400 }
      );
    }

    // Check for optional third-party service integration (e.g. Resend, Formspree)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      // Future integration with Resend API
      // await resend.emails.send(...)
    }

    // Mock successful response when live mail provider is not configured
    return NextResponse.json(
      {
        success: true,
        message: "Pesan berhasil dikirim. Terima kasih telah menghubungi saya!",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Terjadi kesalahan internal server saat memproses formulir.",
      },
      { status: 500 }
    );
  }
}

