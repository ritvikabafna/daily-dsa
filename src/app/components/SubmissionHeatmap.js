"use client";

import { useEffect, useState, useMemo } from "react";

export default function SubmissionHeatmap({ user, solvedCount = 0 }) {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    // 1. Load from localStorage
    let localSubs = [];
    try {
      localSubs = JSON.parse(
        localStorage.getItem("daily_dsa_local_submissions") || "[]"
      );
    } catch {}

    // 2. Fetch remote if logged in
    fetch("/api/submissions")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.submissions)) {
          const combined = [...data.submissions, ...localSubs];
          // deduplicate by _id or createdAt
          const seen = new Set();
          const unique = [];
          for (const s of combined) {
            const key = s._id || `${s.problemId}-${s.createdAt}`;
            if (!seen.has(key)) {
              seen.add(key);
              unique.push(s);
            }
          }
          setSubmissions(unique);
        } else {
          setSubmissions(localSubs);
        }
      })
      .catch(() => {
        setSubmissions(localSubs);
      });
  }, []);

  // Compute daily activity map for the past 180 days (or 52 weeks)
  const { dateMap, currentStreak, maxStreak, totalActiveDays } = useMemo(() => {
    const map = {};
    const now = new Date();

    for (const sub of submissions) {
      if (!sub.createdAt) continue;
      const d = new Date(sub.createdAt);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      map[key] = (map[key] || 0) + 1;
    }

    // Calculate streaks
    let streak = 0;
    let maxS = 0;
    let checkDate = new Date();

    // Check today or yesterday
    const todayKey = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, "0")}-${String(checkDate.getDate()).padStart(2, "0")}`;
    if (map[todayKey]) {
      streak++;
    }

    // Walk back day by day
    for (let i = 1; i <= 365; i++) {
      const prevDate = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const prevKey = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, "0")}-${String(prevDate.getDate()).padStart(2, "0")}`;
      if (map[prevKey]) {
        streak++;
      } else {
        if (i === 1 && !map[todayKey]) {
          // Check if streak was active yesterday
          continue;
        }
        break;
      }
    }

    maxS = Math.max(streak, 1);
    const activeDays = Object.keys(map).length;

    return {
      dateMap: map,
      currentStreak: streak,
      maxStreak: maxS,
      totalActiveDays: activeDays,
    };
  }, [submissions]);

  // Generate 26 weeks (approx 6 months) grid of days
  const calendarWeeks = useMemo(() => {
    const weeks = [];
    const today = new Date();
    // End on upcoming Saturday
    const end = new Date(today);
    end.setDate(end.getDate() + (6 - end.getDay()));

    // 26 weeks ago starting on Sunday
    const start = new Date(end);
    start.setDate(start.getDate() - 26 * 7 + 1);

    let cur = new Date(start);
    let currentWeek = [];

    while (cur <= end) {
      const dateStr = `${cur.getFullYear()}-${String(cur.getMonth() + 1).padStart(2, "0")}-${String(cur.getDate()).padStart(2, "0")}`;
      const count = dateMap[dateStr] || 0;
      let level = 0;
      if (count > 0 && count < 2) level = 1;
      else if (count >= 2 && count < 4) level = 2;
      else if (count >= 4 && count < 6) level = 3;
      else if (count >= 6) level = 4;

      currentWeek.push({
        date: dateStr,
        count,
        level,
        display: cur.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      });

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }

      cur.setDate(cur.getDate() + 1);
    }

    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    return weeks;
  }, [dateMap]);

  // Badges
  const badges = [
    {
      id: "first_blood",
      icon: "🎯",
      title: "First Blood",
      desc: "Solved your first DSA problem",
      unlocked: solvedCount >= 1,
    },
    {
      id: "streak_3",
      icon: "🔥",
      title: "Consistency Spark",
      desc: "Logged an active practice streak",
      unlocked: currentStreak >= 1 || submissions.length >= 2,
    },
    {
      id: "club_10",
      icon: "🥉",
      title: "Club 10",
      desc: "Solved 10+ curriculum challenges",
      unlocked: solvedCount >= 10,
    },
    {
      id: "club_25",
      icon: "🥈",
      title: "Quarter Century",
      desc: "Solved 25+ problems across topics",
      unlocked: solvedCount >= 25,
    },
    {
      id: "century_50",
      icon: "👑",
      title: "DSA Grandmaster",
      desc: "Solved 50+ problems",
      unlocked: solvedCount >= 50,
    },
  ];

  return (
    <div className="activity-heatmap-card">
      <div className="heatmap-header">
        <div className="heatmap-title-wrap">
          <span className="heatmap-tag">PRACTICE STREAK &amp; ACTIVITY</span>
          <h3 className="heatmap-title">Activity Heatmap</h3>
        </div>

        <div className="heatmap-stats-strip">
          <div className="heatmap-stat-item">
            <span className="h-stat-lbl">Active Streak</span>
            <span className="h-stat-val flame">🔥 {currentStreak} {currentStreak === 1 ? "Day" : "Days"}</span>
          </div>
          <div className="heatmap-stat-item">
            <span className="h-stat-lbl">Active Days</span>
            <span className="h-stat-val">📅 {totalActiveDays}</span>
          </div>
          <div className="heatmap-stat-item">
            <span className="h-stat-lbl">Submissions</span>
            <span className="h-stat-val">⚡ {submissions.length}</span>
          </div>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="heatmap-scroll-wrapper">
        <div className="heatmap-grid">
          {calendarWeeks.map((week, wIdx) => (
            <div key={wIdx} className="heatmap-col">
              {week.map((day, dIdx) => (
                <div
                  key={dIdx}
                  className={`heatmap-cell level-${day.level}`}
                  title={`${day.date}: ${day.count} ${day.count === 1 ? "submission" : "submissions"}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="heatmap-footer">
        <span className="heatmap-legend-label">Less</span>
        <div className="heatmap-legend">
          <span className="heatmap-cell level-0" />
          <span className="heatmap-cell level-1" />
          <span className="heatmap-cell level-2" />
          <span className="heatmap-cell level-3" />
          <span className="heatmap-cell level-4" />
        </div>
        <span className="heatmap-legend-label">More</span>
      </div>

      {/* Badges Section */}
      <div className="achievements-section">
        <span className="achievements-title">🏆 Mastery Milestones</span>
        <div className="badges-grid">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`badge-pill ${b.unlocked ? "unlocked" : "locked"}`}
              title={b.desc}
            >
              <span className="badge-icon">{b.icon}</span>
              <div className="badge-text">
                <span className="badge-name">{b.title}</span>
                <span className="badge-status">{b.unlocked ? "Unlocked" : "Locked"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
