import xml2js from 'xml2js'

export async function xmlToJson(xml: string) {
  const parser = new xml2js.Parser()
  return await parser
    .parseStringPromise(xml)
    .then((result) => {
      return result
    })
    .catch((err) => {
      console.log('Error converting XML =>', err)
    })
}
