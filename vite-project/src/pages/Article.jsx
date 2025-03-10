import { useState } from 'react';

const articleData = [
    {
        id: 1,
        title: "Understanding Sleep Cycles for Better Rest",
        description: "Learn how sleep cycles work and how to optimize your sleep schedule for maximum rest.",
        category: "sleep",
        readTime: "5 min read",
        imageUrl: "/api/placeholder/400/320",
        articleUrl: "https://www.sleepfoundation.org/how-sleep-works/stages-of-sleep",
        featured: true
    },
    {
        id: 2,
        title: "Creating the Ideal Sleep Environment",
        description: "Tips for optimizing your bedroom for better sleep, from temperature to lighting and noise levels.",
        category: "sleep",
        readTime: "4 min read",
        imageUrl: "/api/placeholder/400/320",
        articleUrl: "https://www.sleepfoundation.org/bedroom-environment"
    },
    {
        id: 3,
        title: "How Caffeine Affects Your Sleep",
        description: "Discover the science behind caffeine's impact on sleep quality and how to manage consumption.",
        category: "caffeine",
        readTime: "6 min read",
        imageUrl: "/api/placeholder/400/320",
        articleUrl: "https://www.sleepfoundation.org/nutrition/caffeine-and-sleep",
        featured: true
    },
    {
        id: 4,
        title: "Caffeine Alternatives for Better Sleep",
        description: "Explore alternatives to coffee and energy drinks that can help you stay energized without disrupting sleep.",
        category: "caffeine",
        readTime: "3 min read",
        imageUrl: "/api/placeholder/400/320",
        articleUrl: "https://www.healthline.com/nutrition/caffeine-alternatives"
    },
    {
        id: 5,
        title: "The Impact of Blue Light on Sleep",
        description: "Understanding how blue light from screens affects your circadian rhythm and melatonin production.",
        category: "screen",
        readTime: "5 min read",
        imageUrl: "/api/placeholder/400/320",
        articleUrl: "https://www.sleepfoundation.org/bedroom-environment/screen-time-and-insomnia",
        featured: true
    },
    {
        id: 6,
        title: "Digital Detox for Better Sleep",
        description: "How to implement a digital detox routine to improve your sleep quality and overall well-being.",
        category: "screen",
        readTime: "4 min read",
        imageUrl: "/api/placeholder/400/320",
        articleUrl: "https://www.sleepfoundation.org/sleep-hygiene/screen-time-and-sleep"
    },
    {
        id: 7,
        title: "Balancing Study and Sleep",
        description: "Strategies for university students to maintain a healthy sleep schedule during intense study periods.",
        category: "study",
        readTime: "7 min read",
        imageUrl: "/api/placeholder/400/320",
        articleUrl: "https://www.apa.org/gradpsych/2014/11/get-sleep",
        featured: true
    },
    {
        id: 8,
        title: "How Sleep Improves Memory and Learning",
        description: "Research on the connection between sleep quality and academic performance in university students.",
        category: "study",
        readTime: "6 min read",
        imageUrl: "/api/placeholder/400/320",
        articleUrl: "https://www.health.harvard.edu/blog/sleep-helps-learning-memory-201202154265"
    },
    {
        id: 9,
        title: "Exercise for Better Sleep Quality",
        description: "How different types of physical activity impact sleep and the best times to exercise for optimal rest.",
        category: "exercise",
        readTime: "5 min read",
        imageUrl: "/api/placeholder/400/320",
        articleUrl: "https://www.sleepfoundation.org/physical-activity/exercise-and-sleep",
        featured: true
    },
    {
        id: 10,
        title: "Yoga and Relaxation Techniques for Sleep",
        description: "Simple yoga poses and relaxation exercises that can help improve sleep quality for busy students.",
        category: "exercise",
        readTime: "4 min read",
        imageUrl: "/api/placeholder/400/320",
        articleUrl: "https://www.healthline.com/health/yoga-for-sleep"
    },
    // Additional articles
    {
        id: 11,
        title: "How to Boost Your Energy After a Sleepless Night",
        description: "Strategies to mitigate the effects of sleep deprivation, including healthy eating, moderated caffeine consumption, physical activity, and power naps.",
        category: "sleep",
        readTime: "5 min read",
        imageUrl: "/api/placeholder/400/320",
        articleUrl: "https://www.verywellhealth.com/boost-energy-after-sleepless-night"
    },
    {
        id: 12,
        title: "Eating too much and working in bed: experts share 10 worst sleep mistakes",
        description: "Experts identify common sleep mistakes such as excessive screen time before bed, irregular sleep schedules, and poor dietary habits, providing insights into improving sleep quality.",
        category: "sleep",
        readTime: "6 min read",
        imageUrl: "/api/placeholder/400/320",
        articleUrl: "https://www.theguardian.com/worst-sleep-mistakes"
    },
    {
        id: 13,
        title: "The '10-3-2-1-0' sleep formula could be the key to a better night's rest",
        description: "This article introduces a formula designed to enhance sleep quality by managing caffeine and food intake, work-related stress, and screen time before bedtime.",
        category: "sleep",
        readTime: "4 min read",
        imageUrl: "/api/placeholder/400/320",
        articleUrl: "https://www.nypost.com/sleep-formula"
    },
    {
        id: 14,
        title: "Good Sleep Hygiene Promotes Better Physical and Mental Health",
        description: "The importance of good sleep hygiene practices, such as maintaining a regular sleep schedule and creating a comfortable sleep environment, to improve overall health.",
        category: "sleep",
        readTime: "5 min read",
        imageUrl: "/api/placeholder/400/320",
        articleUrl: "https://www.realsimple.com/sleep-hygiene"
    },
    {
        id: 15,
        title: "'Wired': Real reason you can't fall asleep",
        description: "This piece explores common reasons for poor sleep quality, including excessive screen time and irregular sleep patterns, and offers strategies to improve sleep.",
        category: "screen",
        readTime: "4 min read",
        imageUrl: "/api/placeholder/400/320",
        articleUrl: "https://www.news.com.au/wired-cant-fall-asleep"
    },
    {
        id: 16,
        title: "How much coffee should you really drink a day?",
        description: "The article discusses the health implications of coffee consumption, highlighting that moderate intake can be beneficial, but excessive consumption may pose health risks.",
        category: "caffeine",
        readTime: "5 min read",
        imageUrl: "/api/placeholder/400/320",
        articleUrl: "https://www.thetimes.co.uk/coffee-per-day"
    },
    {
        id: 17,
        title: "Is Working Out Before Bed Good or Bad for Your Sleep?",
        description: "This article explores the effects of exercising before bedtime on sleep quality, highlighting the benefits of light activities like yoga and the potential disruptions from intense workouts close to bedtime.",
        category: "exercise",
        readTime: "6 min read",
        imageUrl: "/api/placeholder/400/320",
        articleUrl: "https://www.verywellhealth.com/working-out-before-bed"
    },
    {
        id: 18,
        title: "Screen time and its effects on sleep",
        description: "An in-depth look at the effects of screen time on sleep, including how blue light exposure before bedtime can disrupt melatonin production and circadian rhythms, leading to sleep disturbances.",
        category: "screen",
        readTime: "7 min read",
        imageUrl: "/api/placeholder/400/320",
        articleUrl: "https://en.wikipedia.org/wiki/Screen_time"
    },
    {
        id: 19,
        title: "Digital media use and mental health",
        description: "This article examines the association between digital media use and mental health, focusing on how excessive screen time correlates with shorter sleep duration and poorer sleep quality, particularly when devices are used at bedtime.",
        category: "screen",
        readTime: "8 min read",
        imageUrl: "/api/placeholder/400/320",
        articleUrl: "https://en.wikipedia.org/wiki/Digital_media_use_and_mental_health"
    },
    {
        id: 20,
        title: "Sleep deprivation in higher education",
        description: "Discusses the prevalence of sleep deprivation among college students, emphasizing the role of caffeine consumption and its impact on sleep patterns and academic performance.",
        category: "study",
        readTime: "7 min read",
        imageUrl: "/api/placeholder/400/320",
        articleUrl: "https://en.wikipedia.org/wiki/Sleep_deprivation_in_higher_education"
    },
    {
        id: 21,
        title: "Screen time, caffeine, and irregular bedtimes: survey finds almost half of Australian kids have sleep problems",
        description: "Highlights findings from a survey indicating that nearly half of Australian school-age children experience sleep problems, with contributing factors including screen use before bed and caffeine consumption after lunchtime.",
        category: "screen",
        readTime: "6 min read",
        imageUrl: "/api/placeholder/400/320",
        articleUrl: "https://www.theguardian.com/australian-kids-sleep-problems"
    },
    {
        id: 22,
        title: "I'm a sleep specialist - 4 free tips for better winter slumber",
        description: "Provides expert advice on enhancing sleep quality during winter months, including recommendations on managing screen time and creating a comfortable sleep environment.",
        category: "sleep",
        readTime: "4 min read",
        imageUrl: "/api/placeholder/400/320",
        articleUrl: "https://www.nypost.com/winter-sleep-tips"
    },
    {
        id: 23,
        title: "Should Your Teen Have Caffeine? Pediatricians Weigh In",
        description: "Discusses new guidelines advising teenagers to avoid caffeine due to potential negative health effects, including poor sleep and high blood pressure.",
        category: "caffeine",
        readTime: "5 min read",
        imageUrl: "/api/placeholder/400/320",
        articleUrl: "https://www.health.com/teens-caffeine-guidelines"
    },
    {
        id: 24,
        title: "40 Day Health Challenge coach's 10 easy ways to get BEST night's sleep",
        description: "Offers practical tips for improving sleep quality, such as reducing screen time before bed and maintaining a consistent sleep schedule, to enhance mental well-being.",
        category: "sleep",
        readTime: "5 min read",
        imageUrl: "/api/placeholder/400/320",
        articleUrl: "https://www.thesun.ie/best-nights-sleep"
    },
    {
        id: 25,
        title: "Anne-Marie Chang: Research on Sleep and Health",
        description: "An overview of the research contributions of Anne-Marie Chang, particularly relating to how adolescent health is related to sleep characteristics, including the effects of screen time and sleep deprivation on cognition and physiological outcomes.",
        category: "study",
        readTime: "6 min read",
        imageUrl: "/api/placeholder/400/320",
        articleUrl: "https://en.wikipedia.org/wiki/Anne-Marie_Chang"
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

// Updated color scheme with light beige background
const colors = {
    primary: '#17153B', // Dark navy blue (main)
    secondary: '#AFA99E', // Gray (main)
    background: '#F5F5F5', // Light beige/gray background
    cardBackground: '#EBF4F6', // White for cards
    text: '#000000', // Black (main)
    accent: '#2E236C', // Purple (sub)
    highlight: '#433D8B', // Dark blue (sub)
    featuredBg: '#E5EEF6' // Light blue for featured articles
};

const Article = () => {
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [selectedArticle, setSelectedArticle] = useState(null);

    const filteredArticles = selectedFilter === "all"
        ? articleData
        : articleData.filter(article => article.category === selectedFilter);

    // Get featured articles for current filter
    const featuredArticles = selectedFilter === "all"
        ? filters.filter(f => f.id !== "all").map(filter =>
            articleData.find(article => article.category === filter.id && article.featured)
        ).filter(Boolean)
        : filteredArticles.filter(article => article.featured);

    // Get regular (non-featured) articles for current filter
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
        <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Centered Title with changed font */}
                <h1 className="text-4xl font-bold pb-4 mb-8 text-center"
                    style={{
                        color: colors.primary,
                        borderBottom: `2px solid ${colors.secondary}`,
                        fontFamily: 'Georgia, serif'
                    }}>
                    Sleep Resources & Articles
                </h1>

                {!selectedArticle ? (
                    <>
                        {/* Filters - Centered */}
                        <div className="flex flex-wrap justify-center gap-2 mb-8">
                            {filters.map(filter => (
                                <button
                                    key={filter.id}
                                    onClick={() => handleFilterClick(filter.id)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors`}
                                    style={{
                                        backgroundColor: selectedFilter === filter.id ? colors.primary : colors.background,
                                        color: selectedFilter === filter.id ? colors.background : colors.primary,
                                        border: selectedFilter === filter.id ? 'none' : `1px solid ${colors.secondary}`
                                    }}
                                >
                                    {filter.name}
                                </button>
                            ))}
                        </div>

                        {/* Featured Articles Section */}
                        {featuredArticles.length > 0 && (
                            <div className="mb-12">
                                <h2 className="text-2xl font-semibold mb-6 text-center" style={{ color: colors.primary }}>
                                    {selectedFilter === "all" ? "Featured Topics" : "Featured Article"}
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {featuredArticles.map(article => (
                                        <div key={article.id}
                                             className="rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col col-span-1 lg:first:col-span-3 md:first:col-span-2"
                                             style={{ backgroundColor: colors.featuredBg }}
                                        >
                                            <div className="h-56 overflow-hidden">
                                                <img
                                                    src={article.imageUrl}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                            <div className="p-6 flex-grow flex flex-col">
                                                {/* Category badge */}
                                                <div className="mb-2">
                          <span className="px-3 py-1 rounded-full text-xs font-bold"
                                style={{ backgroundColor: colors.primary, color: colors.background }}>
                            {filters.find(f => f.id === article.category)?.name}
                          </span>
                                                </div>

                                                {/* Title */}
                                                <h3 className="text-xl font-bold mb-3" style={{ color: colors.highlight }}>
                                                    {article.title}
                                                </h3>

                                                {/* Description */}
                                                <p className="mb-4 flex-grow" style={{ color: colors.text }}>
                                                    {article.description}
                                                </p>

                                                <div className="flex justify-between items-center">
                                                    {/* Read time */}
                                                    <span style={{ color: colors.secondary }} className="text-sm">{article.readTime}</span>

                                                    {/* Button */}
                                                    <button
                                                        onClick={() => handleArticleClick(article.articleUrl)}
                                                        className="text-white px-4 py-2 rounded transition-colors hover:opacity-90"
                                                        style={{ backgroundColor: colors.accent }}
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

                        {/* Regular Articles Grid */}
                        <div>
                            <h2 className="text-2xl font-semibold mb-6 text-center" style={{ color: colors.primary }}>
                                {selectedFilter === "all" ? "All Articles" : "More Articles"}
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {regularArticles.map(article => (
                                    <div key={article.id} className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                                         style={{ backgroundColor: colors.cardBackground }}>
                                        <div className="h-48 overflow-hidden">
                                            <img
                                                src={article.imageUrl}
                                                alt={article.title}
                                                className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                                            />
                                        </div>
                                        <div className="p-6">
                                            {/* Title */}
                                            <h3 className="text-lg font-semibold mb-2" style={{ color: colors.highlight }}>
                                                {article.title}
                                            </h3>
                                            {/* Description */}
                                            <p className="mb-4 text-sm" style={{ color: colors.text }}>
                                                {article.description}
                                            </p>
                                            <div className="flex justify-between text-sm mb-4">
                                                {/* Category tag */}
                                                <span className="px-2 py-1 rounded text-xs"
                                                      style={{ backgroundColor: colors.primary, color: colors.background }}>
                          {filters.find(f => f.id === article.category)?.name}
                        </span>
                                                {/* Read time */}
                                                <span style={{ color: colors.secondary }}>{article.readTime}</span>
                                            </div>
                                            {/* Button */}
                                            <button
                                                onClick={() => handleArticleClick(article.articleUrl)}
                                                className="text-white px-4 py-2 rounded transition-colors w-full hover:opacity-90"
                                                style={{ backgroundColor: colors.accent }}
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

                    // Article Detail View with iframe
                    <div className="rounded-lg shadow-lg p-6" style={{ backgroundColor: colors.cardBackground }}>

                        <button
                            onClick={handleBackClick}
                            className="mb-4 text-white px-4 py-2 rounded flex items-center transition-colors hover:opacity-90"
                            style={{ backgroundColor: colors.primary }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Articles
                        </button>

                        <iframe
                            src={selectedArticle}
                            title="Article Content"
                            className="w-full h-screen border-0"
                        />

                    </div>
                )}

            </main>
        </div>
    );
};

export default Article;