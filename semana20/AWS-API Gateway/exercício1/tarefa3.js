exports.handler = async event => {
  try {
    const cpf = JSON.parse(event.body).cpf
      
    if (cpf.lenght !== 14 || cpf[3] !== '.' || cpf[7] !== '.' || cpf[11] !== '-') {
      throw new Error("Missing input!");
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        cpf
      })
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: err.message
      })
    };
  }
}