import { useState, useEffect } from 'react';

interface NewsArticle {
  title: string;
  content: string;
  description: string;
  source: {
    id: string | null;
    name: string;
  };
  urlToImage: string | null;
  url: string;
}

interface NewsResponse {
  articles: NewsArticle[];
  totalResults: number;
  status: string;
}

export const NewsApiOrg = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState('technology');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const pageSize = 20;

  // Add new state for tracking image loading status
  const [imageLoadingStates, setImageLoadingStates] = useState<Record<string, boolean>>({});

  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setLoadedImages(prev => new Set(prev).add(src));
        resolve();
      };
      img.onerror = reject;
    });
  };

  useEffect(() => {
    // Preload all images when news articles change
    const preloadImages = async () => {
      const imageSources = news
        .filter(article => article.urlToImage)
        .map(article => article.urlToImage as string);

      await Promise.allSettled(imageSources.map(preloadImage));
    };

    preloadImages();
  }, [news]);

  const ImageComponent = ({ article }: { article: NewsArticle }) => {
    const [error, setError] = useState(false);
    const imageLoaded = article.urlToImage ? loadedImages.has(article.urlToImage) : false;

    if (!article.urlToImage || error) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-600">
          <span className="text-sm text-gray-500 dark:text-gray-400">No image available</span>
        </div>
      );
    }

    return (
      <div className="relative w-full h-full">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-600 animate-pulse" />
        )}
        <img
          src={article.urlToImage}
          alt={article.title}
          className={`w-full h-full object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onError={() => setError(true)}
        />
      </div>
    );
  };

  const fetchNews = async (pageNum: number, shouldAppend = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/news/top-headlines?category=${category}&page=${pageNum}&pageSize=${pageSize}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch news');
      }
      const data: NewsResponse = await response.json();
      
      setTotalResults(data.totalResults);
      setHasMore((pageNum * pageSize) < data.totalResults);
      
      if (shouldAppend) {
        setNews(prev => [...prev, ...(data.articles || [])]);
      } else {
        setNews(data.articles || []);
      }
    } catch (err) {
      console.error('Error fetching news:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch news');
      setNews(shouldAppend ? news : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchNews(1, false);
  }, [category]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchNews(nextPage, true);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setNews([]);
    setPage(1);
    setHasMore(true);
  };

  const handleImageLoad = (articleId: string) => {
    setImageLoadingStates(prev => ({
      ...prev,
      [articleId]: false
    }));
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, articleId: string) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null; // Prevent infinite loop
    target.src = 'https://via.placeholder.com/400x225?text=No+Image';
    setImageLoadingStates(prev => ({
      ...prev,
      [articleId]: false
    }));
  };

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <label htmlFor="category" className="font-medium whitespace-nowrap">
            Category:
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2"
          >
            <option value="technology">Technology</option>
            <option value="business">Business</option>
            <option value="science">Science</option>
            <option value="health">Health</option>
            <option value="entertainment">Entertainment</option>
            <option value="sports">Sports</option>
          </select>
        </div>
        <div className="text-sm text-gray-500">
          Showing {news.length} of {totalResults} articles
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article, index) => {
          const articleId = `${article.title}-${index}`;
          return (
            <div
              key={articleId}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full"
            >
              <div className="aspect-video w-full relative bg-gray-100 dark:bg-gray-700">
                <ImageComponent article={article} />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-bold text-lg mb-2 line-clamp-2">{article.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-1 line-clamp-3">
                  {article.description || article.content?.slice(0, 150)}...
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {article.source.name}
                  </span>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-6">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}; 