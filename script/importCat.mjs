import { createClient } from '@sanity/client'
import axios from 'axios'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })
// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  apiVersion: '2025-01-10'
})
async function uploadImageToSanity(imageUrl) {
  try {
    console.log(`Uploading image: ${imageUrl}`)
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' })
    const buffer = Buffer.from(response.data)
    const asset = await client.assets.upload('image', buffer, {
      filename: imageUrl.split('/').pop()
    })
    console.log(`Image uploaded successfully: ${asset._id}`)
    return asset._id
  } catch (error) {
    console.error('Failed to upload image:', imageUrl, error)
    return null
  }
}
async function importData() {
    try {
      console.log('Fetching products from API...')
      const response = await axios.get('https://6780a1a785151f714b0747e7.mockapi.io/Category',{
          headers: {
              'Access-Control-Allow-Origin': '*', // Adjust as needed for your server
      },
      })
      const category = response.data
      console.log(`Fetched ${category.length} products`)
      for (const c of category) {
        console.log(`Processing product: ${c.title}`)
        let imageRef = null
        if (c.image) {
          imageRef = await uploadImageToSanity(c.image)
        }
        const sanityCategory = {
          _type: 'category',
          name: c.name,
          image: imageRef ? {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imageRef,
            },
          } : undefined,
          createdAt : c.createdAt
        }
        console.log('Uploading product to Sanity:', sanityCategory.name)
        const result = await client.create(sanityCategory)
        console.log(`Product uploaded successfully: ${result._id}`)
      }
      console.log('Data import completed successfully!')
    } catch (error) {
      console.error('Error importing data:', error)
    }
  }
  importData()
