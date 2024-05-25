"use client"

import { useState } from "react"

export default function Home() {
  const [url, setUrl] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(null)
    setLoading(true)
    setDownloadUrl(null)

    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error)
      }

      const data = await response.json()
      setDownloadUrl(data.downloadUrl)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen text-white bg-slate-600">
      <img width="200" src="icon.png" alt="App Logo" />
      <span className="text-3xl text-white">grabavid.com</span>
      <h1 className="mt-12 text-4xl font-bold text-white">
        YouTube Video Downloader
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center mt-8 space-y-4"
      >
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter YouTube URL"
          required
          className="px-4 py-2 mb-5 text-white bg-gray-800 rounded-lg shadow-inner w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded-lg focus:outline-none transition ${
            loading
              ? "bg-slate-400 cursor-not-allowed shadow-none"
              : "bg-slate-600 hover:bg-slate-500 active:bg-slate-600 shadow-neumorphic"
          }`}
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="spinner"></div>
              <span>Downloading...</span>
            </div>
          ) : (
            "Download"
          )}
        </button>
      </form>
      {loading && (
        <p className="mt-4 text-white">
          Please wait, this may take a while depending on the length of
          the video.
        </p>
      )}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {downloadUrl && (
        <p className="absolute flex items-center justify-center w-1/4 gap-1 p-2 mt-4 text-black bg-white rounded-lg h-1/4 top-1/4">
          Downloaded! Grab your video {" "}
          <a className="text-blue-600 underline" href={downloadUrl} download>
            here
          </a>
          
        </p>
      )}
    </div>
  )
}
