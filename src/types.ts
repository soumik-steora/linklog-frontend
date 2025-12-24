// src/types.ts
export interface Link {
  id: number;
  site_name: string;
  original_url: string;
  remarks: string;
  created_at: string;
}

export interface CreateLinkRequest {
  url: string;
  remarks: string;
}