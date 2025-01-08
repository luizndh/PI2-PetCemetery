import http from 'k6/http'

export const options = {
  scenarios: {
    ui: {
      executor: 'constant-vus',
      vus: 1,
      duration: '10s',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
  thresholds: {
    checks: ['rate==1.0'],
  },
}

const url = 'http://localhost:8080/api/cadastro';
// const logoBin = open('./logo.png', 'b');

export default function () {
  let data = { 
    nome: "Ronaldinho",
    email: "gaucho@gmail.com",
    senha: "OlhoNaBola",
    senharepeat: "OlhoNaBola",
    cpf: "12345678901",
    cep: "31654-312",
    rua: "Coronel Mustarda",
    numero: "666",
    complemento: "insetisan",
    telefone: "25696969"
  };

  // Using a JSON string as body
  let res = http.post(url, JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
  // console.log(res.json().json.name);

  // Using an object as body, the headers will automatically include
  // 'Content-Type: application/x-www-form-urlencoded'.
      // res = http.post(url, data);
      // console.log(res.json().form.name);

  // Using a binary array as body. Make sure to open() the file as binary
  // (with the 'b' argument).
      // http.post(url, logoBin, { headers: { 'Content-Type': 'image/png' } });

  // Using an ArrayBuffer as body. Make sure to pass the underlying ArrayBuffer
  // instance to http.post(), and not the TypedArray view.
      // data = new Uint8Array([104, 101, 108, 108, 111]);
      // http.post(url, data.buffer, { headers: { 'Content-Type': 'image/png' } });

  console.log(res)
}