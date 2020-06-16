import React, { useState } from 'react'
import axios from 'axios'

export default function UploadFile() {
  const [loading, setLoading] = useState(false)
  const [link, setLink] = useState(undefined)
  const [data1, setData] = useState()

  const handleSetData = (e) => {
    const data = new FormData()
    data.append('file', e.target.files[0])
    setData(data)
  }

  const handleUpload = async () => {
    try {
      setLoading(true)

      const result = await axios.put("http://localhost:3001/files/upload", data1)
      setLink(result.data.link)
    } catch (err) {
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
      <input type='file' onClick={handleLink} onChange={handleSetData} /><br />
      <button onClick={handleUpload}>Enviar</button>
      <br />
      {loading && <p>Carregando...</p>}
      {link && <p> Acesse o arquivo nesse link: <a href={link} >{link}</a></p>}
    </div>
  )
}