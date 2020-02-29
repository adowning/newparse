/* global Parse */
import axios, { AxiosRequestConfig } from 'axios'

const instance = axios.create({
  baseURL: 'https://assets.ashdevtools.com/api/v1',
  timeout: 3000,
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjczY2RjYjc4ZGJjYjNiMDI5ZTFkZGVjNDI2MmJiMzJkZmM5YjNhMGQ3ZmYxMDFkNDA3MTQ0Mjc3Y2Y3MGY1YmVlZGI0OGY2ZWIwMTVhY2Y1In0.eyJhdWQiOiIxIiwianRpIjoiNzNjZGNiNzhkYmNiM2IwMjllMWRkZWM0MjYyYmIzMmRmYzliM2EwZDdmZjEwMWQ0MDcxNDQyNzdjZjcwZjViZWVkYjQ4ZjZlYjAxNWFjZjUiLCJpYXQiOjE1ODI2Mjk3ODYsIm5iZiI6MTU4MjYyOTc4NiwiZXhwIjoxNjE0MjUyMTg2LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.Nhd9dHbCJrczVafae9GOka45BwH9mkkeoWp2RCPs3LJRnNb5usfyKmCIpK0Ifz4ICNEJRsZqKCkD7AyZn90Y8Ow38hLEyPGTtenR5eoFaCeLp8t6h0Mr3_5hYaJFlquXUxbPqqhr-e3n2tiCyz9Q0RUtweGy8JtE1a2IC-UB14PCacD4et2PY6N8jv3uN7gI37t3BBZD3eewXjPTVDj_gRTmPCOLUsYJj3CHxzE8ufI0kFeTHhjNQH0XgSnFKz5iJrTsvCzw5y4h3qgPTnXvKvv4Kk6L6YyHDKZa_xJ32vUQduwQK7lyyMhimddTFiqA9IouVRzCyWf59jjJtfsJ9A4LNF83KFIZBShbR7jghe9qgOoN049D2qR0GGJ3F0bBJiw0U_8M2ZhAAaKtROLEYxTataW2KQ2gE_JUhbvFlX8_pYTQq4pbmhAoHjiryxpsIChc8wVmJSPxRFSCWMespiJSh-WRsk7ubu9b54BjITc0fVQRY8Mbz_AEh5T32d4xKpZrDWwK9TjRPACYHFx5iI5vXeuGvq-hXz_vYkBzHfYJBO4lyGcEG9T-_wm3TsD6355NzM6TbTPcoZcW5SxEh5n2bKJkxbq9Q6yJkXDDNw53HZ11IqiAXFVEPNDhciJ4yy-wh5_PbeUvbM3BJJoOec3CNFDItu8-de-_B3Yirdc',
  },
})

const SnipeHelper = {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  sendToSnipe: async (
    method: string,

    path: string,
    body?: any,
  ) => {
    switch (method) {
      case 'get':
        // eslint-disable-next-line no-case-declarations
        const response = await instance.get(path)
        if (response.data.status === 'error') {
          throw new Error(response.data.messages)
        } else {
          return response.data
        }
      case 'delete':
        console.log(body.id)
        // eslint-disable-next-line no-case-declarations
        const delResponse = await instance.delete(`${path}/${body.id}`)
        if (delResponse.data.status === 'error') {
          throw new Error(delResponse.data.messages)
        } else {
          return delResponse.data
        }
      case 'post':
        // eslint-disable-next-line no-case-declarations
        const re = await instance.post(path, body)
        if (re.data.status === 'error') {
          throw new Error(re.data.messages)
        } else {
          return re.data
        }
      default:
        return 'requires method'
    }
  },
}

export default SnipeHelper
