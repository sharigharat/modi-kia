
async function run() {
  const whatsappUrl = 'https://messaginghub.solutions/relaybridge/api/v1/meta/67d2dcdf2898a702bdf1d0c5/messages';
  const whatsappKey = '54d4e642250d47a9b20c3aa0dae225f3';
  const phone = '919049991795'; // The user's number from the screenshot
  const otpCode = '1234';
  
  const whatsappPayload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: phone,
    type: "template",
    template: {
      name: "registration",
      language: { code: "en" },
      components: [
        {
          type: "body",
          parameters: [{ type: "text", text: otpCode }]
        }
      ]
    },
    biz_opaque_callback_data: "{{BizOpaqueCallbackData}}"
  };

  const res = await fetch(whatsappUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': whatsappKey,
    },
    body: JSON.stringify(whatsappPayload)
  });
  
  console.log("Status:", res.status);
  const text = await res.text();
  console.log("Response:", text);
}
run();
