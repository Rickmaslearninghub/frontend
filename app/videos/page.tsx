"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, Filter, Search, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { apiFetch, getYouTubeVideoId, type Video } from '../lib/api';
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Professional'];
const categories = ['All', 'General', 'AI', 'Programming', 'Web Development', 'Design', 'Video Editing', 'Business'];

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    filterVideos();
  }, [videos, selectedLevel, selectedCategory, searchQuery]);

  const fetchVideos = async () => {
    try {
      setIsLoading(true);
      setVideos(await apiFetch<Video[]>('/api/videos'));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to load videos.');
    } finally {
      setIsLoading(false);
    }
  };

  const filterVideos = () => {
    let filtered = videos;

    if (selectedLevel !== 'All') {
      filtered = filtered.filter((v) => v.level === selectedLevel);
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((v) => v.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (v) =>
          v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredVideos(filtered);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-amber-500 text-white py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 hover:opacity-90 transition">
            <ArrowLeft size={20} /> Back to Home
          </Link>
          <h1 className="text-5xl lg:text-6xl font-bold mb-4">Video Library</h1>
          <p className="text-xl text-blue-100">Learn from expert-led video tutorials across all skill levels</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Search & Filter */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          {/* Search Bar */}
          <div className="mb-6 relative">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Level Filter */}
          <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
            <Filter size={20} className="text-gray-600 flex-shrink-0" />
            <div className="flex gap-2">
              {levels.map((level) => (
                <motion.button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full font-semibold transition flex-shrink-0 ${
                    selectedLevel === level
                      ? 'bg-gradient-to-r from-blue-600 to-amber-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-300'
                  }`}
                >
                  {level}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            <span className="text-sm font-semibold text-gray-600">Category</span>
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-semibold transition flex-shrink-0 ${
                    selectedCategory === category
                      ? 'bg-amber-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-amber-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <p className="text-gray-600">
            Showing <span className="font-bold text-gray-900">{filteredVideos.length}</span> video{filteredVideos.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* Video Grid */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
            </div>
            <p className="mt-4 text-gray-600">Loading videos...</p>
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 py-12 text-center text-red-700">{error}</div>
        ) : filteredVideos.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <Play size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-xl text-gray-600">No videos found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video, idx) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelectedVideo(video)}
                className="group cursor-pointer"
              >
                <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition bg-white border border-gray-200">
                  {/* Thumbnail */}
                  <div className="relative overflow-hidden h-48 bg-gray-900">
                    <img
                      src={`https://img.youtube.com/vi/${getYouTubeVideoId(video.youtubeUrl) || ''}/maxresdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                        <Play size={28} className="text-blue-600 ml-1" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex gap-2 mb-3">
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                        {video.level}
                      </span>
                      <span className="inline-block px-2 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded">
                        {video.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {video.description || 'No description available'}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedVideo(null)}
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl"
          >
            {/* Video Player */}
            <div className="relative w-full bg-black rounded-xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(selectedVideo.youtubeUrl) || ''}?autoplay=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-b-xl p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                  {selectedVideo.level}
                </span>
                <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-sm font-semibold rounded-full">
                  {selectedVideo.category}
                </span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                {selectedVideo.title}
              </h2>
              <p className="text-gray-700 mb-6">{selectedVideo.description}</p>

              {/* Close Button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-amber-500 text-white font-semibold rounded-lg hover:shadow-lg transition"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
}
