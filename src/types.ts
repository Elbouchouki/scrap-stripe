export interface StripeApiResponse {
  count: number;
  data: StripeEntityResponse[];
  page_number: number;
  pages: number;
}

export interface StripeEntityResponse {
  id: string
  based_in: string[]
  built_by: string
  capability_type: string[]
  categories: string[]
  coming_soon: boolean
  description: string
  developer_id: string
  faq_url: string
  is_live: boolean
  listing_version: number
  logo: string
  name: string
  parent_status: string
  permissions: string[]
  platform_app_id: string
  platform_app_version: string
  platform_public_app_id: string
  pricing_details_url: string
  pricing_has_free_trial: boolean
  pricing_type: string
  privacy_policy_url: string
  safe_names: string[]
  status: string
  status_reason: string
  subtitle: string
  support_email: string
  support_site_url: string
  supported_languages: string[]
  technical_doc_url: string
  token: string
  tos_url: string
  website_url: string
  works_with: string[]
  key_features?: {
    description: string
    image: string
    title: string
    video_url: string
  }[]
}
