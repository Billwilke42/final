export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => response.json())
      // .then(response => console.log(response))
}

export const submitUrl = async (longUrl, newTitle) => {
  const response = await fetch('http://localhost:3001/api/v1/urls',  {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        long_url: longUrl,
        title: newTitle
    })
  })
  if(!response.ok) {
    throw new Error(`HTTP errior! status ${response.status}`)
  } else {
    const data = await response.json()
    console.log(data)
    return data
  }
}

export const deleteUrl = async (id) => {
  await fetch(`http://localhost:3001/api/v1/urls/${id}`, {
    method: 'DELETE'
  })
}
