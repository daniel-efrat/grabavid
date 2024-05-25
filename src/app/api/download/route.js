import { NextResponse } from "next/server"
import { promisify } from "util"
import fs from "fs"
import path from "path"
import ytdl from "ytdl-core"
import { nanoid } from "nanoid"

const pipeline = promisify(require("stream").pipeline)

export async function POST(request) {
  try {
    const { url } = await request.json()
    if (!ytdl.validateURL(url)) {
      return NextResponse.json(
        { error: "Invalid YouTube URL" },
        { status: 400 }
      )
    }

    // Get video info
    const info = await ytdl.getInfo(url)
    const title = info.videoDetails.title.replace(/[^\w\s]/gi, "") // Remove special characters
    const id = nanoid()
    const outputPath = path.resolve(
      process.cwd(),
      "public",
      "downloads",
      `${title}-${id}.mp4`
    )

    // Ensure the downloads directory exists
    fs.mkdirSync(path.resolve(process.cwd(), "public", "downloads"), {
      recursive: true,
    })

    const videoReadableStream = ytdl(url, { quality: "highestvideo" })

    await pipeline(videoReadableStream, fs.createWriteStream(outputPath))

    const downloadUrl = `/downloads/${title}-${id}.mp4`

    return NextResponse.json({ downloadUrl }, { status: 200 })
  } catch (error) {
    console.error("Download error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
