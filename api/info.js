import ytdl from 'ytdl-core';

export default async function handler(req, res) {
  try {
    const { url } = req.query;
    const info = await ytdl.getInfo(url);
    const formats = ytdl.filterFormats(info.formats, 'videoandaudio');
    const qualities = formats.map(f => ({
      itag: f.itag,
      qualityLabel: f.qualityLabel,
      container: f.container
    }));
    res.json({
      title: info.videoDetails.title,
      thumbnail: info.videoDetails.thumbnails.pop().url,
      qualities
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch info', message: err.message });
  }
}
