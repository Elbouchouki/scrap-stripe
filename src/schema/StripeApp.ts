import mongoose from "mongoose";


const keyFeatureSchema = new mongoose.Schema({
  description: String,
  image: String,
  title: String,
  video_url: String,
});

const StripeAppSchema = new mongoose.Schema({
  id: String,
  based_in: [String],
  built_by: String,
  capability_type: [String],
  categories: [String],
  coming_soon: Boolean,
  description: String,
  developer_id: String,
  faq_url: String,
  is_live: Boolean,
  listing_version: Number,
  logo: String,
  name: String,
  parent_status: String,
  permissions: [String],
  platform_app_id: String,
  platform_app_version: String,
  platform_public_app_id: String,
  pricing_details_url: String,
  pricing_has_free_trial: Boolean,
  pricing_type: String,
  privacy_policy_url: String,
  safe_names: [String],
  status: String,
  status_reason: String,
  subtitle: String,
  support_email: String,
  support_site_url: String,
  supported_languages: [String],
  technical_doc_url: String,
  token: String,
  tos_url: String,
  website_url: String,
  works_with: [String],
  key_features: [keyFeatureSchema],
})

export const StripeAppModel = mongoose.model("StripeApp", StripeAppSchema)