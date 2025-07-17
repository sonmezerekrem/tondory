-- Create blog_posts table
CREATE TABLE blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    url TEXT NOT NULL,
    title TEXT,
    description TEXT,
    image_url TEXT,
    site_name TEXT,
    read_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX idx_blog_posts_user_id ON blog_posts(user_id);
CREATE INDEX idx_blog_posts_read_date ON blog_posts(read_date);
CREATE INDEX idx_blog_posts_created_at ON blog_posts(created_at);

-- Enable RLS (Row Level Security)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policy for users to only see their own blog posts
CREATE POLICY "Users can only see their own blog posts" ON blog_posts
    FOR ALL USING (auth.uid() = user_id);

-- Create policy for users to insert their own blog posts
CREATE POLICY "Users can insert their own blog posts" ON blog_posts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policy for users to update their own blog posts
CREATE POLICY "Users can update their own blog posts" ON blog_posts
    FOR UPDATE USING (auth.uid() = user_id);

-- Create policy for users to delete their own blog posts
CREATE POLICY "Users can delete their own blog posts" ON blog_posts
    FOR DELETE USING (auth.uid() = user_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();