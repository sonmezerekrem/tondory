-- Create blog_posts table
CREATE TABLE blog_posts
(
    id          UUID                     DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id     UUID REFERENCES auth.users (id) ON DELETE CASCADE NOT NULL,
    url         TEXT                                              NOT NULL,
    title       TEXT,
    description TEXT,
    image_url   TEXT,
    site_name   TEXT,
    read_date   DATE                     DEFAULT CURRENT_DATE,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX idx_blog_posts_user_id ON blog_posts (user_id);
CREATE INDEX idx_blog_posts_read_date ON blog_posts (read_date);
CREATE INDEX idx_blog_posts_created_at ON blog_posts (created_at);

-- Enable RLS (Row Level Security)
ALTER TABLE blog_posts
    ENABLE ROW LEVEL SECURITY;

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
    RETURNS TRIGGER AS
$$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE
    ON blog_posts
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create bookmarks table
CREATE TABLE IF NOT EXISTS bookmarks
(
    id           UUID                     DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id      UUID REFERENCES auth.users (id) ON DELETE CASCADE             NOT NULL,
    blog_post_id UUID REFERENCES blog_posts (id) ON DELETE CASCADE             NOT NULL,
    created_at   TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at   TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

    -- Ensure a user can only bookmark a post once
    UNIQUE (user_id, blog_post_id)
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS bookmarks_user_id_idx ON bookmarks (user_id);
CREATE INDEX IF NOT EXISTS bookmarks_blog_post_id_idx ON bookmarks (blog_post_id);
CREATE INDEX IF NOT EXISTS bookmarks_created_at_idx ON bookmarks (created_at);

-- Enable Row Level Security
ALTER TABLE bookmarks
    ENABLE ROW LEVEL SECURITY;

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

-- Grant permissions
GRANT ALL ON bookmarks TO authenticated;

-- Function to check if a post is bookmarked by current user
CREATE OR REPLACE FUNCTION is_post_bookmarked(post_id UUID)
    RETURNS BOOLEAN
    LANGUAGE plpgsql
    SECURITY DEFINER
AS
$$
BEGIN
    RETURN EXISTS (SELECT 1
                   FROM bookmarks
                   WHERE user_id = auth.uid()
                     AND blog_post_id = post_id);
END;
$$;

-- Function to toggle bookmark (add if not exists, remove if exists)
CREATE OR REPLACE FUNCTION toggle_bookmark(post_id UUID)
    RETURNS BOOLEAN
    LANGUAGE plpgsql
    SECURITY DEFINER
AS
$$
DECLARE
    bookmark_exists BOOLEAN;
BEGIN
    -- Check if bookmark exists
    SELECT EXISTS (SELECT 1
                   FROM bookmarks
                   WHERE user_id = auth.uid()
                     AND blog_post_id = post_id)
    INTO bookmark_exists;

    IF bookmark_exists THEN
        -- Remove bookmark
        DELETE
        FROM bookmarks
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
    RETURNS TRIGGER AS
$$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER handle_bookmarks_updated_at
    BEFORE UPDATE
    ON bookmarks
    FOR EACH ROW
EXECUTE PROCEDURE handle_bookmarks_updated_at();


-- Create release_notes table
CREATE TABLE IF NOT EXISTS release_notes
(
    id                 UUID                     DEFAULT gen_random_uuid() PRIMARY KEY,
    version            VARCHAR(20) NOT NULL,
    release_date       DATE        NOT NULL,
    is_latest          BOOLEAN                  DEFAULT false,
    is_initial_release BOOLEAN                  DEFAULT false,
    created_at         TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at         TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create release_note_items table for features, improvements,and bug fixes
CREATE TABLE IF NOT EXISTS release_note_items
(
    id              UUID                     DEFAULT gen_random_uuid() PRIMARY KEY,
    release_note_id UUID        NOT NULL REFERENCES release_notes (id) ON DELETE CASCADE,
    type            VARCHAR(20) NOT NULL CHECK (type IN ('feature', 'improvement', 'bug_fix')),
    title           TEXT        NOT NULL,
    description     TEXT,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_release_notes_version ON
    release_notes (version);
CREATE INDEX IF NOT EXISTS idx_release_notes_release_date ON
    release_notes (release_date DESC);
CREATE INDEX IF NOT EXISTS idx_release_notes_is_latest ON
    release_notes (is_latest);
CREATE INDEX IF NOT EXISTS idx_release_note_items_release_note_id
    ON release_note_items (release_note_id);
CREATE INDEX IF NOT EXISTS idx_release_note_items_type ON
    release_note_items (type);

-- Enable RLS (Row Level Security)
ALTER TABLE release_notes
    ENABLE ROW LEVEL SECURITY;
ALTER TABLE release_note_items
    ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to release_notes" ON
    release_notes
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access to release_note_items" ON
    release_note_items
    FOR SELECT USING (true);

-- Insert sample data
INSERT INTO release_notes (version, release_date, is_latest,
                           is_initial_release)
VALUES ('1.2.0', '2024-12-15', true, false),
       ('1.1.0', '2024-11-28', false, false),
       ('1.0.0', '2024-11-10', false, true);

-- Insert sample release note items
INSERT INTO release_note_items (release_note_id, type, title, description)
VALUES
    -- Version 1.2.0 features
    ((SELECT id FROM release_notes WHERE version = '1.2.0'),
     'feature', 'Dark mode support', 'Dark mode support with beautiful theme switching'),
    ((SELECT id FROM release_notes WHERE version = '1.2.0'),
     'feature', 'Enhanced search functionality', 'Enhanced search functionality with pagination'),
    ((SELECT id FROM release_notes WHERE version = '1.2.0'),
     'feature', 'Profile management', 'Profile management with display name editing'),
    ((SELECT id FROM release_notes WHERE version = '1.2.0'),
     'feature', 'Improved bookmark management', 'Improved bookmark management system'),

    -- Version 1.2.0 improvements
    ((SELECT id FROM release_notes WHERE version = '1.2.0'),
     'improvement', 'Redesigned UI', 'Redesigned UI with SwiftPay design system'),
    ((SELECT id FROM release_notes WHERE version = '1.2.0'),
     'improvement', 'Better mobile responsiveness', 'Better mobile responsiveness and navigation'),
    ((SELECT id FROM release_notes WHERE version = '1.2.0'),
     'improvement', 'Performance optimizations', 'Performance optimizations for faster loading'),

    -- Version 1.2.0 bug fixes
    ((SELECT id FROM release_notes WHERE version = '1.2.0'),
     'bug_fix', 'Fixed hydration errors', 'Fixed hydration errors on client components'),
    ((SELECT id FROM release_notes WHERE version = '1.2.0'),
     'bug_fix', 'Resolved cookie handling issues', 'Resolved cookie handling issues in server components'),
    ((SELECT id FROM release_notes WHERE version = '1.2.0'),
     'bug_fix', 'Fixed image loading issues', 'Fixed image loading issues in article previews'),

    -- Version 1.1.0 features
    ((SELECT id FROM release_notes WHERE version = '1.1.0'),
     'feature', 'Dashboard analytics', 'Dashboard analytics with reading statistics'),
    ((SELECT id FROM release_notes WHERE version = '1.1.0'),
     'feature', 'Article grid and list view', 'Article grid and list view options'),
    ((SELECT id FROM release_notes WHERE version = '1.1.0'),
     'feature', 'Bookmark functionality', 'Bookmark functionality for favorite articles'),

    -- Version 1.1.0 improvements
    ((SELECT id FROM release_notes WHERE version = '1.1.0'),
     'improvement', 'Enhanced user authentication', 'Enhanced user authentication flow'),
    ((SELECT id FROM release_notes WHERE version = '1.1.0'),
     'improvement', 'Better error handling', 'Better error handling and user feedback'),

    -- Version 1.0.0 features
    ((SELECT id FROM release_notes WHERE version = '1.0.0'),
     'feature', 'User registration and authentication', 'User registration and authentication'),
    ((SELECT id FROM release_notes WHERE version = '1.0.0'),
     'feature', 'Article URL saving', 'Article URL saving and metadata extraction'),
    ((SELECT id FROM release_notes WHERE version = '1.0.0'),
     'feature', 'Basic dashboard', 'Basic dashboard with article listing'),
    ((SELECT id FROM release_notes WHERE version = '1.0.0'),
     'feature', 'Responsive design', 'Responsive design for mobile and desktop');


-- Create daily_stats table
CREATE TABLE daily_stats (
                             id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                             created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                             updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                             user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
                             blog_count INTEGER DEFAULT 0,
                             daily_date DATE NOT NULL,
                             UNIQUE(user_id, daily_date)
);

-- Create indexes for performance
CREATE INDEX idx_daily_stats_user_id ON daily_stats(user_id);
CREATE INDEX idx_daily_stats_daily_date ON daily_stats(daily_date DESC);
CREATE INDEX idx_daily_stats_user_date ON daily_stats(user_id, daily_date DESC);

-- Enable RLS (Row Level Security)
ALTER TABLE daily_stats ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for users to only see their own stats
CREATE POLICY "Users can only see own daily stats" ON daily_stats
    FOR ALL USING (auth.uid() = user_id);

-- Function to update daily_stats
CREATE OR REPLACE FUNCTION update_daily_stats(
    p_user_id UUID,
    p_date DATE,
    p_increment INTEGER DEFAULT 1
) RETURNS VOID AS $$
BEGIN
    INSERT INTO daily_stats (user_id, daily_date, blog_count)
    VALUES (p_user_id, p_date, p_increment)
    ON CONFLICT (user_id, daily_date)
        DO UPDATE SET
                      blog_count = daily_stats.blog_count + p_increment,
                      updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- Function to populate initial data from existing blog_posts
CREATE OR REPLACE FUNCTION populate_initial_daily_stats() RETURNS VOID AS $$
BEGIN
    INSERT INTO daily_stats (user_id, daily_date, blog_count)
    SELECT
        user_id,
        read_date,
        COUNT(*) as blog_count
    FROM blog_posts
    GROUP BY user_id, read_date
    ON CONFLICT (user_id, daily_date) DO NOTHING;
END;
$$ LANGUAGE plpgsql;

-- Function to populate stats for a specific user (useful for API endpoint)
CREATE OR REPLACE FUNCTION populate_user_daily_stats(p_user_id UUID) RETURNS VOID AS $$
BEGIN
    -- Delete existing stats for this user
    DELETE FROM daily_stats WHERE user_id = p_user_id;

    -- Recalculate from blog_posts
    INSERT INTO daily_stats (user_id, daily_date, blog_count)
    SELECT
        user_id,
        read_date,
        COUNT(*) as blog_count
    FROM blog_posts
    WHERE user_id = p_user_id
    GROUP BY user_id, read_date;
END;
$$ LANGUAGE plpgsql;

-- Function to verify data consistency between daily_stats and blog_posts
CREATE OR REPLACE FUNCTION verify_daily_stats_consistency(p_user_id UUID)
    RETURNS TABLE(
                     daily_date DATE,
                     stats_count INTEGER,
                     actual_count BIGINT,
                     difference INTEGER
                 ) AS $$
BEGIN
    RETURN QUERY
        SELECT
            COALESCE(ds.daily_date, bp.read_date) as daily_date,
            COALESCE(ds.blog_count, 0) as stats_count,
            COALESCE(bp.actual_count, 0) as actual_count,
            (COALESCE(ds.blog_count, 0) - COALESCE(bp.actual_count, 0))::INTEGER as difference
        FROM (
                 SELECT daily_date, blog_count
                 FROM daily_stats
                 WHERE user_id = p_user_id
             ) ds
                 FULL OUTER JOIN (
            SELECT read_date, COUNT(*) as actual_count
            FROM blog_posts
            WHERE user_id = p_user_id
            GROUP BY read_date
        ) bp ON ds.daily_date = bp.read_date
        WHERE COALESCE(ds.blog_count, 0) != COALESCE(bp.actual_count, 0)
        ORDER BY daily_date DESC;
END;
$$ LANGUAGE plpgsql;

-- Trigger function to update daily_stats when blog_posts are inserted
CREATE OR REPLACE FUNCTION trigger_update_daily_stats_on_insert()
    RETURNS TRIGGER AS $$
BEGIN
    PERFORM update_daily_stats(NEW.user_id, NEW.read_date, 1);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger function to update daily_stats when blog_posts are deleted
CREATE OR REPLACE FUNCTION trigger_update_daily_stats_on_delete()
    RETURNS TRIGGER AS $$
BEGIN
    PERFORM update_daily_stats(OLD.user_id, OLD.read_date, -1);
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Trigger function to update daily_stats when blog_posts read_date is updated
CREATE OR REPLACE FUNCTION trigger_update_daily_stats_on_update()
    RETURNS TRIGGER AS $$
BEGIN
    -- If read_date changed, update both old and new dates
    IF OLD.read_date != NEW.read_date THEN
        -- Decrease count for old date
        PERFORM update_daily_stats(OLD.user_id, OLD.read_date, -1);
        -- Increase count for new date
        PERFORM update_daily_stats(NEW.user_id, NEW.read_date, 1);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER trigger_blog_posts_insert_daily_stats
    AFTER INSERT ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION trigger_update_daily_stats_on_insert();

CREATE TRIGGER trigger_blog_posts_delete_daily_stats
    AFTER DELETE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION trigger_update_daily_stats_on_delete();

CREATE TRIGGER trigger_blog_posts_update_daily_stats
    AFTER UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION trigger_update_daily_stats_on_update();

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_daily_stats_updated_at
    BEFORE UPDATE ON daily_stats
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Populate initial data (run this after creating the table)
SELECT populate_initial_daily_stats();

-- Optional: Clean up zero counts (remove entries where blog_count = 0)
DELETE FROM daily_stats WHERE blog_count <= 0;