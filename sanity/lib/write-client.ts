import "server-only"

import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, token } from '../env'

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN, // Add your write token here,
  })

  if(!writeClient.config().token) {
    throw new Error('No Write token found')
  }