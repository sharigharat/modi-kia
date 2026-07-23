const whatsappUrl = 'https://messaginghub.solutions/relaybridge/api/v1/meta/67d2dcdf2898a702bdf1d0c5/messages';
const whatsappKey = '54d4e642250d47a9b20c3aa0dae225f3';
const phone = '+919049991795';
const otpCode = '1234';

async function run() {
  const res = await fetch(whatsappUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': whatsappKey,
    },
    body: JSON.stringify({
      to: phone,
      type: 'template',
      template: {
        name: 'registration',
        language: { code: 'en' },
        components: [
          {
            type: 'body',
            parameters: [{ type: 'text', text: otpCode }]
          },
          {
            type: 'button',
            sub_type: 'url',
            index: '0',
            parameters: [{ type: 'text', text: otpCode }]
          }
        ]
      }
    })
  });
  console.log(res.status);
  console.log(await res.text());
}
run();
