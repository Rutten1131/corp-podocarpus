import { NextResponse } from "next/server";
import { jsPDF } from "jspdf";
import fs from "fs";
import path from "path";

const SYSTEM_PROMPT_PUBLIC = `
Eres el Asistente de Atención al Cliente de la Cooperativa Podocarpus. Tu LABOR es solo INFORMAR sobre servicios y CAPTAR datos.

REGLAS ESTRÍCTAS:
1. NO ENVÍES COTIZACIONES: Si te piden una cotización, di que un asesor humano lo hará por WhatsApp en unos minutos. Solo pide el Nombre y Teléfono.
2. NO HABLES DE PRECIOS EXACTOS: Tu fin es solo captar el interesado.
3. CAPTURA: Una vez tengas Nombre y Teléfono, despídete amablemente indicando que el equipo comercial se pondrá en contacto.

CONTEXTO: Transporte Escolar e Institucional en Loja, Ecuador.
`;

const SYSTEM_PROMPT_INTERNAL = `
Eres el Asistente Operativo de Gerencia. Tu misión es gestionar órdenes y ENVIAR PROFORMAS PDF PROFESIONALES.

CAPACIDADES:
- Puedes enviar mensajes de texto normales con [SEND_MSG: NUMERO | MENSAJE].
- Puedes enviar PROFORMAS PDF con [SEND_PDF: NUMERO | NOMBRE | CEDULA | SERVICIO].

REGLAS DE PROFORMA:
1. Necesitas Nombre, Cédula y Servicio (Transporte Escolar o Institucional). Si te falta uno, pídelo.
2. Los precios son fijos:
   - "Transporte Escolar": $45.00 mensual.
   - "Transporte Institucional": $380.00 mensual.
3. Una vez tengas los datos, confirma: "Generando proforma profesional para [Nombre]..." y añade el tag al final.

EJEMPLO: 
Usuario: "Envía una proforma de buseta escolar a Juan Perez 1101234567 al 0967491847"
Asistente: "Perfecto Jefe, generando proforma premium para Juan Perez. [SEND_PDF: 0967491847 | Juan Perez | 1101234567 | Transporte Escolar]"
`;

// Función para generar el PDF elegante
async function generateProformaPDF(nombre: string, cedula: string, servicio: string) {
  const doc = new jsPDF();
  const date = new Date().toLocaleDateString();
  const proformaNum = Math.floor(Math.random() * 10000).toString().padStart(5, '0');
  
  const price = servicio.toLowerCase().includes("institucional") ? 380 : 45;

  // Intentar cargar imagen corporativa
  try {
    const imagePath = path.join(process.cwd(), 'public', 'hero-buseta.png');
    if (fs.existsSync(imagePath)) {
      const imgData = fs.readFileSync(imagePath).toString('base64');
      doc.addImage(imgData, 'PNG', 0, 0, 210, 80); // Imagen grande de encabezado
    }
  } catch (e) {
    console.error("No se pudo cargar la imagen para el PDF");
  }

  // Header Moderno (Overlay de color con transparencia si fuera posible, pero jsPDF básico es sólido)
  doc.setFillColor(34, 197, 94); // Verde Podocarpus
  doc.rect(0, 80, 210, 20, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("COOPERATIVA PODOCARPUS", 20, 93);
  
  doc.setFontSize(9);
  doc.text("PROFORMA DE SERVICIO DE TRANSPORTE", 140, 93);

  // Datos de la Cooperativa (Lado derecho)
  doc.setTextColor(50, 50, 50);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("RUC: 1191712345001", 140, 110);
  doc.text("Dir: Av. Salvador Bustamante Celi, Loja", 140, 115);
  doc.text("Tel: (07) 258-1234", 140, 120);
  doc.text(`Fecha: ${date}`, 140, 125);

  // Título Proforma
  doc.setFontSize(16);
  doc.setTextColor(34, 197, 94);
  doc.setFont("helvetica", "bold");
  doc.text(`PROFORMA #${proformaNum}`, 20, 115);

  // Cuadro del Cliente
  doc.setDrawColor(230, 230, 230);
  doc.setFillColor(249, 250, 251);
  doc.rect(20, 135, 170, 30, 'F');
  
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("ORDENADO PARA:", 25, 142);
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.text(`CLIENTE: ${nombre.toUpperCase()}`, 25, 150);
  doc.text(`CÉDULA/RUC: ${cedula}`, 25, 157);

  // Tabla de Servicios
  doc.setFillColor(34, 197, 94);
  doc.rect(20, 175, 170, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.text("DESCRIPCIÓN DEL SERVICIO", 25, 181);
  doc.text("TOTAL ESTIMADO", 170, 181, { align: "right" });

  doc.setTextColor(50, 50, 50);
  doc.setFont("helvetica", "normal");
  doc.text(servicio.toUpperCase(), 25, 195);
  doc.text(`$${price.toFixed(2)}`, 170, 195, { align: "right" });
  doc.line(20, 200, 190, 200);

  // Totales
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("VALOR MENSUAL:", 130, 215);
  doc.setFontSize(16);
  doc.setTextColor(34, 197, 94);
  doc.text(`$${price.toFixed(2)}`, 190, 215, { align: "right" });

  // Footer / Términos
  doc.setTextColor(150, 150, 150);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  const terms = [
    "* Esta proforma incluye monitoreo GPS en tiempo real y Seguro de Pasajeros.",
    "* Los precios están expresados en USD e incluyen impuestos de ley.",
    "* Validez de la oferta: 15 días calendario a partir de su emisión."
  ];
  terms.forEach((line, i) => doc.text(line, 20, 250 + (i * 5)));

  doc.setFont("helvetica", "bold");
  doc.setTextColor(34, 197, 94);
  doc.setFontSize(10);
  doc.text("COOPERATIVA PODOCARPUS - SIEMPRE A TU LADO", 105, 285, { align: "center" });

  const pdfOutput = doc.output('datauristring');
  return pdfOutput.split(',')[1]; // Retornar solo el base64
}

export async function POST(req: Request) {
  try {
    const { message, history, settings, context } = await req.json();

    const config = {
      apiUrl: settings?.evolutionApiUrl || process.env.EVOLUTION_API_URL,
      apiKey: settings?.evolutionApiKey || process.env.EVOLUTION_API_KEY,
      instance: settings?.evolutionInstance || process.env.EVOLUTION_INSTANCE,
      numbers: settings?.notificationNumbers || "",
      groqKey: process.env.GROQ_API_KEY
    };

    let aiResponse = "";
    let shouldNotify = false;
    const isInternal = context === "internal";

    // Llamada real a Groq IA
    if (config.groqKey) {
      try {
        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${config.groqKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [
              { role: "system", content: isInternal ? SYSTEM_PROMPT_INTERNAL : SYSTEM_PROMPT_PUBLIC },
              ...history.map((m: any) => ({ role: m.role, content: m.content })),
              { role: "user", content: message }
            ],
            temperature: 0.1, // Mínima temperatura para máxima obediencia
            max_tokens: 500
          })
        });

        if (!groqRes.ok) {
          const errorData = await groqRes.json();
          console.error("Error detallado de Groq:", JSON.stringify(errorData, null, 2));
          throw new Error(`Groq API error: ${groqRes.status}`);
        }

        const groqData = await groqRes.json();
        aiResponse = groqData.choices[0].message.content;
        
        // Detección de leads solo en modo público
        if (!isInternal) {
          const lowerMsg = message.toLowerCase();
          if (
              lowerMsg.includes("cotizar") || lowerMsg.includes("precio") || 
              lowerMsg.includes("interesa") || lowerMsg.includes("contratar") ||
              (lowerMsg.includes("09") && lowerMsg.length >= 10)
          ) {
              shouldNotify = true;
          }
        }

      } catch (err) {
        console.error("Fallo al llamar a Groq:", err);
        aiResponse = "Lo siento, tuve un problema al procesar tu solicitud con la IA.";
      }
    } else {
      aiResponse = "El cerebro de IA no está configurado.";
    }

    // --- PROCESAMIENTO DE COMANDOS INTERNOS (WhatsApp Directo) ---
    if (isInternal) {
      // 1. Comando de Texto Simple
      const msgMatch = aiResponse.match(/\[SEND_MSG:\s*([\d\+]+)\s*\|\s*(.*?)\s*\]/);
      if (msgMatch && config.apiUrl && config.apiKey && config.instance) {
        let targetNumber = msgMatch[1].replace("+", "").trim();
        const textToSend = msgMatch[2];
        if (targetNumber.startsWith("09") && targetNumber.length === 10) targetNumber = "593" + targetNumber.substring(1);

        try {
          await fetch(`${config.apiUrl}/message/sendText/${config.instance}`, {
            method: 'POST',
            headers: { 'apikey': config.apiKey, 'Content-Type': 'application/json' },
            body: JSON.stringify({ number: targetNumber, text: textToSend, delay: 1200 })
          });
        } catch (err) { console.error("Error envío texto:", err); }
        aiResponse = aiResponse.replace(/\[SEND_MSG:.*?\]/g, "").trim();
      }

      // 2. Comando de Proforma PDF
      const pdfMatch = aiResponse.match(/\[SEND_PDF:\s*([\d\+]+)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\]/);
      if (pdfMatch && config.apiUrl && config.apiKey && config.instance) {
        let targetNumber = pdfMatch[1].replace("+", "").trim();
        const nombre = pdfMatch[2].trim();
        const cedula = pdfMatch[3].trim();
        const servicio = pdfMatch[4].trim();
        if (targetNumber.startsWith("09") && targetNumber.length === 10) targetNumber = "593" + targetNumber.substring(1);

        try {
          const pdfBase64 = await generateProformaPDF(nombre, cedula, servicio);
          const evoRes = await fetch(`${config.apiUrl}/message/sendMedia/${config.instance}`, {
            method: 'POST',
            headers: { 'apikey': config.apiKey, 'Content-Type': 'application/json' },
            body: JSON.stringify({
              number: targetNumber,
              mediatype: "document",
              mimetype: "application/pdf",
              caption: `📄 Aquí tienes la proforma solicitada, ${nombre}.`,
              media: pdfBase64,
              fileName: `Proforma_Podocarpus_${nombre.replace(/\s+/g, '_')}.pdf`,
              delay: 2000
            })
          });

          if (evoRes.ok) {
            console.log(`✅ PROFORMA ENVIADA EXITOSAMENTE A ${targetNumber}`);
          } else {
            const errBody = await evoRes.json();
            console.error("❌ ERROR EVO MEDIA:", JSON.stringify(errBody, null, 2));
          }
        } catch (err) {
          console.error("❌ FALLO GENERACIÓN/ENVÍO PDF:", err);
        }
        aiResponse = aiResponse.replace(/\[SEND_PDF:.*?\]/g, "").trim();
      }
    }

    // --- NOTIFICACIÓN DE LEADS (Público) ---
    if (shouldNotify && config.apiUrl && config.apiKey && config.instance && config.numbers) {
      const notificationNumbers = config.numbers.split(",").map((n: string) => n.trim().replace("+", ""));
      notificationNumbers.forEach(async (num: string) => {
        let targetNum = num;
        if (targetNum.startsWith("09") && targetNum.length === 10) targetNum = "593" + targetNum.substring(1);
        
        try {
          await fetch(`${config.apiUrl}/message/sendText/${config.instance}`, {
            method: 'POST',
            headers: { 'apikey': config.apiKey, 'Content-Type': 'application/json' },
            body: JSON.stringify({
              number: targetNum,
              text: `🚨 *NUEVO LEAD CAPTADO*\n\n*Cliente:* ${message}\n*Contexto:* ${aiResponse.substring(0, 100)}...`,
              delay: 500
            })
          });
        } catch (err) {
          console.error("Error en notificación de lead:", err);
        }
      });
    }
    return NextResponse.json({ response: aiResponse });

  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Ocurrió un error al procesar tu mensaje." }, { status: 500 });
  }
}
