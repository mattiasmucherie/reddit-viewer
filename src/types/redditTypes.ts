export interface RedditResponse {
  kind: string
  data: RedditResponseData
}

export interface RedditResponseData {
  modhash: string
  dist: number
  children: RedditChild[]
  after: string
  before: null
}

export interface RedditChild {
  kind: string
  data: ChildData
}

export interface ChildData {
  approved_at_utc: null
  subreddit: string
  selftext: string
  author_fullname: string
  saved: boolean
  mod_reason_title: null
  gilded: number
  clicked: boolean
  title: string
  link_flair_richtext: any[]
  subreddit_name_prefixed: string
  hidden: boolean
  pwls: number
  link_flair_css_class: null | string
  downs: number
  thumbnail_height?: number | null
  top_awarded_type: null
  hide_score: boolean
  name: string
  quarantine: boolean
  link_flair_text_color: string
  upvote_ratio: number
  author_flair_background_color: null
  subreddit_type: string
  ups: number
  total_awards_received: number
  media_embed: Gildings
  thumbnail_width?: number | null
  author_flair_template_id: string | null
  is_original_content: boolean
  user_reports: any[]
  secure_media: Media | null
  is_reddit_media_domain: boolean
  is_meta: boolean
  category: null
  secure_media_embed: Gildings
  link_flair_text: null | string
  can_mod_post: boolean
  score: number
  approved_by: null
  author_premium: boolean
  thumbnail: string
  edited: boolean | number
  author_flair_css_class: string | null
  author_flair_richtext: any[]
  gildings: Gildings
  post_hint?: string
  content_categories: null
  is_self: boolean
  mod_note: null
  created: number
  link_flair_type: string
  wls: number
  removed_by_category: null
  banned_by: null
  author_flair_type: string
  domain: string
  allow_live_comments: boolean
  selftext_html: null | string
  likes: null
  suggested_sort: null | string
  banned_at_utc: null
  view_count: null
  archived: boolean
  no_follow: boolean
  is_crosspostable: boolean
  pinned: boolean
  over_18: boolean
  preview?: Preview
  all_awardings: any[]
  awarders: any[]
  media_only: boolean
  can_gild: boolean
  spoiler: boolean
  locked: boolean
  author_flair_text: string | null
  treatment_tags: any[]
  visited: boolean
  removed_by: null
  num_reports: null
  distinguished: null
  subreddit_id: string
  mod_reason_by: null
  removal_reason: null
  link_flair_background_color: string
  id: string
  is_robot_indexable: boolean
  report_reasons: null
  author: string
  discussion_type: null
  num_comments: number
  send_replies: boolean
  whitelist_status: string
  contest_mode: boolean
  mod_reports: any[]
  author_patreon_flair: boolean
  author_flair_text_color: string | null
  permalink: string
  parent_whitelist_status: string
  stickied: boolean
  url: string
  subreddit_subscribers: number
  created_utc: number
  num_crossposts: number
  media: Media | null
  is_video: boolean
  link_flair_template_id?: string
  url_overridden_by_dest?: string
}

export interface Gildings {}

export interface Preview {
  images: Image[]
  enabled: boolean
}

export interface Image {
  source: Source
  resolutions: Source[]
  variants: Gildings
  id: string
}

export interface Source {
  url: string
  width: number
  height: number
}

export interface Media {
  reddit_video: RedditVideo
}

export interface RedditVideo {
  bitrate_kbps: number
  fallback_url: string
  height: number
  width: number
  scrubber_media_url: string
  dash_url: string
  duration: number
  hls_url: string
  is_gif: boolean
  transcoding_status: string
}
