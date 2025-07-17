-- Create bookmarks table
CREATE TABLE IF NOT EXISTS bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  blog_post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  -- Ensure a user can only bookmark a post once
  UNIQUE(user_id, blog_post_id)
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS bookmarks_user_id_idx ON bookmarks(user_id);
CREATE INDEX IF NOT EXISTS bookmarks_blog_post_id_idx ON bookmarks(blog_post_id);
CREATE INDEX IF NOT EXISTS bookmarks_created_at_idx ON bookmarks(created_at);

-- Enable Row Level Security
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only see their own bookmarks
CREATE POLICY "Users can view own bookmarks" ON bookmarks
  FOR SELECT USING (auth.uid() = user_id);

-- Users can only insert their own bookmarks
CREATE POLICY "Users can create own bookmarks" ON bookmarks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can only delete their own bookmarks
CREATE POLICY "Users can delete own bookmarks" ON bookmarks
  FOR DELETE USING (auth.uid() = user_id);

-- Create a view for bookmarked blog posts with all post details
CREATE OR REPLACE VIEW bookmarked_posts AS
SELECT 
  b.id as bookmark_id,
  b.created_at as bookmarked_at,
  bp.id,
  bp.url,
  bp.title,
  bp.description,
  bp.image_url,
  bp.site_name,
  bp.read_date,
  bp.created_at,
  bp.updated_at,
  bp.user_id
FROM bookmarks b
JOIN blog_posts bp ON b.blog_post_id = bp.id;

-- Enable RLS on the view
ALTER VIEW bookmarked_posts OWNER TO postgres;

-- Grant permissions
GRANT ALL ON bookmarks TO authenticated;
GRANT ALL ON bookmarked_posts TO authenticated;

-- Function to check if a post is bookmarked by current user
CREATE OR REPLACE FUNCTION is_post_bookmarked(post_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM bookmarks 
    WHERE user_id = auth.uid() 
    AND blog_post_id = post_id
  );
END;
$$;

-- Function to toggle bookmark (add if not exists, remove if exists)
CREATE OR REPLACE FUNCTION toggle_bookmark(post_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  bookmark_exists BOOLEAN;
BEGIN
  -- Check if bookmark exists
  SELECT EXISTS (
    SELECT 1 FROM bookmarks 
    WHERE user_id = auth.uid() 
    AND blog_post_id = post_id
  ) INTO bookmark_exists;
  
  IF bookmark_exists THEN
    -- Remove bookmark
    DELETE FROM bookmarks 
    WHERE user_id = auth.uid() 
    AND blog_post_id = post_id;
    RETURN FALSE;
  ELSE
    -- Add bookmark
    INSERT INTO bookmarks (user_id, blog_post_id)
    VALUES (auth.uid(), post_id);
    RETURN TRUE;
  END IF;
END;
$$;

-- Update function to refresh updated_at timestamp
CREATE OR REPLACE FUNCTION handle_bookmarks_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER handle_bookmarks_updated_at
  BEFORE UPDATE ON bookmarks
  FOR EACH ROW
  EXECUTE PROCEDURE handle_bookmarks_updated_at();