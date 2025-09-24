// AtCoder進捗管理システム - 2024年版
class AtCoderProgressTracker {
    constructor() {
        this.startTime = 1758700800; // 2025年9月24日 水曜日 17:00:00 GMT+09:00
        this.baseUrl = 'https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions';
        this.problems = {};
        this.userData = null;
        this.charts = {};
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadProblemsFromCurrentScript();
        this.checkUrlParams();
    }

    setupEventListeners() {
        const form = document.querySelector('form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const userId = document.getElementById('atcoder_id').value.trim();
                if (userId) {
                    this.analyzeUser(userId);
                }
            });
        }
    }

    loadProblemsFromCurrentScript() {
        // problems.jsから問題リストを読み込み
        if (typeof problem_list !== 'undefined') {
            this.renderProblemList(problem_list);
        } else {
            console.error('problem_listが見つかりません');
        }
    }

    checkUrlParams() {
        const query = this.getQueryString();
        if (query["uid"]) {
            const input = document.getElementById('atcoder_id');
            if (input) {
                input.value = query["uid"];
                this.analyzeUser(query["uid"]);
            }
        }
    }

    getQueryString() {
        const result = {};
        if (window.location.search.length > 1) {
            const query = window.location.search.substring(1);
            const parameters = query.split('&');
            for (let i = 0; i < parameters.length; i++) {
                const element = parameters[i].split('=');
                const paramName = decodeURIComponent(element[0]);
                const paramValue = decodeURIComponent(element[1]);
                result[paramName] = paramValue;
            }
        }
        return result;
    }

    renderProblemList(problemList) {
        const tbody = document.getElementById('problem_tbody');
        if (!tbody) return;

        tbody.innerHTML = '';
        
        for (let i = 0; i < problemList.length; i++) {
            if (problemList[i].length === 1) continue;
            
            const [title, url, comment] = problemList[i];
            const week = Math.floor(i / 8) + 1;
            const n = (i % 8) + 1;
            const problemId = this.extractProblemId(url);
            
            if (this.problems[problemId]) continue;
            
            const difficulty = this.getProblemDifficulty(problemId);
            const difficultyBadgeClass = this.getDifficultyBadgeClass(difficulty);
            
            const tr = tbody.insertRow(-1);
            tr.innerHTML = `
                <td class="text-center"><strong>${week}-${n}</strong></td>
                <td>
                    <div class="d-flex align-items-center">
                        <span class="badge ${difficultyBadgeClass} me-2">${difficulty}</span>
                        <div>
                            <a href="${url}" target="_blank" class="text-decoration-none">
                                <strong>${title}</strong>
                            </a>
                            <br>
                            <small class="text-muted">${problemId}</small>
                        </div>
                    </div>
                </td>
                <td>${comment}</td>
                <td class="text-center" id="progress-${problemId}">
                    <span class="badge bg-light text-dark">未挑戦</span>
                </td>
            `;
            
            this.problems[problemId] = {
                element: document.getElementById(`progress-${problemId}`),
                score: this.getProblemScore(problemId),
                week: week,
                index: n,
                isChallenge: false
            };
        }
    }

    addChallengeProblem(problemId, contestId) {
        const tbody = document.getElementById('problem_tbody');
        if (!tbody || this.problems[problemId]) return;

        const difficulty = this.getProblemDifficulty(problemId);
        const difficultyBadgeClass = this.getDifficultyBadgeClass(difficulty);
        const problemUrl = `https://atcoder.jp/contests/${contestId}/tasks/${problemId}`;
        
        const tr = tbody.insertRow(-1);
        tr.innerHTML = `
            <td class="text-center">
                <span class="badge bg-info">
                    <i class="fas fa-star me-1"></i>チャレンジ
                </span>
            </td>
            <td>
                <div class="d-flex align-items-center">
                    <span class="badge ${difficultyBadgeClass} me-2">${difficulty}</span>
                    <div>
                        <a href="${problemUrl}" target="_blank" class="text-decoration-none">
                            <strong>${problemId}</strong>
                        </a>
                        <br>
                        <small class="text-muted">${contestId}</small>
                    </div>
                </div>
            </td>
            <td>リスト外問題への挑戦</td>
            <td class="text-center" id="progress-${problemId}">
                <span class="badge bg-light text-dark">未挑戦</span>
            </td>
        `;
        
        this.problems[problemId] = {
            element: document.getElementById(`progress-${problemId}`),
            score: this.getProblemScore(problemId),
            week: null,
            index: null,
            isChallenge: true
        };
    }

    extractProblemId(url) {
        return url.split('/').pop();
    }

    getProblemScore(problemId) {
        if (problemId.startsWith('abc')) {
            if (problemId.endsWith('_a')) return 1;
            if (problemId.endsWith('_b')) return 2;
            if (problemId.endsWith('_c')) return 4;
            return 6;
        }
        return 3;
    }

    getProblemDifficulty(problemId) {
        if (problemId.startsWith('abc')) {
            if (problemId.endsWith('_a')) return 'A';
            if (problemId.endsWith('_b')) return 'B';
            if (problemId.endsWith('_c')) return 'C';
        }
        // A、B、C以外は全てDレベル
        return 'D';
    }

    getDifficultyBadgeClass(difficulty) {
        switch (difficulty) {
            case 'A': return 'bg-success'; // 緑
            case 'B': return 'bg-primary'; // 青
            case 'C': return 'bg-warning'; // 黄
            case 'D': return 'bg-danger';  // 赤
            default: return 'bg-light text-dark';
        }
    }

    formatJST(epochTime) {
        const date = new Date(epochTime * 1000);
        return date.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
    }

    async analyzeUser(userId) {
        try {
            this.showLoading();
            
            // 前のユーザーのデータをクリア
            this.clearPreviousUserData();
            
            const url = `${this.baseUrl}?user=${userId}&from_second=${this.startTime}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ユーザーが見つかりません`);
            }
            
            const data = await response.json();
            this.userData = this.processSubmissions(data);
            this.renderResults(userId);
            this.updateProblemProgress();
            this.renderCharts();
            this.hideLoading();
            
        } catch (error) {
            this.showError(error.message);
            this.hideLoading();
        }
    }

    clearPreviousUserData() {
        // 問題リストを完全にリセット
        this.problems = {};
        
        // 問題リストテーブルを完全にクリアして再構築
        const tbody = document.getElementById('problem_tbody');
        if (tbody) {
            tbody.innerHTML = '';
        }
        
        // 問題リストを再読み込み
        if (typeof problem_list !== 'undefined') {
            this.renderProblemList(problem_list);
        }

        // 結果セクションを非表示
        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
            resultsSection.classList.add('d-none');
        }

        // 統計カードをリセット
        this.updateStatCard('total-score', '0');
        this.updateStatCard('total-time', '0h');
        this.updateStatCard('attendance-rate', '0%');
        this.updateStatCard('predicted-grade', '-');

        // 詳細結果をクリア
        const resultsDiv = document.getElementById('results');
        if (resultsDiv) {
            resultsDiv.innerHTML = '';
        }

        // チャートを破棄
        if (this.charts.language) {
            this.charts.language.destroy();
            this.charts.language = null;
        }
        if (this.charts.progress) {
            this.charts.progress.destroy();
            this.charts.progress = null;
        }

        // ユーザーデータをクリア
        this.userData = null;
    }

    processSubmissions(submissions) {
        submissions.sort((a, b) => a.epoch_second - b.epoch_second);
        
        const result = {
            totalScore: 0,
            trainingTime: 0,
            attendanceDays: new Set(),
            languageScores: { python: 0, cpp: 0 },
            weeklyProgress: {},
            submissionsByProblem: {},
            acProblems: new Set(),
            waProblems: new Set(),
            timeSpent: 0,
            averageACInterval: 0,
            suspiciousACCount: 0
        };

        let lastSubmissionTime = 0;
        const epochs = [];
        const acTimes = []; // AC取得時刻を記録

        for (const submission of submissions) {
            epochs.push(submission.epoch_second);
            
            // 出席評価（水曜日を起点に前後4日間）
            this.updateAttendance(submission.epoch_second, result.attendanceDays);
            
            // 問題別提出記録
            const problemId = submission.problem_id;
            const contestId = submission.contest_id;
            
            if (!result.submissionsByProblem[problemId]) {
                result.submissionsByProblem[problemId] = [];
            }
            result.submissionsByProblem[problemId].push(submission);

            // リスト外問題をチャレンジとして追加
            if (!this.problems[problemId]) {
                this.addChallengeProblem(problemId, contestId);
            }

            // 言語別スコア計算
            this.updateLanguageScore(submission, result);
            
            // スコア計算
            if (submission.result === 'AC' && !result.acProblems.has(problemId)) {
                let score = this.getProblemScore(problemId);
                
                // AC取得前のWA加算（AC取得後のWAは加点しない）
                if (result.waProblems.has(problemId)) {
                    score += 1;
                }
                
                // 連続AC判定（短時間でのAC）
                if (submission.epoch_second - lastSubmissionTime < 300) { // 5分以内
                    score = Math.max(score - 1, 0);
                }
                
                // 要チェックAC判定は後でまとめて計算
                
                result.totalScore += score;
                result.acProblems.add(problemId);
                acTimes.push(submission.epoch_second); // AC時刻を記録
                lastSubmissionTime = submission.epoch_second;
            } else if (submission.result !== 'AC' && !result.acProblems.has(problemId)) {
                // ACを取っていない問題のみWAを記録
                result.waProblems.add(problemId);
            }
        }

        // 演習時間計算
        result.timeSpent = this.calculateTrainingTime(epochs, submissions);
        
        // AC間隔の平均時間を計算
        result.averageACInterval = this.calculateAverageACInterval(acTimes);
        
        // 要チェックAC数を再計算（全提出データが揃ってから）
        result.suspiciousACCount = 0;
        for (const [problemId, problemSubmissions] of Object.entries(result.submissionsByProblem)) {
            if (result.acProblems.has(problemId) && problemSubmissions.length > 1) {
                const firstSubmission = problemSubmissions[0];
                const acSubmission = problemSubmissions.find(sub => sub.result === 'AC');
                if (acSubmission) {
                    const timeDiff = acSubmission.epoch_second - firstSubmission.epoch_second;
                    if (timeDiff > 0 && timeDiff < 600) { // 0秒より大きく10分以内
                        result.suspiciousACCount++;
                    }
                }
            }
        }
        
        return result;
    }

    updateAttendance(epochSecond, attendanceDays) {
        const date = new Date(epochSecond * 1000);
        const day = date.getDay(); // 0=日曜日, 3=水曜日
        
        // 水曜日を起点に前後4日間（土曜日〜火曜日）をチェック
        const attendanceStart = 6; // 土曜日
        const attendanceEnd = 2;   // 火曜日
        
        if (day >= attendanceStart || day <= attendanceEnd) {
            const weekStart = this.getWeekStartFromWednesday(epochSecond);
            attendanceDays.add(weekStart);
        }
    }

    getWeekStartFromWednesday(epochSecond) {
        const date = new Date(epochSecond * 1000);
        const day = date.getDay();
        
        // 水曜日を週の開始とする
        let diff = day - 3; // 水曜日(3)からの差
        if (diff < 0) diff += 7;
        
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - diff);
        weekStart.setHours(0, 0, 0, 0);
        
        return Math.floor(weekStart.getTime() / 1000);
    }

    updateLanguageScore(submission, result) {
        const language = submission.language.toLowerCase();
        const score = this.getProblemScore(submission.problem_id);
        
        if (language.includes('python') && submission.result === 'AC') {
            if (!result.acProblems.has(submission.problem_id)) {
                result.languageScores.python += score;
            }
        } else if ((language.includes('c++') || language.includes('g++')) && submission.result === 'AC') {
            if (!result.acProblems.has(submission.problem_id)) {
                result.languageScores.cpp += score;
            }
        }
    }

    calculateTrainingTime(epochs, submissions = []) {
        if (epochs.length < 2) return 0;
        
        let totalTime = 0;
        for (let i = 1; i < epochs.length; i++) {
            const timeDiff = epochs[i] - epochs[i - 1];
            
            // 前の提出から1時間以上空いている場合の処理
            if (timeDiff >= 3600) { // 1時間以上
                // 現在の提出が問題C・Dかチェック
                const currentSubmission = submissions.find(s => s.epoch_second === epochs[i]);
                if (currentSubmission) {
                    const problemId = currentSubmission.problem_id;
                    const isHardProblem = problemId.endsWith('_c') || problemId.endsWith('_d');
                    
                    if (isHardProblem) {
                        totalTime += 3600; // 1時間加算
                    } else {
                        totalTime += 1800; // 30分加算
                    }
                } else {
                    totalTime += 1800; // デフォルトは30分
                }
            } else {
                // 1時間以内の場合は実際の時間差を加算（最大45分）
                totalTime += Math.min(timeDiff, 45 * 60);
            }
        }
        
        return Math.round(totalTime / 3600 * 100) / 100; // 時間単位で小数点2桁
    }

    renderResults(userId) {
        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
            resultsSection.classList.remove('d-none');
        }

        // 統計更新
        this.updateStatCard('total-score', this.userData.totalScore);
        this.updateStatCard('total-time', `${this.userData.timeSpent}h`);
        
        // 出席率計算
        const attendanceData = this.calculateAttendanceRate();
        this.updateStatCard('attendance-rate', `${attendanceData.rate}%`);
        
        // AC間隔平均時間
        const averageACInterval = this.formatACInterval(this.userData.averageACInterval);
        this.updateStatCard('predicted-grade', averageACInterval);

        // 詳細結果
        const resultsDiv = document.getElementById('results');
        if (resultsDiv) {
            resultsDiv.innerHTML = `
                <div class="row">
                    <div class="col-md-6">
                        <h6><i class="fas fa-trophy me-2"></i>スコア詳細</h6>
                        <ul class="list-unstyled">
                            <li><strong>総得点:</strong> ${this.userData.totalScore}</li>
                            <li><strong>AC問題数:</strong> ${this.userData.acProblems.size}</li>
                            <li><strong>要チェックAC:</strong> <span class="text-warning">${this.userData.suspiciousACCount}</span></li>
                            <li><strong>Python:</strong> ${this.userData.languageScores.python}点</li>
                            <li><strong>C++:</strong> ${this.userData.languageScores.cpp}点</li>
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <h6><i class="fas fa-clock me-2"></i>時間詳細</h6>
                        <ul class="list-unstyled">
                            <li><strong>演習時間:</strong> ${this.userData.timeSpent}時間</li>
                            <li><strong>出席週数:</strong> ${attendanceData.attendedWeeks}/${attendanceData.totalWeeks}</li>
                            <li><strong>出席率:</strong> ${attendanceData.rate}%</li>
                            <li><strong>AC間隔:</strong> <span class="badge bg-info">${averageACInterval}</span></li>
                        </ul>
                    </div>
                </div>
            `;
        }
    }

    updateStatCard(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    calculateTotalWeeks() {
        const now = Date.now() / 1000;
        const weeksPassed = Math.ceil((now - this.startTime) / (7 * 24 * 3600));
        return Math.min(Math.max(weeksPassed, 1), 14); // 最初の14週で計算（出席率用）
    }

    calculateAttendanceRate() {
        const totalWeeks = this.calculateTotalWeeks();
        const attendedWeeks = new Set();
        
        // 各週にsubmitがあるかチェック
        for (let i = 1; i <= totalWeeks; i++) {
            const weekStartTime = this.startTime + ((i - 1) * 7 * 24 * 3600);
            const weekEndTime = this.startTime + (i * 7 * 24 * 3600);
            
            // この週にsubmitがあるかチェック
            for (const submissions of Object.values(this.userData.submissionsByProblem)) {
                const hasSubmissionInWeek = submissions.some(sub => 
                    sub.epoch_second >= weekStartTime && sub.epoch_second < weekEndTime
                );
                if (hasSubmissionInWeek) {
                    attendedWeeks.add(i);
                    break; // この週は出席確定なので次の週へ
                }
            }
        }
        
        return {
            attendedWeeks: attendedWeeks.size,
            totalWeeks: totalWeeks,
            rate: Math.round((attendedWeeks.size / totalWeeks) * 100)
        };
    }

    calculateAverageACInterval(acTimes) {
        if (acTimes.length < 2) return 0;
        
        const intervals = [];
        const maxIntervalSeconds = 3 * 60 * 60; // 3時間
        
        for (let i = 1; i < acTimes.length; i++) {
            const interval = acTimes[i] - acTimes[i - 1];
            // 3時間以内の間隔のみ平均計算に含める
            if (interval <= maxIntervalSeconds) {
                intervals.push(interval);
            }
        }
        
        if (intervals.length === 0) return 0;
        
        const averageSeconds = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;
        return Math.round(averageSeconds / 60); // 分単位で返す
    }
    
    formatACInterval(minutes) {
        if (minutes === 0) return '-';
        if (minutes < 60) return `${minutes}分`;
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        if (remainingMinutes === 0) return `${hours}時間`;
        return `${hours}時間${remainingMinutes}分`;
    }

    formatSubmissionDate(epochTime) {
        // 開始時刻からの週数を計算
        const weekNumber = Math.floor((epochTime - this.startTime) / (7 * 24 * 3600)) + 1;
        
        // 現在の週数
        const now = Date.now() / 1000;
        const currentWeek = Math.floor((now - this.startTime) / (7 * 24 * 3600)) + 1;
        
        if (weekNumber === currentWeek) {
            // 今週の場合は時刻も表示
            const date = new Date(epochTime * 1000);
            const timeStr = date.toLocaleTimeString('ja-JP', { 
                hour: '2-digit', 
                minute: '2-digit',
                timeZone: 'Asia/Tokyo'
            });
            return `Week${weekNumber} ${timeStr}`;
        } else if (weekNumber > 0 && weekNumber <= 16) {
            // 1-16週の範囲内
            return `Week${weekNumber}`;
        } else if (weekNumber <= 0) {
            // 開始前
            return '開始前';
        } else {
            // 16週以降
            return `Week${weekNumber}`;
        }
    }

    updateProblemProgress() {
        for (const [problemId, submissions] of Object.entries(this.userData.submissionsByProblem)) {
            const problemInfo = this.problems[problemId];
            if (!problemInfo) continue;

            const element = problemInfo.element;
            if (!element) continue;

            let html = '';
            let hasAC = false;
            
            // 最後の提出を取得
            const lastSubmission = submissions[submissions.length - 1];
            const lastSubmissionDate = this.formatSubmissionDate(lastSubmission.epoch_second);
            
            // ACまでの時間を計算
            let isSuspiciousAC = false;
            if (submissions.length > 1) {
                const acSubmission = submissions.find(sub => sub.result === 'AC');
                if (acSubmission) {
                    const firstSubmission = submissions[0];
                    const timeDiff = acSubmission.epoch_second - firstSubmission.epoch_second;
                    if (timeDiff < 600) { // 10分以下
                        isSuspiciousAC = true;
                    }
                }
            }
            
            for (const sub of submissions) {
                const contestId = sub.contest_id;
                const submissionUrl = `https://atcoder.jp/contests/${contestId}/submissions/${sub.id}`;
                
                if (sub.result === 'AC') {
                    if (!hasAC) {
                        const score = this.problems[problemId].score;
                        let acLabel = `AC(${score})`;
                        let suspiciousIcon = '';
                        
                        if (isSuspiciousAC) {
                            suspiciousIcon = ' <i class="fas fa-exclamation-triangle text-warning" title="要チェック: 10分以内にAC"></i>';
                        }
                        
                        html += `<a href="${submissionUrl}" target="_blank" class="text-decoration-none">
                                   <span class="label-ac">${acLabel}</span>
                                 </a>${suspiciousIcon} `;
                        hasAC = true;
                    }
                } else {
                    html += `<a href="${submissionUrl}" target="_blank" class="text-decoration-none">
                               <span class="label-wa">${sub.result}</span>
                             </a> `;
                }
            }
            
            // 最終提出日時を追加
            html += `<br><small class="text-muted">
                       <i class="fas fa-clock me-1"></i>${lastSubmissionDate}
                     </small>`;
            
            element.innerHTML = html || '<span class="badge bg-light text-dark">未挑戦</span>';
        }
    }

    renderCharts() {
        this.renderLanguageChart();
        this.renderProgressChart();
    }

    renderLanguageChart() {
        const ctx = document.getElementById('language-chart');
        if (!ctx) return;

        if (this.charts.language) {
            this.charts.language.destroy();
        }

        this.charts.language = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Python', 'C++'],
                datasets: [{
                    data: [
                        this.userData.languageScores.python,
                        this.userData.languageScores.cpp
                    ],
                    backgroundColor: ['#FFB7C5', '#0ABAB5'], // 桜色(Python), ティファニーブルー(C++)
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    renderProgressChart() {
        const ctx = document.getElementById('progress-chart');
        if (!ctx) return;

        if (this.charts.progress) {
            this.charts.progress.destroy();
        }

        // 週別進捗データを作成
        const weeklyData = this.generateWeeklyProgressData();

        this.charts.progress = new Chart(ctx, {
            type: 'line',
            data: {
                labels: weeklyData.labels,
                datasets: [{
                    label: 'Submit数',
                    data: weeklyData.values,
                    borderColor: '#28a745',
                    backgroundColor: 'rgba(40, 167, 69, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    generateWeeklyProgressData() {
        const weeks = 16; // 固定で16週間のグラフを表示
        const labels = [];
        const values = [];
        
        for (let i = 1; i <= weeks; i++) {
            labels.push(`Week ${i}`);
            
            // この週のsubmit数を計算
            const weekStartTime = this.startTime + ((i - 1) * 7 * 24 * 3600);
            const weekEndTime = this.startTime + (i * 7 * 24 * 3600);
            let submitCount = 0;
            
            for (const submissions of Object.values(this.userData.submissionsByProblem)) {
                const weekSubmissions = submissions.filter(sub => 
                    sub.epoch_second >= weekStartTime && sub.epoch_second < weekEndTime
                );
                submitCount += weekSubmissions.length;
            }
            
            values.push(submitCount);
        }
        
        return { labels, values };
    }

    showLoading() {
        const button = document.querySelector('.modern-btn');
        if (button) {
            button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>分析中...';
            button.disabled = true;
        }
    }

    hideLoading() {
        const button = document.querySelector('.modern-btn');
        if (button) {
            button.innerHTML = '<i class="fas fa-search me-2"></i>分析開始';
            button.disabled = false;
        }
    }

    showError(message) {
        const resultsDiv = document.getElementById('results');
        if (resultsDiv) {
            resultsDiv.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    エラー: ${message}
                </div>
            `;
        }
    }
}

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', () => {
    new AtCoderProgressTracker();
});