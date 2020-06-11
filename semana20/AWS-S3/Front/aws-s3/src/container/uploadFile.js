import React, { useState } from 'react'
import axios from 'axios'

export default function UploadFile() {
  const [loading, setLoading] = useState(false)
  const [link, setLink] = useState(undefined)

  const handleUpload = async (event) => {
    try {
      setLoading(true)
      const data = new FormData()
      data.append('stringIgualNoBakc', event.target.files[0])
      const result = await axios.put("http://localhost:3003/files/upload", data)
      console.log(result)
      setLink(data.link)
    } catch (err) {
      console.error(err)
    }
    finally {
      setLoading(false)
    }
  }

  const handleLink = () => {
    setLink(undefined)
  }

  return (
    <div>
      <input type='file' onClick={handleLink} />
      <button onClick={handleUpload}>Enviar</button>
      <br />
      {loading && <p>Carregando...</p>}
      {link && <p> Acesse o arquivo nesse link: <a href={link} >link</a></p>}
    </div>
  )
}