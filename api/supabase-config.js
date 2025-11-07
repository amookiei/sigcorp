module.exports = async function handler(req, res) {
    const { SUPABASE_URL, SUPABASE_ANON_KEY } = process.env;

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
        url: SUPABASE_URL || null,
        anonKey: SUPABASE_ANON_KEY || null
    });
};

