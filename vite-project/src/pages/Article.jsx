import React, { useState } from 'react';

const articleData = [
    {
        id: 1,
        title: "Understanding Sleep Cycles for Better Rest",
        description: "Learn how sleep cycles work and how to optimize your sleep schedule for maximum rest.",
        category: "sleep",
        readTime: "5 min read",
        imageUrl: "https://images.unsplash.com/photo-1541199249251-f713e6145474?auto=format&fit=crop&q=80&w=1024",
        articleUrl: "https://www.sleepfoundation.org/how-sleep-works/stages-of-sleep",
        featured: true
    },
    {
        id: 2,
        title: "Creating the Ideal Sleep Environment",
        description: "Tips for optimizing your bedroom for better sleep, from temperature to lighting and noise levels.",
        category: "sleep",
        readTime: "4 min read",
        imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1024",
        articleUrl: "https://www.sleepfoundation.org/bedroom-environment"
    },
    {
        id: 3,
        title: "How Caffeine Affects Your Sleep",
        description: "Discover the science behind caffeine's impact on sleep quality and how to manage consumption.",
        category: "caffeine",
        readTime: "6 min read",
        imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1024",
        articleUrl: "https://www.sleepfoundation.org/nutrition/caffeine-and-sleep",
        featured: true
    },
    {
        id: 4,
        title: "Caffeine Alternatives for Better Sleep",
        description: "Explore alternatives to coffee and energy drinks that can help you stay energized without disrupting sleep.",
        category: "caffeine",
        readTime: "3 min read",
        imageUrl: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=1024",
        articleUrl: "https://www.healthline.com/nutrition/caffeine-alternatives"
    },
    {
        id: 5,
        title: "The Impact of Blue Light on Sleep",
        description: "Understanding how blue light from screens affects your circadian rhythm and melatonin production.",
        category: "screen",
        readTime: "5 min read",
        imageUrl: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=1024",
        articleUrl: "https://www.sleepfoundation.org/bedroom-environment/screen-time-and-insomnia",
        featured: true
    },
    {
        id: 6,
        title: "Digital Detox for Better Sleep",
        description: "How to implement a digital detox routine to improve your sleep quality and overall well-being.",
        category: "screen",
        readTime: "4 min read",
        imageUrl: "https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?auto=format&fit=crop&q=80&w=1024",
        articleUrl: "https://www.sleepfoundation.org/sleep-hygiene/screen-time-and-sleep"
    },
    {
        id: 7,
        title: "Balancing Study and Sleep",
        description: "Strategies for university students to maintain a healthy sleep schedule during intense study periods.",
        category: "study",
        readTime: "7 min read",
        imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1024",
        articleUrl: "https://www.apa.org/gradpsych/2014/11/get-sleep",
        featured: true
    },
    {
        id: 8,
        title: "How Sleep Improves Memory and Learning",
        description: "Research on the connection between sleep quality and academic performance in university students.",
        category: "study",
        readTime: "6 min read",
        imageUrl: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80&w=1024",
        articleUrl: "https://www.health.harvard.edu/blog/sleep-helps-learning-memory-201202154265"
    },
    {
        id: 9,
        title: "Exercise for Better Sleep Quality",
        description: "How different types of physical activity impact sleep and the best times to exercise for optimal rest.",
        category: "exercise",
        readTime: "5 min read",
        imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1024",
        articleUrl: "https://www.sleepfoundation.org/physical-activity/exercise-and-sleep",
        featured: true
    },
    {
        id: 10,
        title: "Yoga and Relaxation Techniques for Sleep",
        description: "Simple yoga poses and relaxation exercises that can help improve sleep quality for busy students.",
        category: "exercise",
        readTime: "4 min read",
        imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1024",
        articleUrl: "https://www.healthline.com/health/yoga-for-sleep"
    }
];

const filters = [
    { id: "all", name: "All" },
    { id: "sleep", name: "Sleep Quality" },
    { id: "caffeine", name: "Caffeine Impact" },
    { id: "screen", name: "Screen Time" },
    { id: "study", name: "Study Habits" },
    { id: "exercise", name: "Physical Activity" }
];

const colors = {
    primary: '#1a0b2e', // Deep purple
    secondary: '#2d1b4e', // Medium purple
    background: '#0f051d', // Darkest purple
    cardBackground: '#261543', // Dark purple for cards
    text: '#e2e8f0', // Light gray text
    accent: '#4f3b78', // Light purple
    highlight: '#6366f1', // Indigo
    featuredBg: '#1e1435' // Slightly lighter purple for featured
};

function Article() {
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [selectedArticle, setSelectedArticle] = useState(null);

    const filteredArticles = selectedFilter === "all"
        ? articleData
        : articleData.filter(article => article.category === selectedFilter);

    const featuredArticles = selectedFilter === "all"
        ? filters.filter(f => f.id !== "all").map(filter =>
            articleData.find(article => article.category === filter.id && article.featured)
        ).filter(Boolean)
        : filteredArticles.filter(article => article.featured);

    const regularArticles = filteredArticles.filter(article => !article.featured);

    const handleFilterClick = (filterId) => {
        setSelectedFilter(filterId);
    };

    const handleArticleClick = (articleUrl) => {
        setSelectedArticle(articleUrl);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBackClick = () => {
        setSelectedArticle(null);
    };

    return (
        <div className="min-h-screen" style={{ 
            backgroundColor: colors.background,
            backgroundImage: 'linear-gradient(to bottom right, rgba(99, 102, 241, 0.05), rgba(168, 85, 247, 0.05))'
        }}>
            <main className="container mx-auto px-4 py-8 max-w-6xl">
                <h1 className="text-5xl font-bold pb-6 mb-12 mt-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-purple-300">
                    Sleep Resources & Articles
                </h1>

                {!selectedArticle ? (
                    <>
                        <div className="flex flex-wrap justify-center gap-3 mb-12">
                            {filters.map(filter => (
                                <button
                                    key={filter.id}
                                    onClick={() => handleFilterClick(filter.id)}
                                    className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20`}
                                    style={{
                                        backgroundColor: selectedFilter === filter.id ? colors.highlight : 'transparent',
                                        color: selectedFilter === filter.id ? colors.background : colors.text,
                                        border: `1px solid ${selectedFilter === filter.id ? colors.highlight : colors.accent}`,
                                        transform: selectedFilter === filter.id ? 'scale(1.05)' : 'scale(1)'
                                    }}
                                >
                                    {filter.name}
                                </button>
                            ))}
                        </div>

                        {featuredArticles.length > 0 && (
                            <div className="mb-16">
                                <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                                    {selectedFilter === "all" ? "Featured Topics" : "Featured Article"}
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {featuredArticles.map(article => (
                                        <div key={article.id}
                                             className="rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col col-span-1 lg:first:col-span-3 md:first:col-span-2 border border-purple-500/20"
                                             style={{ backgroundColor: colors.featuredBg }}
                                        >
                                            <div className="h-64 overflow-hidden">
                                                <img
                                                    src={article.imageUrl}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="p-8 flex-grow flex flex-col">
                                                <div className="mb-4">
                                                    <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                                                        {filters.find(f => f.id === article.category)?.name}
                                                    </span>
                                                </div>

                                                <h3 className="text-2xl font-bold mb-4 text-purple-200">
                                                    {article.title}
                                                </h3>

                                                <p className="mb-6 flex-grow text-gray-300">
                                                    {article.description}
                                                </p>

                                                <div className="flex justify-between items-center">
                                                    <span className="text-purple-400 text-sm">{article.readTime}</span>
                                                    <button
                                                        onClick={() => handleArticleClick(article.articleUrl)}
                                                        className="px-6 py-2.5 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90"
                                                    >
                                                        Read Article
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div>
                            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                                {selectedFilter === "all" ? "All Articles" : "More Articles"}
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {regularArticles.map(article => (
                                    <div key={article.id} 
                                         className="rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-purple-500/20"
                                         style={{ backgroundColor: colors.cardBackground }}>
                                        <div className="h-48 overflow-hidden">
                                            <img
                                                src={article.imageUrl}
                                                alt={article.title}
                                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold mb-3 text-purple-200">
                                                {article.title}
                                            </h3>
                                            <p className="mb-4 text-sm text-gray-300">
                                                {article.description}
                                            </p>
                                            <div className="flex justify-between items-center mb-4">
                                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                                                    {filters.find(f => f.id === article.category)?.name}
                                                </span>
                                                <span className="text-purple-400 text-sm">{article.readTime}</span>
                                            </div>
                                            <button
                                                onClick={() => handleArticleClick(article.articleUrl)}
                                                className="w-full px-4 py-2.5 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90"
                                            >
                                                Read Article
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="rounded-xl shadow-xl p-6 border border-purple-500/20" 
                         style={{ backgroundColor: colors.cardBackground }}>
                        <button
                            onClick={handleBackClick}
                            className="mb-6 px-6 py-2.5 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Articles
                        </button>

                        <iframe
                            src={selectedArticle}
                            title="Article Content"
                            className="w-full h-screen border-0 rounded-lg"
                        />
                    </div>
                )}
            </main>
        </div>
    );
}

export default Article;