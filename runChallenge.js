axios = require('axios');
decrypt = require('./decrypt');
sha1 = require('js-sha1');
fs = require('fs');
formData = require('form-data');

module.exports = async function runChallenge( token ) {
  
  const api = axios.create({
    baseURL: 'https://api.codenation.dev/v1/challenge/dev-ps/',
  });

  const request = await api.get('generate-data', { params: { token }});
  const data = request.data;
  
  decrypted = decrypt(data.numero_casas, data.cifrado);

  data.decifrado = decrypted;
  data.resumo_criptografico = sha1(decrypted);

  fs.writeFileSync('answer.json', JSON.stringify(data));

  const form = new formData();

  form.append('answer', fs.createReadStream('answer.json'), {
    filename: 'answer.json'
  });

  const rawResponse = await api.post('submit-solution', form, {
    params: {token},
    headers: form.getHeaders()
  });

  return rawResponse.data;

}