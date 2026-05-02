/**
 * Tax Escape - Frontend Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    let currentStep = 0;
    const userProfile = {
        type: null,
        income: null,
        concern: null
    };

    const mbtiContainer = document.getElementById('mbti-container');
    const explorerContainer = document.getElementById('folder-explorer');
    const searchInput = document.getElementById('search-input');
    const detailOverlay = document.getElementById('detail-overlay');
    const detailContent = document.getElementById('detail-content');
    const closeBtn = document.querySelector('.close-btn');

    // 1. Render MBTI Questions
    function renderMBTI() {
        mbtiContainer.innerHTML = '';
        TAX_MBTI_QUESTIONS.forEach((q, index) => {
            const card = document.createElement('div');
            card.className = `question-card ${index === currentStep ? 'active' : ''}`;
            card.innerHTML = `
                <p class="question-text">${q.question}</p>
                <div class="options-grid">
                    ${q.options.map(opt => `
                        <button class="option-btn" data-key="${q.id}" data-value="${opt.value}">
                            <i class="fa-solid fa-chevron-right"></i>
                            ${opt.label}
                        </button>
                    `).join('')}
                </div>
            `;
            mbtiContainer.appendChild(card);
        });

        // Add event listeners to options
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const key = e.currentTarget.dataset.key;
                const value = e.currentTarget.dataset.value;
                handleAnswer(key, value);
            });
        });
    }

    function handleAnswer(key, value) {
        userProfile[key] = value;
        if (currentStep < TAX_MBTI_QUESTIONS.length - 1) {
            currentStep++;
            renderMBTI();
        } else {
            showResult();
        }
    }

    function showResult() {
        mbtiContainer.innerHTML = `
            <div style="text-align: center; animation: fadeIn 0.8s ease;">
                <h3 style="font-size: 1.5rem; margin-bottom: 1rem;">🎯 분석 완료!</h3>
                <p style="color: var(--text-secondary); margin-bottom: 2rem;">
                    당신의 프로필에 맞는 세무 가이드를 하단 보관함에서 확인하세요.
                </p>
                <button id="reset-btn" class="option-btn" style="justify-content: center; width: auto; margin: 0 auto;">
                    다시 테스트하기
                </button>
            </div>
        `;
        document.getElementById('reset-btn').addEventListener('click', () => {
            currentStep = 0;
            renderMBTI();
        });
        
        // Auto-filter based on profile (Simple Logic)
        autoFilterResult();
    }

    function autoFilterResult() {
        // Logic: Open relevant folders based on user profile
        const folders = document.querySelectorAll('.folder-content');
        folders.forEach(f => f.classList.remove('open'));

        if (userProfile.type === 'freelancer' || userProfile.type === 'employee') {
            document.getElementById('folder-personal').classList.add('open');
        }
        if (userProfile.type === 'business') {
            document.getElementById('folder-business').classList.add('open');
        }
        if (userProfile.concern === 'refund' || userProfile.concern === 'inheritance') {
            document.getElementById('folder-savings').classList.add('open');
        }
    }

    // 2. Render Explorer
    function renderExplorer() {
        explorerContainer.innerHTML = '';
        Object.entries(TAX_GUIDE_STRUCTURE.tax_guide).forEach(([key, category]) => {
            const folder = document.createElement('div');
            folder.className = 'folder-item';
            folder.innerHTML = `
                <div class="folder-header" data-id="${key}" style="padding: 0.4rem 0.8rem;">
                    <i class="fa-solid fa-folder folder-icon"></i>
                    <span style="font-size: 1.1rem; font-weight: 400;">${category.title}</span>
                </div>
                <div id="folder-${key}" class="folder-content">
                    ${category.items.map(item => `
                        <a href="${item.url}" class="file-item" data-id="${item.id}">
                            <i class="fa-solid fa-file-lines file-icon"></i>
                            ${item.name}
                        </a>
                    `).join('')}
                </div>
            `;
            explorerContainer.appendChild(folder);
        });

        // Folder toggle listeners
        document.querySelectorAll('.folder-header').forEach(header => {
            header.addEventListener('click', (e) => {
                const id = e.currentTarget.dataset.id;
                const content = document.getElementById(`folder-${id}`);
                content.classList.toggle('open');
                
                // Update breadcrumb
                const icon = e.currentTarget.querySelector('i');
                const breadcrumb = document.getElementById('breadcrumb');
                if (content.classList.contains('open')) {
                    icon.className = 'fa-solid fa-folder-open folder-icon';
                    breadcrumb.innerText = `root / ${category.title}`;
                } else {
                    icon.className = 'fa-solid fa-folder folder-icon';
                    breadcrumb.innerText = `root /`;
                }
            });
        });

        // File click listeners
        document.querySelectorAll('.file-item').forEach(file => {
            file.addEventListener('click', (e) => {
                e.preventDefault();
                const id = e.currentTarget.dataset.id;
                showDetail(id);
            });
        });
    }

    // 3. Detail View
    function showDetail(id) {
        const data = TAX_DATA_CONTENT.find(item => item.id === id);
        if (!data) {
            detailContent.innerHTML = `
                <h2>준비 중입니다</h2>
                <p style="margin-top: 1rem; color: var(--text-secondary);">
                    현재 최신 국세청 데이터를 기반으로 업데이트 중인 항목입니다.
                </p>
            `;
        } else {
            detailContent.innerHTML = `
                <div class="tag">${data.category}</div>
                <h2 style="margin: 1rem 0;">${data.title}</h2>
                <div id="copy-area" style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 12px; white-space: pre-line; position: relative;">
                    ${data.content}
                    <button id="copy-btn" style="position: absolute; top: 0.5rem; right: 0.5rem; background: rgba(255,255,255,0.1); border: none; color: var(--text-secondary); cursor: pointer; padding: 0.3rem 0.6rem; border-radius: 6px; font-size: 0.7rem;">
                        <i class="fa-solid fa-copy"></i> 복사
                    </button>
                </div>
                <div class="tag-list">
                    ${data.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                </div>
            `;

            // Copy logic
            document.getElementById('copy-btn').addEventListener('click', () => {
                navigator.clipboard.writeText(data.content);
                const btn = document.getElementById('copy-btn');
                btn.innerHTML = '<i class="fa-solid fa-check"></i> 완료';
                setTimeout(() => {
                    btn.innerHTML = '<i class="fa-solid fa-copy"></i> 복사';
                }, 2000);
            });
        }
        detailOverlay.style.display = 'flex';
    }

    // 4. Search Logic
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (!query) {
            renderExplorer();
            return;
        }

        const filteredItems = TAX_DATA_CONTENT.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.tags.some(tag => tag.toLowerCase().includes(query))
        );

        renderSearchResults(filteredItems);
    });

    function renderSearchResults(items) {
        if (items.length === 0) {
            explorerContainer.innerHTML = '<p style="padding: 1rem; color: var(--text-secondary);">검색 결과가 없습니다.</p>';
            return;
        }

        explorerContainer.innerHTML = `
            <div class="folder-content open" style="margin-left: 0; border: none;">
                ${items.map(item => `
                    <a href="#${item.id}" class="file-item" data-id="${item.id}" style="padding: 0.75rem 1rem; background: rgba(255,255,255,0.03); margin-bottom: 0.5rem; border-radius: 12px;">
                        <i class="fa-solid fa-magnifying-glass file-icon"></i>
                        <div>
                            <div style="color: var(--text-primary); font-weight: 600;">${item.title}</div>
                            <div style="font-size: 0.8rem; color: var(--text-secondary);">${item.category}</div>
                        </div>
                    </a>
                `).join('')}
            </div>
        `;

        document.querySelectorAll('.file-item').forEach(file => {
            file.addEventListener('click', (e) => {
                e.preventDefault();
                showDetail(e.currentTarget.dataset.id);
            });
        });
    }

    // Modal close
    closeBtn.addEventListener('click', () => {
        detailOverlay.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === detailOverlay) {
            detailOverlay.style.display = 'none';
        }
    });

    // Initialize
    renderMBTI();
    renderExplorer();
});
