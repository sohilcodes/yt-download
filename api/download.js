import ytdl from 'ytdl-core';

export default async function handler(req, res) {
  try {
    const { url, itag } = req.query;
    const info = await ytdl.getInfo(url);
    const format = ytdl.chooseFormat(info.formats, { quality: itag });
    res.setHeader('Content-Disposition', `attachment; filename="video.${format.container}"`);
    ytdl(url, { format }).pipe(res);
  } catch (err) {
    res.status(500).send('Download failed');
  }
}
