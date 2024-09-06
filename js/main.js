
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let loggedInUser = null;

    function showPage(pageId) {
        const contents = document.querySelectorAll('.content');
        contents.forEach(content => content.classList.remove('active'));
        document.getElementById(pageId).classList.add('active');
        hideLogin();
        hideRegister();

        if (pageId === 'user-dashboard' && loggedInUser) {
            displayUserPosts();
        }

        if (pageId === 'admin-panel') {
            displayPendingPosts();
        }
    }

    function showLogin() {
        document.getElementById('loginForm').style.display = 'block';
        hideRegister();
    }

    function hideLogin() {
        document.getElementById('loginForm').style.display = 'none';
    }

    function showRegister() {
        document.getElementById('registerForm').style.display = 'block';
        hideLogin();
    }

    function hideRegister() {
        document.getElementById('registerForm').style.display = 'none';
    }

    function register() {
        const username = document.getElementById('registerUsername').value.trim();
        const password = document.getElementById('registerPassword').value.trim();

        if (!username || !password) {
            alert('请输入用户名和密码');
            return;
        }

        const existingUser = users.find(user => user.username === username);
        if (existingUser) {
            alert('用户名已存在，请选择其他用户名');
        } else {
            users.push({ username, password, posts: [] });
            localStorage.setItem('users', JSON.stringify(users));
            alert(`注册成功！欢迎, ${username}`);
            loggedInUser = { username, posts: [] }; // 自动登录
            hideRegister();
            showPage('user-dashboard');
        }
    }

    function login() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            loggedInUser = user;
            alert(`登录成功！欢迎, ${username}`);
            hideLogin();
            showPage('user-dashboard');
        } else {
            alert('用户名或密码错误');
        }
    }

    function displayUserPosts() {
        const userPosts = document.getElementById('userPosts');
        userPosts.innerHTML = '';

        if (loggedInUser && loggedInUser.posts.length > 0) {
            loggedInUser.posts.forEach((post, index) => {
                const li = document.createElement('li');
                li.innerHTML = `${post.title} - ${post.status}`;
                userPosts.appendChild(li);
            });
        } else {
            userPosts.innerHTML = '暂无发布信息';
        }
    }

    function displayPendingPosts() {
        const pendingList = document.getElementById('pendingList');
        pendingList.innerHTML = '暂无待审核信息';
    }

    function changeLanguage() {
        const lang = document.getElementById('language').value;
        const texts = {
            zh: {
                welcome: '欢迎来到找找网',
                home: '首页',
                rental: '房屋租赁',
                secondhand: '二手交易',
                jobs: '招聘信息',
                services: '生活服务',
                rentalInfo: '最新房源信息',
                secondhandInfo: '找到你需要的二手物品',
                jobsInfo: '最新招聘职位',
                servicesInfo: '提供各种生活服务',
                myPosts: '我的发布信息',
                title: '标题',
                status: '状态',
                login: '登录',
                register: '注册',
                cancel: '取消',
                usernamePlaceholder: '用户名',
                passwordPlaceholder: '密码',
                footer: '© 2024 找找网 - Findit. 版权所有.',
                search: '搜索',
                searchPlaceholder: '搜索你想要的信息...'
            },
            en: {
                welcome: 'Welcome to Findit',
                home: 'Home',
                rental: 'Rental',
                secondhand: 'Second-hand Trading',
                jobs: 'Jobs',
                services: 'Services',
                rentalInfo: 'Latest rental listings',
                secondhandInfo: 'Find the second-hand items you need',
                jobsInfo: 'Latest job postings',
                servicesInfo: 'Various life services provided',
                myPosts: 'My Posts',
                title: 'Title',
                status: 'Status',
                login: 'Login',
                register: 'Register',
                cancel: 'Cancel',
                usernamePlaceholder: 'Username',
                passwordPlaceholder: 'Password',
                footer: '© 2024 Findit. All rights reserved.',
                search: 'Search',
                searchPlaceholder: 'Search for the information you want...'
            },
            ar: {
                welcome: 'مرحبا بكم في Findit',
                home: 'الرئيسية',
                rental: 'معلومات الإيجار',
                secondhand: 'معلومات التجارة المستعملة',
                jobs: 'معلومات الوظائف',
                services: 'معلومات الخدمة',
                rentalInfo: 'أحدث قوائم الإيجار',
                secondhandInfo: 'ابحث عن العناصر المستعملة التي تحتاجها',
                jobsInfo: 'أحدث الوظائف',
                servicesInfo: 'تقديم مختلف الخدمات',
                myPosts: 'منشوراتي',
                title: 'العنوان',
                status: 'الحالة',
                login: 'تسجيل الدخول',
                register: 'تسجيل',
                cancel: 'إلغاء',
                usernamePlaceholder: 'اسم المستخدم',
                passwordPlaceholder: 'كلمة المرور',
                footer: '© 2024 Findit. جميع الحقوق محفوظة.',
                search: 'بحث',
                searchPlaceholder: 'ابحث عن المعلومات التي تريدها...'
            }
        };

        for (const key in texts[lang]) {
            const elements = document.querySelectorAll(`[data-lang="${key}"]`);
            elements.forEach(element => {
                if (element.tagName === 'INPUT') {
                    element.setAttribute('placeholder', texts[lang][key]);
                } else if (element.tagName === 'A' || element.tagName === 'P' || element.tagName === 'SPAN') {
                    element.innerHTML = texts[lang][key];
                } else {
                    element.textContent = texts[lang][key];
                }
            });
        }

        document.title = texts[lang].welcome;
        document.documentElement.lang = lang;
    }
