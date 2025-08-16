<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>معرفی پروژه کافه چی هوشمند</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-color: #FBF9F6;
            --primary-text: #4E443C;
            --secondary-text: #8a7a6f;
            --accent-primary: #E88B64;
            --card-bg: #FFFFFF;
            --border-color: #EAE3DC;
            --font-family: 'Vazirmatn', sans-serif;
            --shadow-soft: 0 4px 8px rgba(0, 0, 0, 0.04);
            --shadow-medium: 0 8px 20px rgba(78, 68, 60, 0.1);
            --border-radius: 16px;
        }

        body {
            font-family: var(--font-family);
            background-color: var(--bg-color);
            color: var(--primary-text);
            margin: 0;
            padding: 2rem 1rem;
            line-height: 1.7;
        }

        .container {
            max-width: 900px;
            margin: 0 auto;
            background-color: var(--card-bg);
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-medium);
            overflow: hidden;
        }

        .banner img {
            width: 100%;
            height: auto;
            display: block;
        }

        .content {
            padding: 2rem 3rem;
            text-align: center;
        }

        h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }

        .subtitle {
            font-size: 1.2rem;
            color: var(--secondary-text);
            margin-bottom: 2rem;
        }

        .badges {
            margin-bottom: 2.5rem;
            display: flex;
            justify-content: center;
            gap: 0.5rem;
            flex-wrap: wrap;
        }

        .badges img {
            height: 28px;
        }
        
        .description {
            font-size: 1.1rem;
            max-width: 65ch;
            margin: 0 auto 2.5rem auto;
            text-align: right;
        }

        .cta-button {
            display: inline-block;
            background-color: var(--accent-primary);
            color: white;
            padding: 0.8rem 2rem;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 700;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(232, 139, 100, 0.3);
        }

        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 16px rgba(232, 139, 100, 0.4);
        }
        
        .section {
            margin-top: 3.5rem;
            text-align: right;
            padding-top: 2rem;
            border-top: 1px solid var(--border-color);
        }
        
        .section-title {
            text-align: center;
            font-size: 1.8rem;
            margin-bottom: 2rem;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
        }

        .feature-card {
            background-color: var(--bg-color);
            padding: 1.5rem;
            border-radius: var(--border-radius);
            border: 1px solid var(--border-color);
            text-align: center;
        }

        .feature-card .icon {
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }

        .feature-card h3 {
            font-size: 1.2rem;
            margin-bottom: 0.5rem;
        }
        
        .feature-card p {
            font-size: 0.95rem;
            color: var(--secondary-text);
        }
        
        .tech-stack {
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            flex-wrap: wrap;
        }
        
        .tech-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.9rem;
            color: var(--secondary-text);
        }
        
        .tech-item img {
            height: 48px;
        }
        
        .setup-guide {
            background-color: #2d3748;
            color: #e2e8f0;
            padding: 1.5rem;
            border-radius: 12px;
            text-align: left;
            direction: ltr;
            font-family: 'Courier New', Courier, monospace;
            white-space: pre-wrap;
            overflow-x: auto;
        }
        
        footer {
            text-align: center;
            margin-top: 3rem;
            padding: 1.5rem;
            color: var(--secondary-text);
            font-size: 0.9rem;
            border-top: 1px solid var(--border-color);
        }

        @media (max-width: 600px) {
            .content {
                padding: 1.5rem;
            }
            h1 {
                font-size: 2rem;
            }
        }
    </style>
</head>
<body>

    <div class="container">
        <div class="banner">
            <img alt="Banner کافه چی هوشمند" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
        </div>
        <div class="content">
            <h1>کافه چی هوشمند</h1>
            <p class="subtitle">دستیار باریستای شما، مجهز به هوش مصنوعی</p>

            <div class="badges">
                <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
                <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
                <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
                <img src="https://img.shields.io/badge/Google%20AI-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Google AI">
                <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
            </div>

            <p class="description">
                «کافه چی هوشمند» یک وب اپلیکیشن مدرن است که به عنوان دستیار شخصی شما برای کشف، یادگیری و خلق انواع نوشیدنی‌های گرم و سرد عمل می‌کند. این برنامه با حل مشکل منوهای طولانی و گیج‌کننده، تجربه‌ای روان و لذت‌بخش را از طریق یک رابط کاربری هوشمند و قابلیت‌های مبتنی بر هوش مصنوعی ارائه می‌دهد.
            </p>

            <a href="https://kafechi-app.vercel.app" class="cta-button" target="_blank">
                مشاهده سایت
            </a>

            <div class="section">
                <h2 class="section-title">ویژگی‌های کلیدی</h2>
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="icon">📑</div>
                        <h3>منوی هوشمند</h3>
                        <p>یک منوی سلسله‌مراتبی و بصری که به شما کمک می‌کند به سرعت نوشیدنی مورد نظر خود را پیدا کنید.</p>
                    </div>
                    <div class="feature-card">
                        <div class="icon">✨</div>
                        <h3>پیشنهاد با هوش مصنوعی</h3>
                        <p>مواد اولیه‌ای که در خانه دارید را وارد کنید و دستورهای تهیه خلاقانه و شخصی‌سازی شده دریافت نمایید.</p>
                    </div>
                    <div class="feature-card">
                        <div class="icon">🎨</div>
                        <h3>راهنمای تصویری</h3>
                        <p>هوش مصنوعی برای هر دستور، یک اینفوگرافیک زیبا و قدم به قدم تولید می‌کند تا فرآیند تهیه را یاد بگیرید.</p>
                    </div>
                    <div class="feature-card">
                        <div class="icon">📸</div>
                        <h3>اسکن مواد اولیه</h3>
                        <p>از مواد اولیه خود عکس بگیرید تا هوش مصنوعی آن‌ها را شناسایی کرده و به لیست شما اضافه کند.</p>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2 class="section-title">تکنولوژی‌های استفاده شده</h2>
                <div class="tech-stack">
                    <div class="tech-item"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="React"><span>React</span></div>
                    <div class="tech-item"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vitejs/vitejs-original.svg" alt="Vite"><span>Vite</span></div>
                    <div class="tech-item"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="TypeScript"><span>TypeScript</span></div>
                    <div class="tech-item"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/google/google-original.svg" alt="Google AI"><span>Google AI</span></div>
                </div>
            </div>

            <div class="section">
                <h2 class="section-title">راه‌اندازی به صورت محلی</h2>
                <div class="setup-guide">
<span style="color: #6a9955;"># 1. Clone the repository</span>
git clone [https://github.com/mostafa5804/kafechi-app]
cd [kafechi-app]

<span style="color: #6a9955;"># 2. Install dependencies</span>
npm install

<span style="color: #6a9955;"># 3. Set your API key</span>
<span style="color: #c586c0;">-</span> Rename `.env.local.example` to `.env.local`
<span style="color: #c586c0;">-</span> Add your Gemini API key inside this file:
  <span style="color: #9cdcfe;">GEMINI_API_KEY</span>=<span style="color: #ce9178;">"YOUR_API_KEY_HERE"</span>

<span style="color: #6a9955;"># 4. Run the development server</span>
npm run dev
                </div>
            </div>
        </div>
        <footer>
            ساخته شده با ❤️ و هوش مصنوعی
        </footer>
    </div>

</body>
</html>
