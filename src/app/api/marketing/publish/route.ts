import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, mediaUrl, platforms = ["instagram"] } = body;

    const webhookUrl = process.env.MAKE_SCENARIO_WEBHOOK;
    const apiToken = process.env.MAKE_API_TOKEN;

    if (!webhookUrl) {
      return NextResponse.json({ error: "Webhook URL not configured" }, { status: 500 });
    }

    const combinedText = title ? `${title}\n\n${content}` : content;
    
    let mediaCategory = "text";
    if (mediaUrl) {
      mediaCategory = mediaUrl.toLowerCase().endsWith(".mp4") ? "video" : "image";
    }

    const payload = {
      api_secret: apiToken,
      version: "v2-media-link-fixed-101",
      post_id: `post-andina-${Date.now()}`,
      text: combinedText,
      media_url: mediaUrl || "",
      media_urls: mediaUrl ? [mediaUrl] : [],
      post_media_category: mediaCategory,
      platforms: platforms || ["facebook"]
    };

    console.log("🚀 Enviando a Make.com:", { ...payload, api_secret: "***" });

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.text();
    console.log("✅ Código HTTP:", response.status, "| Respuesta de Make.com:", result);

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        error: `Make.com respondió con error ${response.status}: ${result}`
      }, { status: 502 });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Contenido enviado a Make.com",
      result: result 
    });

  } catch (error: any) {
    console.error("🔥 Error publishing to Make:", error);
    return NextResponse.json({ 
      success: false,
      error: `Error de conexión con Make.com: ${error.message}` 
    }, { status: 500 });
  }
}
